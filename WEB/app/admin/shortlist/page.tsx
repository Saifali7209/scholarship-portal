"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { useApp } from "../../../context/AppContext";
import { ApplicationStatusBadge } from "../../../components/ui/StatusBadge";
import { Award, ArrowUpDown, CheckCircle2, ListOrdered, ChevronRight, Sliders, Building, ShieldCheck } from "lucide-react";

export default function AdminShortlistManagementPage() {
  const { allApplications, updateApplicationStatus } = useApp();
  const [cutoffScore, setCutoffScore] = useState<number>(85.0);

  // Sort applications strictly by merit score descending
  const sortedApplicants = [...allApplications]
    .filter((a) => a.status !== "Draft")
    .sort((a, b) => b.score - a.score)
    .map((app, index) => ({
      ...app,
      meritRank: index + 1,
      tier: index < 200 ? "Selected" : index < 300 ? "Waitlist" : "Non-Shortlisted"
    }));

  const handleSelectCandidate = (appId: string) => {
    updateApplicationStatus(
      appId,
      "Shortlisted",
      "Selected in top merit shortlist tier for final Video KYC."
    );
  };

  const handleWaitlistCandidate = (appId: string) => {
    updateApplicationStatus(
      appId,
      "Waitlisted",
      "Placed in waiting list tier based on merit ranking."
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 via-amber-500 to-navy-800" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200/70 font-bold text-[11px] tracking-wider uppercase">
                  IICC Merit Governance
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  200 Total Awards (175 General + 25 Staff)
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                Shortlist & Merit Cutoff Management
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Rank-ordered selection based on official 100-Mark Formula (Academic 60 + Income 35 + Special 5).
              </p>
            </div>

            {/* Cutoff Filter Widget */}
            <div className="flex items-center gap-3 bg-slate-50/90 p-3 rounded-xl border border-slate-200/90 text-xs shadow-2xs">
              <Sliders className="w-4 h-4 text-navy-900" />
              <span className="font-bold text-slate-700">Cutoff Score:</span>
              <input
                type="number"
                step="0.5"
                value={cutoffScore}
                onChange={(e) => setCutoffScore(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-slate-300 rounded-lg font-black font-mono text-center text-navy-950 bg-white focus:ring-2 focus:ring-navy-900/20 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 font-medium">Min. Composite</span>
            </div>
          </div>
        </div>

        {/* 6 Official Category Quotas Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-black text-navy-950 uppercase tracking-wider flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <Building className="w-3.5 h-3.5" />
              </div>
              <span>IICC Scheme Quota Allocation (200 Seats)</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500 font-bold bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
              Session 2026-27
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">UG Professional</span>
              <span className="text-xl font-black text-navy-950 font-mono mt-0.5 block tabular-nums">50 Seats</span>
              <span className="text-[11px] text-blue-700 block mt-1 font-medium">B.Tech, MBBS, etc.</span>
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Sr. Secondary</span>
              <span className="text-xl font-black text-navy-950 font-mono mt-0.5 block tabular-nums">50 Seats</span>
              <span className="text-[11px] text-blue-700 block mt-1 font-medium">Class XI–XII</span>
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">PG Professional</span>
              <span className="text-xl font-black text-navy-950 font-mono mt-0.5 block tabular-nums">40 Seats</span>
              <span className="text-[11px] text-blue-700 block mt-1 font-medium">M.Tech, MBA, etc.</span>
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">School Level</span>
              <span className="text-xl font-black text-navy-950 font-mono mt-0.5 block tabular-nums">20 Seats</span>
              <span className="text-[11px] text-blue-700 block mt-1 font-medium">Class IX–X</span>
            </div>
            <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Diploma</span>
              <span className="text-xl font-black text-navy-950 font-mono mt-0.5 block tabular-nums">15 Seats</span>
              <span className="text-[11px] text-blue-700 block mt-1 font-medium">Polytechnic</span>
            </div>
            <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/90">
              <span className="text-[10px] text-amber-900 uppercase tracking-wider block font-bold">Staff Children</span>
              <span className="text-xl font-black text-amber-950 font-mono mt-0.5 block tabular-nums">25 Seats</span>
              <span className="text-[11px] text-amber-800 block mt-1 font-bold">Reserved Quota</span>
            </div>
          </div>
        </div>

        {/* Tie-Breaker Protocol Alert */}
        <div className="bg-navy-950 text-white rounded-2xl p-4 shadow-xs border border-navy-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-400">
          <div>
            <span className="text-amber-400 font-black block uppercase tracking-wider text-[11px]">
              Official Sequential Tie-Breaking Hierarchy
            </span>
            <p className="text-slate-300 mt-0.5 text-[11px]">
              In case two or more candidates obtain the identical composite score, ranking resolution proceeds strictly:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <span className="font-bold">1. Lower Family Income</span>
            <span className="text-amber-600 font-black">➔</span>
            <span className="font-bold">2. Higher Academic %</span>
            <span className="text-amber-600 font-black">➔</span>
            <span className="font-bold">3. Special Category</span>
            <span className="text-amber-600 font-black">➔</span>
            <span className="font-bold">4. Younger Age</span>
          </div>
        </div>

        {/* Tier Overview Pill Cards (HRMS Top-Accent Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-emerald-600">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Provisional Selected Tier
            </span>
            <div className="text-2xl font-black text-navy-950 font-mono mt-1 tabular-nums">
              Ranks 1 – 200 (200 Seats)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Eligible for final Video KYC & award disbursement.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-500">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
              Waiting List Tier
            </span>
            <div className="text-2xl font-black text-navy-950 font-mono mt-1 tabular-nums">
              Ranks 201 – 300 (100 Slots)
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Promoted sequentially if selected candidate fails verification.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-slate-400">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Non-Shortlisted
            </span>
            <div className="text-2xl font-black text-slate-900 font-mono mt-1 tabular-nums">
              Ranks 301+
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Fall below current composite cutoff score ({cutoffScore}).
            </p>
          </div>
        </div>

        {/* Ranking Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <Award className="w-4 h-4" />
              </div>
              <span>Ranked Applicants (100-Mark Formula)</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Total: {sortedApplicants.length} Applicants
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Rank</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Student Name</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Institution</th>
                  <th className="px-3 py-3 text-center font-bold uppercase tracking-wider text-[11px]">Acad (/60)</th>
                  <th className="px-3 py-3 text-center font-bold uppercase tracking-wider text-[11px]">Inc (/35)</th>
                  <th className="px-3 py-3 text-center font-bold uppercase tracking-wider text-[11px]">Spec (/5)</th>
                  <th className="px-4 py-3 text-center font-bold uppercase tracking-wider text-[11px]">Total (/100)</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Tier</th>
                  <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-4 py-3 text-right font-bold uppercase tracking-wider text-[11px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {sortedApplicants.slice(0, 25).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-mono font-black ${
                          app.meritRank <= 3
                            ? "bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs"
                            : app.meritRank <= 200
                            ? "bg-navy-50 text-navy-950 border border-navy-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        #{app.meritRank}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-navy-900 text-amber-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {app.personalDetails.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-bold text-navy-950">{app.personalDetails.fullName}</div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {app.applicationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 truncate max-w-[160px]">
                      {app.academicDetails.institution}
                    </td>
                    <td className="px-3 py-3 font-mono text-center text-blue-800 font-bold tabular-nums">
                      {app.scoringBreakdown?.academicMarks || 50}
                    </td>
                    <td className="px-3 py-3 font-mono text-center text-emerald-800 font-bold tabular-nums">
                      {app.scoringBreakdown?.incomeMarks || 30}
                    </td>
                    <td className="px-3 py-3 font-mono text-center text-amber-800 font-bold tabular-nums">
                      {app.scoringBreakdown?.specialCategoryMarks || 0}
                    </td>
                    <td className="px-4 py-3 font-mono font-black text-center text-navy-950 tabular-nums text-sm">
                      {app.score} / 100
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] border inline-flex items-center gap-1.5 ${
                          app.tier === "Selected"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : app.tier === "Waitlist"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            app.tier === "Selected"
                              ? "bg-emerald-500"
                              : app.tier === "Waitlist"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {app.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ApplicationStatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-right space-x-1 whitespace-nowrap">
                      {app.status !== "Shortlisted" && (
                        <button
                          onClick={() => handleSelectCandidate(app.id)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Shortlist
                        </button>
                      )}
                      {app.status !== "Waitlisted" && (
                        <button
                          onClick={() => handleWaitlistCandidate(app.id)}
                          className="px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Waitlist
                        </button>
                      )}
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold inline-block transition"
                      >
                        Dossier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
