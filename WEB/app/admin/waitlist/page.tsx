"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { useApp } from "../../../context/AppContext";
import { ApplicationStatusBadge, VerificationStatusBadge } from "../../../components/ui/StatusBadge";
import {
  ListOrdered,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  RotateCw,
  Building,
  ShieldCheck
} from "lucide-react";

export default function AdminWaitlistManagementPage() {
  const { allApplications, promoteWaitlistCandidate, updateApplicationStatus } = useApp();
  const [promotionNotice, setPromotionNotice] = useState<string | null>(null);

  // Filter waitlisted candidates
  const waitlist = allApplications
    .filter((a) => a.status === "Waitlisted" || a.waitlistPosition)
    .sort((a, b) => (a.waitlistPosition || 99) - (b.waitlistPosition || 99));

  const handlePromoteCandidate = (appId: string, studentName: string) => {
    promoteWaitlistCandidate(appId);
    setPromotionNotice(
      `Candidate ${studentName} successfully promoted from waitlist to Final Video KYC verification.`
    );
    setTimeout(() => setPromotionNotice(null), 5000);
  };

  const handleRemoveCandidate = (appId: string) => {
    if (confirm("Remove candidate from active waiting list?")) {
      updateApplicationStatus(
        appId,
        "Rejected",
        "Administrative removal from waiting list."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 via-amber-500 to-navy-800" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold text-[11px] tracking-wider uppercase">
                  Contingency Allocation
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-mono font-medium">
                  Active Waiting List: <strong className="text-navy-950 font-bold">{waitlist.length} Candidates</strong>
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                Waitlist Queue & Dynamic Succession
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Manage waiting list activation when shortlisted awardees fail biometric verification or forfeit awards.
              </p>
            </div>
          </div>
        </div>

        {/* Promotion Workflow Callout Box (HRMS Top Accent Card) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-500">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Active Succession Trigger
              </span>
              <span className="text-xs font-bold text-navy-950 font-mono">1 Quota Vacancy Available</span>
            </div>
            <h3 className="text-sm font-black text-navy-950 mt-1">
              Shortlisted Candidate at Rank #64 Failed Biometric Verification
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              An unallocated fellowship seat has opened up. You can activate merit succession to promote the top-ranked waiting candidate directly to Final Verification.
            </p>
          </div>

          <button
            onClick={() => {
              if (waitlist.length > 0) {
                handlePromoteCandidate(waitlist[0].id, waitlist[0].personalDetails.fullName);
              }
            }}
            disabled={waitlist.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-navy-950 text-xs font-black shadow-xs hover:shadow-sm transition disabled:opacity-40 whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Promote Next Candidate (Waitlist #1)</span>
          </button>
        </div>

        {promotionNotice && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2.5 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span className="font-bold">{promotionNotice}</span>
          </div>
        )}

        {/* Waitlist Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center">
                <ListOrdered className="w-4 h-4" />
              </div>
              <span>Waitlist Succession Order ({waitlist.length} Candidates)</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Order by Composite Merit
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Position</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Student Name / App No.</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Institution</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Merit Score</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Verification Readiness</th>
                  <th className="px-5 py-3 text-right font-bold uppercase tracking-wider text-[11px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {waitlist.map((app, idx) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5">
                      <span className="font-mono font-black text-amber-950 bg-amber-100/90 px-2.5 py-1 rounded-lg border border-amber-300">
                        #{app.waitlistPosition || idx + 1}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
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
                          <div className="font-mono text-[10px] text-slate-400">
                            {app.applicationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 truncate max-w-[200px]">
                      {app.academicDetails.institution}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-black text-navy-950 tabular-nums text-sm">
                      {app.score} / 100
                    </td>
                    <td className="px-5 py-3.5">
                      <ApplicationStatusBadge status={app.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-emerald-800 font-bold flex items-center gap-1.5 text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Docs Verified</span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() =>
                          handlePromoteCandidate(app.id, app.personalDetails.fullName)
                        }
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        Promote to KYC
                      </button>
                      <button
                        onClick={() => handleRemoveCandidate(app.id)}
                        className="px-2.5 py-1.5 text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        Remove
                      </button>
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
