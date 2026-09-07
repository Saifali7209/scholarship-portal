"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminLayout } from "../../../../components/layout/AdminLayout";
import { useApp } from "../../../../context/AppContext";
import { ApplicationStatusBadge, RiskBadge, VerificationStatusBadge, DocumentStatusBadge } from "../../../../components/ui/StatusBadge";
import { Modal } from "../../../../components/ui/Modal";
import { ApplicationStatus } from "../../../../types/scholarship";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  ListOrdered,
  FileText,
  User,
  GraduationCap,
  Sparkles,
  Clock,
  History,
  ShieldCheck,
  Building,
  Check,
  ChevronRight
} from "lucide-react";

export default function AdminApplicationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { allApplications, updateApplicationStatus } = useApp();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "personal"
    | "academic"
    | "documents"
    | "verification"
    | "scoring"
    | "timeline"
    | "audit"
  >("overview");

  // Decision Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    targetStatus: ApplicationStatus | null;
    title: string;
    description: string;
    isDangerous: boolean;
  }>({
    isOpen: false,
    targetStatus: null,
    title: "",
    description: "",
    isDangerous: false
  });

  const [decisionReason, setDecisionReason] = useState("");

  const application = allApplications.find((a) => a.id === resolvedParams.id) || allApplications[0];

  const handleOpenActionModal = (
    status: ApplicationStatus,
    title: string,
    description: string,
    isDangerous = false
  ) => {
    setModalConfig({
      isOpen: true,
      targetStatus: status,
      title,
      description,
      isDangerous
    });
    setDecisionReason("");
  };

  const handleConfirmDecision = () => {
    if (!modalConfig.targetStatus) return;
    updateApplicationStatus(
      application.id,
      modalConfig.targetStatus,
      decisionReason || `Officer decision updated status to ${modalConfig.targetStatus}`
    );
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "personal", label: "Personal" },
    { id: "academic", label: "Academic" },
    { id: "documents", label: "Documents" },
    { id: "verification", label: "AI Verification" },
    { id: "scoring", label: "Scoring & Rank" },
    { id: "timeline", label: "Timeline" },
    { id: "audit", label: "Audit Log" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/admin/applications"
            className="inline-flex items-center gap-1.5 hover:text-navy-950 font-semibold text-slate-600 transition group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition group-hover:-translate-x-0.5" />
            <span>Applications Queue</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-mono text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            {application.applicationNumber}
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-medium">Candidate Dossier</span>
        </div>

        {/* Header Dossier Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
          {/* Subtle top brand accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 via-amber-500 to-navy-800" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Initials Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm border border-navy-700/50 flex-shrink-0 tracking-wider">
                {application.personalDetails.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-navy-950 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {application.applicationNumber}
                  </span>
                  <ApplicationStatusBadge status={application.status} />
                  <RiskBadge level={application.riskLevel} />
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-0.5 rounded-full font-mono">
                    Score: <strong className="text-navy-950">{application.score}</strong>/100
                  </span>
                </div>

                <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                  {application.personalDetails.fullName}
                </h1>

                <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                  <span>Applying for: <strong className="text-navy-900 font-semibold">{application.scholarshipName}</strong></span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono">{application.personalDetails.email}</span>
                  <span className="text-slate-300">•</span>
                  <span>{application.academicDetails.institution}</span>
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
              <button
                onClick={() =>
                  handleOpenActionModal(
                    "Shortlisted",
                    "Shortlist Applicant for Final Round",
                    "Candidate will be placed on provisional merit shortlist and invited to complete Video KYC."
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200/80 hover:bg-purple-100 text-xs font-bold transition shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Shortlist</span>
              </button>

              <button
                onClick={() =>
                  handleOpenActionModal(
                    "Waitlisted",
                    "Move Candidate to Waitlist",
                    "Candidate will be placed on waitlist queue in order of merit score."
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 hover:bg-amber-100 text-xs font-bold transition shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Waitlist</span>
              </button>

              <button
                onClick={() =>
                  handleOpenActionModal(
                    "Correction Required",
                    "Request Document Correction",
                    "An alert will be sent to the student to re-upload deficient documents."
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 text-xs font-semibold transition cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Request Correction</span>
              </button>

              <button
                onClick={() =>
                  handleOpenActionModal(
                    "Approved",
                    "Grant Final Scholarship Approval",
                    "Approves the candidate for fellowship grant and queues for PFMS disbursement."
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-sm transition cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Approve Award</span>
              </button>

              <button
                onClick={() =>
                  handleOpenActionModal(
                    "Rejected",
                    "Reject Application",
                    "Application will be marked as rejected. This action will notify the student.",
                    true
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200/80 hover:bg-rose-100 text-xs font-semibold transition cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Reject</span>
              </button>
            </div>
          </div>

          {/* Dossier Tabs Header */}
          <div className="flex items-center gap-1.5 border-t border-slate-100 mt-6 pt-3.5 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === t.id
                    ? "bg-navy-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-navy-950 hover:bg-slate-100/80"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                      <Building className="w-4 h-4" />
                    </div>
                    <span>Application Core Summary</span>
                  </h3>
                  <span className="text-[11px] font-mono text-slate-500">
                    ID: {application.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-bold">
                      Enrolled Institution
                    </span>
                    <span className="font-bold text-slate-900 mt-1 block truncate">
                      {application.academicDetails.institution}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-bold">
                      Course & Year
                    </span>
                    <span className="font-bold text-slate-900 mt-1 block truncate">
                      {application.academicDetails.course} ({application.academicDetails.yearOfStudy})
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-bold">
                      Composite Merit Score
                    </span>
                    <span className="text-base font-black text-navy-950 font-mono mt-0.5 block tabular-nums">
                      {application.score} / 100
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-bold">
                      Family Annual Income
                    </span>
                    <span className="font-bold text-slate-900 font-mono mt-1 block">
                      {application.familyDetails.annualFamilyIncome}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-bold">
                      Verification Status
                    </span>
                    <span className="mt-1 block">
                      <VerificationStatusBadge status={application.verificationStatus} />
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] block font-bold">
                      Submission Date
                    </span>
                    <span className="font-bold text-slate-900 mt-1 block font-mono">
                      {application.submissionDate || "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statement of Need */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/70">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-950">Statement of Purpose & Financial Hardship</h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/90 p-4 rounded-xl border border-slate-200/80 italic font-medium">
                  "{application.scholarshipAnswers?.financialNeedStatement || "Declared full financial need for tuition coverage."}"
                </p>
              </div>
            </div>

            {/* Side Column: AI Findings */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200/80">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Automated AI Triage</span>
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Audit Grade
                  </span>
                </div>

                {application.aiFindings && application.aiFindings.length > 0 ? (
                  <div className="space-y-3">
                    {application.aiFindings.map((f, i) => (
                      <div
                        key={i}
                        className="p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-xl text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-950">{f.flag}</span>
                          <span className="text-[10px] font-mono text-amber-800 font-bold bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">
                            {f.confidence}% Conf.
                          </span>
                        </div>
                        <p className="text-amber-900 text-[11px] leading-relaxed">{f.recommendation}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">No data anomalies detected. Low risk score profile.</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                AI assistance is advisory. All final selection determinations rest exclusively with the IICC Scholarship Committee.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Personal Details */}
        {activeTab === "personal" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-sm font-black text-navy-950 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-navy-700" />
              <span>Personal Particulars</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Full Name</span>
                <span className="font-bold text-slate-900 mt-1 block">{application.personalDetails.fullName}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Date of Birth</span>
                <span className="font-bold text-slate-900 mt-1 block font-mono">{application.personalDetails.dob}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Gender</span>
                <span className="font-bold text-slate-900 mt-1 block">{application.personalDetails.gender}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Social Category</span>
                <span className="font-bold text-slate-900 mt-1 block">{application.personalDetails.category}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Email</span>
                <span className="font-bold text-slate-900 mt-1 block truncate font-mono">{application.personalDetails.email}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Mobile</span>
                <span className="font-bold text-slate-900 mt-1 block font-mono">{application.personalDetails.mobile}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Aadhaar (Masked)</span>
                <span className="font-mono font-bold text-slate-900 mt-1 block">
                  {application.personalDetails.aadhaarMasked}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Address & State</span>
                <span className="font-bold text-slate-900 mt-1 block truncate">
                  {application.personalDetails.address}, {application.personalDetails.state}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Academic Details */}
        {activeTab === "academic" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-sm font-black text-navy-950 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-navy-700" />
              <span>Academic Record</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Institution</span>
                <span className="font-bold text-slate-900 mt-1 block">{application.academicDetails.institution}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Course</span>
                <span className="font-bold text-slate-900 mt-1 block">{application.academicDetails.course}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Year of Study</span>
                <span className="font-bold text-slate-900 mt-1 block">{application.academicDetails.yearOfStudy}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Roll Number</span>
                <span className="font-mono font-bold text-slate-900 mt-1 block">
                  {application.academicDetails.rollNumber}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Previous Aggregate</span>
                <span className="font-black text-navy-950 font-mono mt-1 block tabular-nums text-base">
                  {application.academicDetails.previousMarks}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Documents */}
        {activeTab === "documents" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-navy-700" />
                <span>Attached Documents & OCR Verification</span>
              </h3>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {application.documents.length} Files Attached
              </span>
            </div>
            <div className="space-y-3">
              {application.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-center justify-between gap-4 text-xs hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-navy-900 flex items-center justify-center shadow-2xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-sm">{doc.name}</span>
                      <span className="text-slate-500 text-[11px] font-mono">
                        {doc.fileName || "Pending upload"} • {doc.fileSize || "0 MB"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DocumentStatusBadge status={doc.status} />
                    <Link
                      href="/admin/documents"
                      className="px-3 py-1.5 bg-white border border-slate-200/90 rounded-lg text-slate-700 font-bold hover:bg-slate-100 transition shadow-2xs text-xs"
                    >
                      Inspect OCR
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AI Verification */}
        {activeTab === "verification" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-navy-700" />
              <span>AI Verification Dossier</span>
            </h3>
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/90 text-xs space-y-3">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60">
                <span className="text-slate-600 font-medium">Aadhaar Masked Match:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  100% Match (UIDAI Certified)
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200/60">
                <span className="text-slate-600 font-medium">Marksheet OCR Consistency:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  96.4% Authenticated
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-600 font-medium">Duplicate Certificate Registry Check:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Clean (No Duplicates Found)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Scoring */}
        {activeTab === "scoring" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-navy-900 uppercase tracking-widest bg-navy-50 px-2.5 py-0.5 rounded-full border border-navy-200">
                  IICC Official 100-Mark Formula
                </span>
                <h3 className="text-base font-black text-navy-950 mt-1.5">
                  Merit Score Breakdown & Ranking Determination
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block font-medium">Composite Merit Score</span>
                <span className="text-2xl font-black text-navy-950 font-mono tabular-nums">
                  {application.score} / 100
                </span>
              </div>
            </div>

            {/* 4 Score Metrics with top accent bar (HRMS style) */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-blue-600">
                <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Academic Marks (Max 60)</span>
                <span className="text-2xl font-black text-navy-950 font-mono mt-1.5 block tabular-nums">
                  {application.scoringBreakdown?.academicMarks || 50} / 60
                </span>
                <span className="text-[11px] text-blue-700 font-medium block mt-1">
                  Score: {application.academicDetails.previousMarks}
                  {application.academicDetails.cgpa ? ` (${application.academicDetails.cgpa} CGPA)` : ""}
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-emerald-600">
                <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Family Income (Max 35)</span>
                <span className="text-2xl font-black text-navy-950 font-mono mt-1.5 block tabular-nums">
                  {application.scoringBreakdown?.incomeMarks || 30} / 35
                </span>
                <span className="text-[11px] text-emerald-700 font-medium block mt-1 truncate">
                  {application.familyDetails.incomeBracket || "Rs.2,50,001 - Rs.3,50,000"}
                </span>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-500">
                <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Special Category (Max 5)</span>
                <span className="text-2xl font-black text-navy-950 font-mono mt-1.5 block tabular-nums">
                  {application.scoringBreakdown?.specialCategoryMarks || 0} / 5
                </span>
                <span className="text-[11px] text-amber-800 font-medium block mt-1">
                  Capped at 5 marks max
                </span>
              </div>

              <div className="p-4 bg-navy-950 text-white rounded-2xl border border-navy-900 shadow-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-400">
                <span className="text-slate-300 font-bold block text-[11px] uppercase tracking-wider">Total Composite</span>
                <span className="text-2xl font-black text-amber-300 font-mono mt-1.5 block tabular-nums">
                  {application.score} / 100
                </span>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold block mt-1">
                  Ranked in Top Tier
                </span>
              </div>
            </div>

            {/* Explanatory Details Box */}
            <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 text-xs space-y-3">
              <span className="font-bold text-navy-950 block">Calculation Method & Regulatory Evidence:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-700">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="font-bold text-navy-900 block mb-1">Academic Conversion:</span>
                  <div>Mark Type: <strong>{application.academicDetails.markType || "Percentage"}</strong></div>
                  <div>Aggregate Score: <strong>{application.academicDetails.previousMarks}</strong></div>
                  {application.academicDetails.cgpa && (
                    <div className="text-navy-800 font-mono mt-0.5">
                      Formula: {application.academicDetails.cgpa} × 9.5 = {application.academicDetails.previousMarks}
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="font-bold text-navy-900 block mb-1">Special Categories Claimed:</span>
                  <div className="space-y-0.5">
                    <div>Orphan (+5): {application.specialCategories?.isOrphan ? "Yes (+5m)" : "No"}</div>
                    <div>Single Parent/Widow (+4): {application.specialCategories?.isSingleParentOrWidow ? "Yes (+4m)" : "No"}</div>
                    <div>Student with Disability (+3): {application.specialCategories?.isStudentWithDisability ? "Yes (+3m)" : "No"}</div>
                    <div>Girl Student (+2): {application.specialCategories?.isGirlStudent ? "Yes (+2m)" : "No"}</div>
                    <div>IICC Staff Child: {application.specialCategories?.isChildOfIiccEmployee ? "Yes (Reserved 25 Seats)" : "General (175 Seats)"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Timeline */}
        {activeTab === "timeline" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-sm font-black text-navy-950 mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-navy-700" />
              <span>Action History Timeline</span>
            </h3>
            <div className="space-y-4 text-xs pl-2">
              {application.timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-3 border-l-2 border-navy-800 pl-4 py-1 relative">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-white" />
                  <div>
                    <span className="font-bold text-navy-950 block">{t.title}</span>
                    <p className="text-slate-600 mt-0.5">{t.description}</p>
                    <span className="text-[10px] text-slate-400 font-mono block mt-1">{t.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: Audit */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <h3 className="text-sm font-black text-navy-950 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-navy-700" />
              <span>Official Audit Logs</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80">
                <span className="font-bold text-navy-950">Application Record Created</span>
                <div className="text-slate-500 text-[11px] mt-0.5 font-mono">Timestamp: {application.submissionDate || "02 Sep 2026"} • IP: 103.24.12.89</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decision Action Modal */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div
            className={`p-3.5 rounded-xl border ${
              modalConfig.isDangerous
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-navy-50 border-navy-200 text-navy-950"
            }`}
          >
            <p className="leading-relaxed">{modalConfig.description}</p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Official Justification / Audit Reason (Required)
            </label>
            <textarea
              rows={3}
              value={decisionReason}
              onChange={(e) => setDecisionReason(e.target.value)}
              placeholder="State regulatory or merit ground for this administrative decision..."
              className="w-full p-2.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition cursor-pointer font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirmDecision}
              className={`px-5 py-2 rounded-lg text-white font-bold transition shadow-xs cursor-pointer ${
                modalConfig.isDangerous
                  ? "bg-rose-700 hover:bg-rose-800"
                  : "bg-navy-900 hover:bg-navy-800"
              }`}
            >
              Confirm Decision
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
