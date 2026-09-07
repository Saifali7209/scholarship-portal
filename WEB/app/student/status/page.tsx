"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../../context/AppContext";
import { StudentLayout } from "../../../components/layout/StudentLayout";
import { ApplicationTimeline } from "../../../components/student/ApplicationTimeline";
import { ApplicationStatusBadge } from "../../../components/ui/StatusBadge";
import {
  Clock,
  Video,
  FileCheck2,
  AlertTriangle,
  Award,
  ArrowRight,
  ShieldCheck,
  Building,
  Printer,
  Calendar
} from "lucide-react";

export default function ApplicationStatusPage() {
  const { studentApplication } = useApp();

  const isWaitlisted = studentApplication.status === "Waitlisted";
  const isShortlisted =
    studentApplication.status === "Shortlisted" ||
    studentApplication.status === "Final Verification";
  const isApproved = studentApplication.status === "Approved";
  const isCorrection = studentApplication.status === "Correction Required";

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-navy-50 text-navy-800 border border-navy-200/60 font-semibold text-[10px] tracking-wider uppercase">
                  Lifecycle Tracking
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-mono">
                  Ref: <strong className="text-navy-900 font-bold">{studentApplication.applicationNumber}</strong>
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
                Application Status & Milestones
              </h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Last Updated: <strong className="text-slate-700 font-mono">{studentApplication.lastUpdated}</strong></span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ApplicationStatusBadge status={studentApplication.status} />
            </div>
          </div>
        </div>

        {/* Action Prompt Banner if needed */}
        {isShortlisted && (
          <div className="p-5 bg-emerald-50/90 border border-emerald-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-emerald-600 text-white shadow-xs">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">
                  Final Video KYC Verification Required
                </h4>
                <p className="text-xs text-emerald-900/90 mt-0.5">
                  Complete your browser-based Video KYC session to confirm your fellowship award.
                </p>
              </div>
            </div>

            <Link
              href="/student/final-verification"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition active:scale-98 flex-shrink-0"
            >
              <span>Start Video KYC</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {isCorrection && (
          <div className="p-5 bg-amber-50/90 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-lg bg-amber-600 text-white shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-950">
                  Document Correction Notice Issued
                </h4>
                <p className="text-xs text-amber-900/90 mt-0.5">
                  A verification officer requested a replacement or clear copy for your income certificate.
                </p>
              </div>
            </div>

            <Link
              href="/student/application/documents"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold shadow-xs transition active:scale-98 flex-shrink-0"
            >
              <span>Re-upload Document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {isWaitlisted && (
          <div className="p-5 bg-amber-50/90 border border-amber-200 rounded-xl shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-amber-950 bg-amber-200/80 px-2.5 py-0.5 rounded-md">
                Waitlist Position #{studentApplication.waitlistPosition || 12}
              </span>
              <span className="text-xs text-amber-900 font-medium font-mono">Merit Score: {studentApplication.score} / 100</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed mt-1">
              You are on the provisional waiting list. If any shortlisted candidate in the quota allocation does not complete Video KYC or fails verification, waitlisted candidates are automatically considered in merit order.
            </p>
          </div>
        )}

        {isApproved && (
          <div className="p-6 bg-emerald-50/80 text-slate-900 rounded-xl border border-emerald-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-lg bg-emerald-600 text-white shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block">
                  Official Confirmation
                </span>
                <h3 className="text-base font-extrabold text-navy-950 mt-0.5">
                  Scholarship Award Confirmed
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Direct grant disbursement scheduled via institutional PFMS / DBT network.
                </p>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold hover:bg-navy-800 transition shadow-xs flex-shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print Award Letter</span>
            </button>
          </div>
        )}

        {/* Visual Timeline Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
          <h2 className="text-sm font-bold text-navy-950 mb-6 flex items-center gap-2">
            <div className="p-1 rounded bg-navy-50 text-navy-800 border border-navy-100">
              <Clock className="w-4 h-4" />
            </div>
            <span>Official Application Milestones</span>
          </h2>

          <ApplicationTimeline
            steps={studentApplication.timeline}
            currentStatus={studentApplication.status}
          />
        </div>
      </div>
    </StudentLayout>
  );
}
