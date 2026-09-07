"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../../context/AppContext";
import { StudentLayout } from "../../../../components/layout/StudentLayout";
import { Modal } from "../../../../components/ui/Modal";
import { DocumentStatusBadge } from "../../../../components/ui/StatusBadge";
import {
  FileText,
  User,
  GraduationCap,
  Users,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Edit3
} from "lucide-react";

export default function ApplicationReviewPage() {
  const { studentApplication, submitApplication } = useApp();
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const appNumber = submitApplication();
      setIsSubmitting(false);
      setConfirmModalOpen(false);
      router.push("/student/application/submitted");
    }, 600);
  };

  const { personalDetails, academicDetails, familyDetails, bankDetails, documents } =
    studentApplication;

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6 font-sans">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy-800 uppercase tracking-widest bg-navy-50 px-2.5 py-0.5 rounded border border-navy-200">
                IICC Final Review
              </span>
              <span className="text-xs bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded font-mono">
                Ref: {studentApplication.applicationNumber}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
              Review Application Details
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              India Islamic Cultural Centre • Confirm 46 Form Questions & Merit Formula Score
            </p>
          </div>
        </div>

        {/* 100-Mark Formula Live Score Dossier Card */}
        <div className="bg-white text-slate-900 rounded-xl p-5 sm:p-6 shadow-xs border border-slate-200/90">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Official 100-Mark Formula Determination
              </span>
              <h3 className="text-xl font-extrabold mt-0.5 font-mono tabular-nums text-navy-950">
                Total Merit Score: {studentApplication.score || 85} / 100
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Formula: Academic (Max 60) + Income Need (Max 35) + Special Category (Max 5)
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-blue-50/70 border border-blue-200/80 p-2.5 rounded-lg">
                <span className="text-[10px] text-blue-800 block uppercase font-semibold">Academic</span>
                <span className="text-base font-extrabold text-blue-950 font-mono">
                  {studentApplication.scoringBreakdown?.academicMarks || 50} / 60
                </span>
              </div>
              <div className="bg-emerald-50/70 border border-emerald-200/80 p-2.5 rounded-lg">
                <span className="text-[10px] text-emerald-800 block uppercase font-semibold">Income Need</span>
                <span className="text-base font-extrabold text-emerald-950 font-mono">
                  {studentApplication.scoringBreakdown?.incomeMarks || 30} / 35
                </span>
              </div>
              <div className="bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-lg">
                <span className="text-[10px] text-amber-800 block uppercase font-semibold">Special</span>
                <span className="text-base font-extrabold text-amber-950 font-mono">
                  {studentApplication.scoringBreakdown?.specialCategoryMarks || 5} / 5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Personal Details */}
        <div className="gov-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <User className="w-4 h-4 text-navy-800" />
              <span>Personal Information (Q01–Q12)</span>
            </h3>
            <Link
              href="/student/application"
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy-800 hover:text-navy-900 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Full Legal Name</span>
              <span className="font-semibold text-slate-900">{personalDetails.fullName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Date of Birth</span>
              <span className="font-semibold text-slate-900 font-mono">{personalDetails.dob}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Gender</span>
              <span className="font-semibold text-slate-900">{personalDetails.gender}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Religion</span>
              <span className="font-semibold text-slate-900">{personalDetails.religion || "Muslim"}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Social Category</span>
              <span className="font-semibold text-slate-900">{personalDetails.category}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Aadhaar Masked</span>
              <span className="font-mono font-semibold text-slate-900">{personalDetails.aadhaarMasked}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Mobile Phone</span>
              <span className="font-mono font-semibold text-slate-900">{personalDetails.mobile}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Email Address</span>
              <span className="font-semibold text-slate-900 truncate block">{personalDetails.email}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: Academic Details */}
        <div className="gov-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-navy-800" />
              <span>Academic Records (Q13–Q28)</span>
            </h3>
            <Link
              href="/student/application"
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy-800 hover:text-navy-900 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="sm:col-span-2">
              <span className="text-slate-500 block text-[11px]">Current Enrolled Course</span>
              <span className="font-semibold text-slate-900">{academicDetails.course}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 block text-[11px]">Institution & Affiliation</span>
              <span className="font-semibold text-slate-900">{academicDetails.institution}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Current Year/Sem</span>
              <span className="font-semibold text-slate-900">{academicDetails.yearOfStudy}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Previous Qualifying Exam</span>
              <span className="font-semibold text-slate-900">{academicDetails.examinationPassed}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Aggregate Marks (%)</span>
              <span className="font-bold text-navy-900 font-mono">{academicDetails.previousMarks}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Roll / Registration Number</span>
              <span className="font-mono font-semibold text-slate-900">{academicDetails.rollNumber}</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: Family & Income */}
        <div className="gov-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <Users className="w-4 h-4 text-navy-800" />
              <span>Family & Income Need (Q31–Q35)</span>
            </h3>
            <Link
              href="/student/application"
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy-800 hover:text-navy-900 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Father's Name</span>
              <span className="font-semibold text-slate-900">{familyDetails.fatherName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Father's Occupation</span>
              <span className="font-semibold text-slate-900">{familyDetails.fatherOccupation}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Mother's Name</span>
              <span className="font-semibold text-slate-900">{familyDetails.motherName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Total Family Members</span>
              <span className="font-semibold text-slate-900 font-mono">{familyDetails.familySize}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 block text-[11px]">Annual Family Income Bracket</span>
              <span className="font-bold text-emerald-800">{familyDetails.incomeBracket}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 block text-[11px]">Annual Family Income</span>
              <span className="font-semibold text-slate-900 font-mono">{familyDetails.annualFamilyIncome}</span>
            </div>
          </div>
        </div>

        {/* SECTION 4: Bank Details */}
        <div className="gov-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <Building className="w-4 h-4 text-navy-800" />
              <span>Disbursement Bank Details (Q36–Q40)</span>
            </h3>
            <Link
              href="/student/application"
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy-800 hover:text-navy-900 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">Account Holder</span>
              <span className="font-semibold text-slate-900">{bankDetails.accountHolderName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Bank Name</span>
              <span className="font-semibold text-slate-900">{bankDetails.bankName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Account Number</span>
              <span className="font-mono font-semibold text-slate-900">{bankDetails.accountNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">IFSC Code</span>
              <span className="font-mono font-bold text-navy-900">{bankDetails.ifscCode}</span>
            </div>
          </div>
        </div>

        {/* SECTION 5: Documents Attached */}
        <div className="gov-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-navy-800" />
              <span>Attached Documents (Q41–Q45)</span>
            </h3>
            <Link
              href="/student/application/documents"
              className="inline-flex items-center gap-1 text-xs font-semibold text-navy-800 hover:text-navy-900 hover:underline"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Upload / Replace</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs"
              >
                <div className="min-w-0 pr-2">
                  <span className="font-bold text-slate-800 block truncate">
                    {doc.name}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {doc.fileName || "Not uploaded"}
                  </span>
                </div>
                <DocumentStatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Declaration & Submission Box */}
        <div className="bg-slate-50 text-slate-800 rounded-xl p-6 sm:p-8 shadow-xs border border-slate-200/90">
          <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-navy-950">
            Q46. Official Undertaking & Declaration
          </h3>
          <label className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmedDeclaration}
              onChange={(e) => setConfirmedDeclaration(e.target.checked)}
              className="w-4 h-4 text-navy-800 rounded border-slate-300 focus:ring-navy-600 mt-0.5"
            />
            <span className="leading-relaxed">
              "I hereby declare that the particulars given above are true and correct to the best of my knowledge and belief. If at any stage any information is found false or suppressed, the scholarship awarded may be cancelled and recovered. I confirm that I satisfy all 3 baseline conditions of the India Islamic Cultural Centre (IICC) scholarship programme."
            </span>
          </label>

          <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/student/application/documents"
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-navy-950 transition font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Documents</span>
            </Link>

            <button
              onClick={() => setConfirmModalOpen(true)}
              disabled={!confirmedDeclaration}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition active:scale-95 uppercase tracking-wider cursor-pointer"
            >
              Submit Application to IICC
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Application Submission"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Are you sure you want to submit this application? After submission, editing may be restricted and the application will become <strong>read-only</strong> while under institutional review.
            </p>
          </div>

          <div className="text-slate-600 space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200/70">
            <div>• Scholarship: <strong className="text-slate-800">{studentApplication.scholarshipName}</strong></div>
            <div>• Candidate: <strong className="text-slate-800">{personalDetails.fullName}</strong></div>
            <div>• Registered Email: <strong className="text-slate-800">{personalDetails.email}</strong></div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold transition"
            >
              Go Back & Edit
            </button>

            <button
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold transition shadow-xs"
            >
              {isSubmitting ? "Submitting..." : "Yes, Submit Application"}
            </button>
          </div>
        </div>
      </Modal>
    </StudentLayout>
  );
}
