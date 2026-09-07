import React from "react";
import {
  ApplicationStatus,
  DocumentStatus,
  RiskLevel,
  VerificationStatus
} from "../../types/scholarship";

export const ApplicationStatusBadge: React.FC<{ status: ApplicationStatus }> = ({
  status
}) => {
  const styles: Record<ApplicationStatus, string> = {
    Draft: "bg-slate-100 text-slate-700 border-slate-200/90",
    Submitted: "bg-blue-50 text-blue-700 border-blue-200/80",
    "Under Review": "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    "Correction Required": "bg-amber-50 text-amber-800 border-amber-200/80",
    Shortlisted: "bg-purple-50 text-purple-700 border-purple-200/80",
    Waitlisted: "bg-amber-50 text-amber-800 border-amber-200/80",
    "Final Verification": "bg-sky-50 text-sky-700 border-sky-200/80",
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200/80"
  };

  const dots: Record<ApplicationStatus, string> = {
    Draft: "bg-slate-400",
    Submitted: "bg-blue-500",
    "Under Review": "bg-indigo-500",
    "Correction Required": "bg-amber-500",
    Shortlisted: "bg-purple-500",
    Waitlisted: "bg-amber-500",
    "Final Verification": "bg-sky-500",
    Approved: "bg-emerald-500",
    Rejected: "bg-rose-500"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs whitespace-nowrap ${
        styles[status] || styles.Draft
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.Draft}`} />
      <span>{status}</span>
    </span>
  );
};

export const DocumentStatusBadge: React.FC<{ status: DocumentStatus }> = ({
  status
}) => {
  const styles: Record<DocumentStatus, string> = {
    "Not Uploaded": "bg-slate-100 text-slate-600 border-slate-200/90",
    Uploaded: "bg-blue-50 text-blue-700 border-blue-200/80",
    Processing: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    Verified: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    "Needs Correction": "bg-amber-50 text-amber-800 border-amber-200/80",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200/80"
  };

  const dots: Record<DocumentStatus, string> = {
    "Not Uploaded": "bg-slate-400",
    Uploaded: "bg-blue-500",
    Processing: "bg-indigo-500",
    Verified: "bg-emerald-500",
    "Needs Correction": "bg-amber-500",
    Rejected: "bg-rose-500"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs whitespace-nowrap ${
        styles[status] || styles["Not Uploaded"]
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-slate-400"}`} />
      <span>{status}</span>
    </span>
  );
};

export const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const styles: Record<RiskLevel, string> = {
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    Medium: "bg-amber-50 text-amber-800 border-amber-200/80",
    High: "bg-rose-50 text-rose-700 border-rose-200/80"
  };

  const dots: Record<RiskLevel, string> = {
    Low: "bg-emerald-500",
    Medium: "bg-amber-500",
    High: "bg-rose-500"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs whitespace-nowrap ${
        styles[level]
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[level] || "bg-slate-400"}`} />
      <span>{level} Risk</span>
    </span>
  );
};

export const VerificationStatusBadge: React.FC<{
  status: VerificationStatus;
}> = ({ status }) => {
  const styles: Record<VerificationStatus, string> = {
    Pending: "bg-slate-100 text-slate-700 border-slate-200/90",
    "In Progress": "bg-sky-50 text-sky-700 border-sky-200/80",
    Passed: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    Failed: "bg-rose-50 text-rose-700 border-rose-200/80",
    "Manual Review": "bg-amber-50 text-amber-800 border-amber-200/80"
  };

  const dots: Record<VerificationStatus, string> = {
    Pending: "bg-slate-400",
    "In Progress": "bg-sky-500",
    Passed: "bg-emerald-500",
    Failed: "bg-rose-500",
    "Manual Review": "bg-amber-500"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs whitespace-nowrap ${
        styles[status] || styles.Pending
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || "bg-slate-400"}`} />
      <span>{status}</span>
    </span>
  );
};
