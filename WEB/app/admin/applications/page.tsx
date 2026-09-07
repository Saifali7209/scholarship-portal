"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { useApp } from "../../../context/AppContext";
import {
  ApplicationStatusBadge,
  RiskBadge,
  VerificationStatusBadge
} from "../../../components/ui/StatusBadge";
import { Pagination } from "../../../components/ui/Pagination";
import { ApplicationStatus, RiskLevel } from "../../../types/scholarship";
import {
  Search,
  Filter,
  Download,
  Eye,
  SlidersHorizontal,
  RotateCcw,
  ArrowUpDown,
  Building,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function AdminApplicationsPage() {
  const { allApplications } = useApp();

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [scholarshipFilter, setScholarshipFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"score" | "submissionDate">("score");
  const [sortAsc, setSortAsc] = useState(false);

  const PAGE_SIZE = 12;

  // Filtered and Sorted Applications
  const filteredApps = useMemo(() => {
    return allApplications
      .filter((app) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          !query ||
          app.applicationNumber.toLowerCase().includes(query) ||
          app.personalDetails.fullName.toLowerCase().includes(query) ||
          app.personalDetails.email.toLowerCase().includes(query) ||
          app.personalDetails.mobile.includes(query);

        const matchesStatus = statusFilter === "All" || app.status === statusFilter;
        const matchesRisk = riskFilter === "All" || app.riskLevel === riskFilter;
        const matchesScholarship =
          scholarshipFilter === "All" || app.scholarshipId === scholarshipFilter;

        return matchesSearch && matchesStatus && matchesRisk && matchesScholarship;
      })
      .sort((a, b) => {
        if (sortField === "score") {
          return sortAsc ? a.score - b.score : b.score - a.score;
        } else {
          const dateA = a.submissionDate || "2026-08-01";
          const dateB = b.submissionDate || "2026-08-01";
          return sortAsc ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
        }
      });
  }, [
    allApplications,
    searchQuery,
    statusFilter,
    riskFilter,
    scholarshipFilter,
    sortField,
    sortAsc
  ]);

  const totalPages = Math.ceil(filteredApps.length / PAGE_SIZE);
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredApps.slice(start, start + PAGE_SIZE);
  }, [filteredApps, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setRiskFilter("All");
    setScholarshipFilter("All");
    setCurrentPage(1);
  };

  const handleExportCsv = () => {
    const headers = [
      "ApplicationNumber",
      "StudentName",
      "Email",
      "Mobile",
      "Institution",
      "Percentage",
      "Status",
      "RiskLevel",
      "Score"
    ];
    const rows = filteredApps.map((a) => [
      a.applicationNumber,
      `"${a.personalDetails.fullName}"`,
      a.personalDetails.email,
      a.personalDetails.mobile,
      `"${a.academicDetails.institution}"`,
      a.academicDetails.previousMarks,
      a.status,
      a.riskLevel,
      a.score
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Applications_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200/80 font-bold text-[10.5px] tracking-wider uppercase">
                  Central Registry
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Total Records: <strong className="text-navy-950 font-bold font-mono">{filteredApps.length}</strong>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Scholarship Applications Directory
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Filter by evaluation stage, inspect OCR document matches, and execute committee determinations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-navy-950 text-xs font-bold shadow-2xs hover:shadow-xs transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Export CSV Dataset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search */}
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by candidate, app ref, email, phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-900/15 focus:border-navy-900 bg-slate-50 focus:bg-white transition"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-900/15 focus:border-navy-900 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Final Verification">Final Verification</option>
                <option value="Waitlisted">Waitlisted</option>
                <option value="Approved">Approved</option>
                <option value="Correction Required">Correction Required</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Risk Filter */}
            <div>
              <select
                value={riskFilter}
                onChange={(e) => {
                  setRiskFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full py-2 px-3 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-900/15 focus:border-navy-900 cursor-pointer"
              >
                <option value="All">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-center justify-end">
              <button
                onClick={handleResetFilters}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Applications Data Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Candidate & App Ref</th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Institution & State</th>
                  <th
                    className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider cursor-pointer hover:text-navy-900 select-none"
                    onClick={() => {
                      setSortField("score");
                      setSortAsc(!sortAsc);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>Score / Marks</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Verification</th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Risk Level</th>
                  <th className="px-5 py-3 text-right font-bold text-[11px] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy-50 text-navy-800 border border-navy-200/80 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {app.personalDetails.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <Link
                            href={`/admin/applications/${app.id}`}
                            className="font-bold text-slate-900 hover:text-navy-900 block leading-tight text-xs"
                          >
                            {app.personalDetails.fullName}
                          </Link>
                          <span className="font-mono text-[11px] text-slate-500 font-semibold block mt-0.5">
                            {app.applicationNumber}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 truncate max-w-[220px]">
                      <div className="font-medium text-slate-800 truncate">{app.academicDetails.institution}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {app.personalDetails.state}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono tabular-nums">
                      <div className="font-bold text-slate-900 text-sm">{app.score}</div>
                      <div className="text-[10.5px] text-slate-400">
                        {app.academicDetails.previousMarks}% Marks
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <ApplicationStatusBadge status={app.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <VerificationStatusBadge status={app.verificationStatus} />
                    </td>
                    <td className="px-5 py-3.5">
                      <RiskBadge level={app.riskLevel} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 hover:text-white bg-slate-100 hover:bg-navy-900 px-3 py-1.5 rounded-lg transition-all shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Dossier</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredApps.length}
            pageSize={PAGE_SIZE}
            onPageChange={(p) => setCurrentPage(p)}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
