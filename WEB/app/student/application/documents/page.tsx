"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../../context/AppContext";
import { StudentLayout } from "../../../../components/layout/StudentLayout";
import { DocumentUploader } from "../../../../components/student/DocumentUploader";
import { ArrowRight, ArrowLeft, ShieldCheck, AlertCircle, FileCheck } from "lucide-react";

export default function DocumentUploadPage() {
  const { studentApplication, uploadDocumentMock } = useApp();
  const router = useRouter();

  const totalRequired = studentApplication.documents.filter((d) => d.required).length;
  const uploadedRequired = studentApplication.documents.filter(
    (d) => d.required && (d.status === "Uploaded" || d.status === "Verified")
  ).length;

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy-800 uppercase tracking-widest bg-navy-50 px-2.5 py-0.5 rounded border border-navy-200">
                IICC Questions 41–45
              </span>
              <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded font-mono">
                Ref: {studentApplication.applicationNumber}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Required Documents Verification
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload self-attested digital copies as required by India Islamic Cultural Centre guidelines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-navy-50 text-navy-900 border border-navy-200/90 shadow-2xs">
              {uploadedRequired} of {totalRequired} Mandatory Documents Uploaded
            </span>
          </div>
        </div>

        {/* Official IICC Document Checklist Guide */}
        <div className="gov-card p-4 sm:p-5 shadow-xs text-xs text-slate-700 space-y-2.5">
          <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
            Official Checklist as per IICC Form Page 4:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="font-mono font-bold text-navy-800">Q41:</span>
              <span>Self-attested copy of Aadhaar Card (Mandatory)</span>
            </div>
            <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="font-mono font-bold text-navy-800">Q42:</span>
              <span>Self-attested copy of PAN Card (Optional)</span>
            </div>
            <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="font-mono font-bold text-navy-800">Q43:</span>
              <span>Bonafide Certificate / Enrolment proof from Head of Institution (Mandatory)</span>
            </div>
            <div className="flex items-start gap-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="font-mono font-bold text-navy-800">Q44:</span>
              <span>Certificate of Disability / Special Category (Optional / If applicable)</span>
            </div>
            <div className="flex items-start gap-1.5 sm:col-span-2 p-2 bg-slate-50 rounded-lg border border-slate-200/70">
              <span className="font-mono font-bold text-navy-800">Q45:</span>
              <span>Income Certificate from competent authority OR Notary Affidavit on ₹10 non-judicial stamp paper</span>
            </div>
          </div>
        </div>

        {/* Security & OCR Notice */}
        <div className="bg-blue-50/80 text-slate-900 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-blue-200/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-white text-blue-900 border border-blue-200 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-tight text-navy-950">Automated OCR Authenticity Cross-Verification</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                Uploaded files are scanned by the verification pipeline to match name, roll number, and income.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-md border border-emerald-300 self-start sm:self-auto whitespace-nowrap">
            100% Paperless Verification
          </span>
        </div>

        {/* List of Documents */}
        <div className="space-y-4">
          {studentApplication.documents.map((doc) => (
            <DocumentUploader
              key={doc.id}
              document={doc}
              onUploadSuccess={(docId, fileName, fileSize) => {
                uploadDocumentMock(docId, fileName, fileSize);
              }}
            />
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="gov-card p-4 shadow-xs flex items-center justify-between">
          <Link
            href="/student/application"
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Application Form</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/student/application/review"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs transition active:scale-95"
            >
              <span>Proceed to Review & Submit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
