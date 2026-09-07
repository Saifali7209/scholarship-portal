"use client";

import React from "react";
import Link from "next/link";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { StatCard } from "../../../components/ui/StatCard";
import {
  ApplicationFunnelChart,
  StatusDistributionChart,
  TimelineVolumeChart
} from "../../../components/admin/AdminCharts";
import { ApplicationStatusBadge, RiskBadge } from "../../../components/ui/StatusBadge";
import { useApp } from "../../../context/AppContext";
import {
  Users,
  FileCheck2,
  Clock,
  Award,
  Video,
  CheckCircle2,
  ListOrdered,
  XCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  Building,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function AdminDashboardPage() {
  const { allApplications } = useApp();

  // Top 8 stats from specification
  const stats = [
    { title: "Total Applications", value: "10,248", icon: Users, color: "blue" as const },
    { title: "Submitted", value: "9,842", icon: FileCheck2, color: "indigo" as const },
    { title: "Under Review", value: "3,421", icon: Clock, color: "indigo" as const },
    { title: "Shortlisted", value: "325", icon: Award, color: "purple" as const },
    { title: "Final Verification", value: "287", icon: Video, color: "blue" as const },
    { title: "Approved & Disbursed", value: "198", icon: CheckCircle2, color: "emerald" as const },
    { title: "Waitlisted", value: "100", icon: ListOrdered, color: "amber" as const },
    { title: "Rejected / Ineligible", value: "1,224", icon: XCircle, color: "rose" as const }
  ];

  // Applications requiring urgent attention (high risk or final verification)
  const urgentQueue = allApplications.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Executive Page Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200/80 font-bold text-[10.5px] tracking-wider uppercase">
                  Executive Command
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  National Cycle 2026-27
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Operations
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Scholarship Operations Command Center
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                India Islamic Cultural Centre • Real-time applicant metrics, risk triage, and 200 merit-cum-means awards disbursement.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin/applications"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98"
              >
                <span>Applications Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 8 Metric StatCards Grid (Enhanced with HRMS Top-Accent Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((st) => (
            <StatCard
              key={st.title}
              title={st.title}
              value={st.value}
              icon={st.icon}
              highlightColor={st.color}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Chart 1: Selection Funnel */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Selection Funnel</h3>
                <p className="text-[11px] text-slate-500">Stage progression drop-off</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                10,248 → 198
              </span>
            </div>
            <ApplicationFunnelChart />
          </div>

          {/* Chart 2: Status Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Status Distribution
                </h3>
                <p className="text-[11px] text-slate-500">Active evaluation pool</p>
              </div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                8 Stages Active
              </span>
            </div>
            <StatusDistributionChart />
          </div>

          {/* Chart 3: Weekly Volume Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Applications Intake
                  </h3>
                  <p className="text-[11px] text-slate-500">Weekly submission trajectory</p>
                </div>
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5" /> +14.2%
                </span>
              </div>
            </div>
            <TimelineVolumeChart />
          </div>
        </div>

        {/* Urgent Action Queue & Quick Triage (HRMS Data Table Pattern) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center shadow-2xs">
                <AlertTriangle className="w-4.5 h-4.5 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    Priority Review & Triage Queue
                  </h3>
                  <span className="bg-amber-100 text-amber-900 font-mono text-[10.5px] font-bold px-2 py-0.5 rounded-full border border-amber-300/80">
                    5 Requiring Action
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  High-risk indicators or awaiting final officer sign-off.
                </p>
              </div>
            </div>

            <Link
              href="/admin/applications"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-navy-900 transition shadow-2xs group"
            >
              <span>View Full Queue</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Candidate & App Ref</th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Institution</th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Merit %</th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-left font-bold text-[11px] uppercase tracking-wider">Risk Level</th>
                  <th className="px-5 py-3 text-right font-bold text-[11px] uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {urgentQueue.map((app) => (
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
                          <span className="font-bold text-slate-900 block leading-tight text-xs">
                            {app.personalDetails.fullName}
                          </span>
                          <span className="font-mono text-[11px] text-slate-500 font-semibold block mt-0.5">
                            {app.applicationNumber}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 truncate max-w-[200px]">
                      {app.academicDetails.institution}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-slate-900 tabular-nums">
                      {app.academicDetails.previousMarks}%
                    </td>
                    <td className="px-5 py-3.5">
                      <ApplicationStatusBadge status={app.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <RiskBadge level={app.riskLevel} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 hover:text-white bg-slate-100 hover:bg-navy-900 px-3 py-1.5 rounded-lg transition-all shadow-2xs"
                      >
                        <span>Review Dossier</span>
                        <ChevronRight className="w-3 h-3" />
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
