"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "../../../../context/AppContext";
import { StudentLayout } from "../../../../components/layout/StudentLayout";
import {
  CheckCircle2,
  Printer,
  Download,
  Eye,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  QrCode
} from "lucide-react";

export default function ApplicationSubmittedSuccessPage() {
  const { studentApplication } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-8 font-sans">
        {/* Top Success Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 sm:p-8 text-center no-print shadow-xs">
          <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded border border-emerald-200 inline-block">
            Official Receipt Generated
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-2 tracking-tight">
            Application Submitted Successfully
          </h1>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Your application dossier has been registered in the national scholarship portal and queued for automated document inspection.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Acknowledgement</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download PDF Slip</span>
            </button>
            <Link
              href="/student/status"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs transition active:scale-95"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Track Status</span>
            </Link>
          </div>
        </div>

        {/* Official Printable Acknowledgement Slip */}
        <div className="bg-white rounded-xl border border-slate-300 p-8 shadow-xs print-card">
          {/* Slip Header */}
          <div className="flex items-start justify-between border-b-2 border-navy-900 pb-6 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-navy-900 flex items-center justify-center text-white border border-navy-800 shadow-2xs">
                <GraduationCap className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-navy-950 tracking-tight block">
                  INDIA ISLAMIC CULTURAL CENTRE (IICC)
                </span>
                <span className="text-xs text-slate-700 font-semibold block">
                  Scholarship Programme 2026-27 • Education Committee
                </span>
                <span className="text-[11px] text-slate-500 block">
                  87-88, Lodhi Road, New Delhi – 110003 • Convener: Dr. Khwaja M. Shahid
                </span>
              </div>
            </div>

            {/* QR Mock */}
            <div className="text-center p-2 bg-slate-50 border border-slate-200 rounded-lg">
              <QrCode className="w-12 h-12 text-navy-900 mx-auto" />
              <span className="text-[9px] font-mono text-slate-500 block mt-1">
                SCAN TO VERIFY
              </span>
            </div>
          </div>

          {/* Core Receipt Fields */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-8">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                Application Number
              </span>
              <span className="text-sm font-extrabold text-navy-900 font-mono mt-0.5 block">
                {studentApplication.applicationNumber}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                Merit Formula Score
              </span>
              <span className="text-sm font-extrabold text-emerald-700 font-mono mt-0.5 block">
                {studentApplication.score || 85} / 100
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                Submission Date
              </span>
              <span className="text-xs font-bold text-slate-800 mt-0.5 block font-mono">
                {todayStr}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                Application Status
              </span>
              <span className="text-xs font-bold text-blue-700 mt-0.5 block">
                SUBMITTED (READ-ONLY)
              </span>
            </div>
          </div>

          {/* Dossier Details Table */}
          <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 text-xs">
            <div className="bg-slate-100/80 px-4 py-2.5 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between border-b border-slate-200">
              <span>Summary of Application Particulars (46 Questions)</span>
              <span className="text-[10px] text-navy-800 font-mono font-bold">IICC FORM 2026-27</span>
            </div>
            <div className="divide-y divide-slate-100 bg-white">
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500">Scholarship Scheme:</span>
                <span className="w-2/3 font-semibold text-slate-900">
                  {studentApplication.scholarshipName}
                </span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500">Applicant Full Name:</span>
                <span className="w-2/3 font-semibold text-slate-900">
                  {studentApplication.personalDetails.fullName}
                </span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500">Enrolled Institution:</span>
                <span className="w-2/3 font-semibold text-slate-900">
                  {studentApplication.academicDetails.institution}
                </span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500">Course & Year:</span>
                <span className="w-2/3 font-semibold text-slate-900">
                  {studentApplication.academicDetails.course} ({studentApplication.academicDetails.yearOfStudy})
                </span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500">100-Mark Score Breakdown:</span>
                <span className="w-2/3 font-mono font-bold text-navy-900">
                  Academic: {studentApplication.scoringBreakdown?.academicMarks || 50}/60 • Income: {studentApplication.scoringBreakdown?.incomeMarks || 30}/35 • Special: {studentApplication.scoringBreakdown?.specialCategoryMarks || 5}/5
                </span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500">Annual Family Income:</span>
                <span className="w-2/3 font-mono font-semibold text-slate-900">
                  {studentApplication.familyDetails.annualFamilyIncome} ({studentApplication.familyDetails.incomeBracket || "Rs.2,50,001 - Rs.3,50,000"})
                </span>
              </div>
              <div className="flex px-4 py-2.5">
                <span className="w-1/3 text-slate-500">Disbursement Bank:</span>
                <span className="w-2/3 font-mono font-semibold text-slate-900">
                  {studentApplication.bankDetails.bankName} (A/C: {studentApplication.bankDetails.accountNumber} • IFSC: {studentApplication.bankDetails.ifscCode})
                </span>
              </div>
            </div>
          </div>

          {/* Security stamp note */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 border-t border-slate-200 pt-4 gap-2">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Digitally Authenticated by India Islamic Cultural Centre (IICC) Portal</span>
            </div>
            <span className="font-mono">IP: 103.24.12.89 • Lodhi Road Registry</span>
          </div>
        </div>

        {/* Back to Dashboard CTA */}
        <div className="text-center no-print pb-8">
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-800 hover:text-navy-900 hover:underline"
          >
            <span>Return to Student Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </StudentLayout>
  );
}
