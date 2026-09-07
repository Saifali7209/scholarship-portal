"use client";

import React, { useState } from "react";
import { StudentLayout } from "../../../components/layout/StudentLayout";
import { useApp } from "../../../context/AppContext";
import { User, Mail, Phone, MapPin, ShieldCheck, CheckCircle2, Building } from "lucide-react";

export default function StudentProfilePage() {
  const { studentApplication } = useApp();
  const { personalDetails, academicDetails, bankDetails } = studentApplication;
  const [isSaved, setIsSaved] = useState(false);

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-md bg-navy-50 text-navy-800 border border-navy-200/60 font-semibold text-[10px] tracking-wider uppercase">
              Candidate Dossier
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-medium text-slate-500">
              Ref: <strong className="text-navy-950 font-bold">{studentApplication.applicationNumber}</strong>
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
            Applicant Profile & Credentials
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified candidate records, institutional enrollment verification, and direct DBT bank link.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-6">
            <div className="w-14 h-14 rounded-xl bg-navy-900 text-white font-extrabold text-xl flex items-center justify-center border border-navy-800 shadow-xs flex-shrink-0">
              {personalDetails.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-navy-950">
                  {personalDetails.fullName}
                </h2>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Identity
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {academicDetails.institution} • Roll No: <span className="font-mono text-slate-700 font-medium">{academicDetails.rollNumber}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3.5">
              <h3 className="font-bold text-navy-950 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
                Personal Particulars
              </h3>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Date of Birth:</span>
                <span className="font-semibold text-slate-900 font-mono">{personalDetails.dob}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Gender / Category:</span>
                <span className="font-semibold text-slate-900">
                  {personalDetails.gender} ({personalDetails.category})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Aadhaar (Masked):</span>
                <span className="font-mono font-semibold text-slate-900">
                  {personalDetails.aadhaarMasked}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Permanent Address:</span>
                <span className="font-semibold text-slate-900 text-right max-w-[200px]">
                  {personalDetails.address}, {personalDetails.city}, {personalDetails.state}
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              <h3 className="font-bold text-navy-950 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
                Bank Disbursement Account
              </h3>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Bank Name:</span>
                <span className="font-semibold text-slate-900">{bankDetails.bankName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Account Number:</span>
                <span className="font-mono font-semibold text-slate-900">
                  {bankDetails.accountNumber}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">IFSC Code:</span>
                <span className="font-mono font-semibold text-slate-900 uppercase">
                  {bankDetails.ifscCode}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Aadhaar Seeding:</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Active (DBT Enabled)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
