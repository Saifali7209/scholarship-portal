"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../../context/AppContext";
import { StudentLayout } from "../../../components/layout/StudentLayout";
import { ApplicationStatusBadge, DocumentStatusBadge } from "../../../components/ui/StatusBadge";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video,
  ArrowRight,
  UploadCloud,
  Calendar,
  Award,
  Bell,
  Sparkles,
  ListOrdered,
  Building,
  ShieldCheck
} from "lucide-react";

export default function StudentDashboardPage() {
  const { studentApplication, notifications } = useApp();

  const totalDocs = studentApplication.documents.length;
  const uploadedDocs = studentApplication.documents.filter(
    (d) => d.status === "Uploaded" || d.status === "Verified"
  ).length;

  const completionPct =
    studentApplication.status === "Draft"
      ? Math.round((uploadedDocs / Math.max(totalDocs, 1)) * 40 + 50)
      : studentApplication.status === "Approved"
      ? 100
      : 85;

  const isWaitlisted = studentApplication.status === "Waitlisted";
  const isShortlisted =
    studentApplication.status === "Shortlisted" ||
    studentApplication.status === "Final Verification";
  const isApproved = studentApplication.status === "Approved";
  const isDraft = studentApplication.status === "Draft";

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome & Primary Status Banner */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-navy-50 text-navy-800 border border-navy-200/60 font-semibold text-[11px] tracking-wider uppercase">
                  Academic Year 2026-27
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                  Ref: <span className="text-slate-800 font-bold">{studentApplication.applicationNumber}</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                Welcome, {studentApplication.personalDetails.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Scholarship Stream:{" "}
                <strong className="text-navy-900 font-semibold">
                  {studentApplication.scholarshipName}
                </strong>
              </p>
            </div>

            {/* Application Status Capsule & Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-left">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Application Status
                </span>
                <ApplicationStatusBadge status={studentApplication.status} />
              </div>

              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />

              {/* Dynamic Main Action Button */}
              {isDraft && (
                <Link
                  href="/student/application"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98"
                >
                  <span>Continue Application</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              {isShortlisted && (
                <Link
                  href="/student/final-verification"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98 animate-pulse"
                >
                  <Video className="w-4 h-4" />
                  <span>Complete Video KYC</span>
                </Link>
              )}

              {isApproved && (
                <Link
                  href="/student/status"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition"
                >
                  <Award className="w-4 h-4" />
                  <span>View Award Details</span>
                </Link>
              )}

              {!isDraft && !isShortlisted && !isApproved && (
                <Link
                  href="/student/status"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs transition"
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Track Timeline</span>
                </Link>
              )}
            </div>
          </div>

          {/* Progress Completion Indicator */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-navy-700" />
                <span>Application & Verification Progress</span>
              </span>
              <span className="font-mono font-bold text-navy-950 tabular-nums">{completionPct}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isApproved ? "bg-emerald-600" : "bg-navy-900"
                }`}
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Waitlist Callout Banner if applicable */}
        {isWaitlisted && (
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-5 flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2.5 bg-amber-100 text-amber-900 rounded-lg flex-shrink-0 border border-amber-200">
              <ListOrdered className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-200/80 text-amber-950 text-xs font-bold">
                  Waitlist Position: #{studentApplication.waitlistPosition || 12}
                </span>
                <span className="text-xs text-amber-900 font-medium">Merit Score: {studentApplication.score} / 100</span>
              </div>
              <h3 className="text-sm font-bold text-amber-950 mt-1.5">
                Candidate Waitlist Notice
              </h3>
              <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                You will be automatically invited for final Video KYC verification if a shortlisted candidate relinquishes their award or does not clear verification. No further action is required at this stage.
              </p>
            </div>
          </div>
        )}

        {/* Shortlisted Celebration Banner */}
        {isShortlisted && (
          <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-5 flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-lg flex-shrink-0 border border-emerald-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-200/80 text-emerald-950 text-xs font-bold">
                  Provisional Merit Rank: #{studentApplication.rank || 18}
                </span>
                <span className="text-xs text-emerald-800 font-medium">Score: {studentApplication.score} / 100</span>
              </div>
              <h3 className="text-sm font-bold text-emerald-950 mt-1.5">
                Congratulations! You have been provisionally shortlisted.
              </h3>
              <p className="text-xs text-emerald-900/90 mt-1 leading-relaxed">
                To confirm your fellowship grant disbursement, please complete the mandatory browser-based Video KYC identity verification before 10 October 2026.
              </p>
              <div className="mt-3">
                <Link
                  href="/student/final-verification"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Start Video KYC Verification</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Key Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Documents Status */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                  <div className="p-1 rounded bg-navy-50 text-navy-800 border border-navy-100">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span>Document Records</span>
                </h3>
                <span className="text-xs font-mono font-bold text-navy-950 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  {uploadedDocs} / {totalDocs}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {studentApplication.documents.slice(0, 3).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50/70 border border-slate-100"
                  >
                    <span className="font-medium text-slate-800 truncate max-w-[140px]">
                      {doc.name}
                    </span>
                    <DocumentStatusBadge status={doc.status} />
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/student/application/documents"
              className="text-xs font-semibold text-navy-800 hover:text-navy-950 flex items-center justify-between pt-3 border-t border-slate-100 group"
            >
              <span>Manage & Upload Documents</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Card 2: Verification Status */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                  <div className="p-1 rounded bg-navy-50 text-navy-800 border border-navy-100">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>Identity Verification</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {studentApplication.verificationStatus}
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 mb-4">
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-50/70">
                  <span>Aadhaar e-KYC:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {studentApplication.personalDetails.aadhaarMasked}
                  </span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-50/70">
                  <span>Enrollment Status:</span>
                  <span className="font-semibold text-slate-900">Verified Bonafide</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-50/70">
                  <span>Video KYC Liveness:</span>
                  <span className="font-semibold text-slate-900">
                    {isApproved ? "Passed (99.2%)" : isShortlisted ? "Action Required" : "Queued"}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/student/status"
              className="text-xs font-semibold text-navy-800 hover:text-navy-950 flex items-center justify-between pt-3 border-t border-slate-100 group"
            >
              <span>View Verification Trail</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Card 3: Important Dates & Notices */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h3 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                  <div className="p-1 rounded bg-navy-50 text-navy-800 border border-navy-100">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <span>Important Deadlines</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">2026-27</span>
              </div>

              <div className="space-y-2 text-xs mb-4">
                <div className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-100">
                  <div className="font-semibold text-slate-900">Portal Application Deadline</div>
                  <div className="text-slate-500 font-mono text-[11px] mt-0.5">31 Oct 2026 • 23:59 IST</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-100">
                  <div className="font-semibold text-slate-900">Provisional Merit Release</div>
                  <div className="text-slate-500 font-mono text-[11px] mt-0.5">15 Nov 2026</div>
                </div>
              </div>
            </div>

            <Link
              href="/student/notifications"
              className="text-xs font-semibold text-navy-800 hover:text-navy-950 flex items-center justify-between pt-3 border-t border-slate-100 group"
            >
              <span>Institutional Notices</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
