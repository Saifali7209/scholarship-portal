"use client";

import React, { useState } from "react";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { StatCard } from "../../../components/ui/StatCard";
import { RiskBadge } from "../../../components/ui/StatusBadge";
import {
  Sparkles,
  AlertTriangle,
  Copy,
  CheckCircle2,
  FileCheck,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Info
} from "lucide-react";

interface AiFlaggedCase {
  id: string;
  applicationNumber: string;
  studentName: string;
  documentType: string;
  flag: string;
  confidence: number;
  recommendation: string;
  riskLevel: "Low" | "Medium" | "High";
  status: "Pending Review" | "Accepted" | "Overridden";
}

const INITIAL_CASES: AiFlaggedCase[] = [
  {
    id: "ai-case-1",
    applicationNumber: "SCH-2026-000781",
    studentName: "Vikram Singh",
    documentType: "Income Certificate",
    flag: "Certificate issuance date indicates expired financial year (2022-23 vs 2025-26)",
    confidence: 89,
    recommendation: "Issue Correction Notice for updated revenue document",
    riskLevel: "High",
    status: "Pending Review"
  },
  {
    id: "ai-case-2",
    applicationNumber: "SCH-2026-000845",
    studentName: "Aditya Kumar",
    documentType: "12th Marksheet",
    flag: "Minor name spelling discrepancy ('Aditya Kumaar' vs 'Aditya Kumar')",
    confidence: 84,
    recommendation: "Manual administrative verification of father's name recommended",
    riskLevel: "Medium",
    status: "Pending Review"
  },
  {
    id: "ai-case-3",
    applicationNumber: "SCH-2026-000912",
    studentName: "Rituja Patil",
    documentType: "Bonafide Certificate",
    flag: "Potential duplicate university seal hash detected across 2 separate applications",
    confidence: 93,
    recommendation: "Escalate to anti-fraud cell for institutional cross-verification",
    riskLevel: "High",
    status: "Pending Review"
  },
  {
    id: "ai-case-4",
    applicationNumber: "SCH-2026-000624",
    studentName: "Manish Agarwal",
    documentType: "Aadhaar Card",
    flag: "Low scan resolution causing OCR character recognition below 80% threshold",
    confidence: 72,
    recommendation: "Request clear high-resolution scanned copy",
    riskLevel: "Medium",
    status: "Pending Review"
  }
];

export default function AdminAiVerificationPage() {
  const [cases, setCases] = useState<AiFlaggedCase[]>(INITIAL_CASES);

  const handleCaseAction = (
    caseId: string,
    action: "Accepted" | "Overridden"
  ) => {
    setCases((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status: action } : c))
    );
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
                <span className="px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200/70 font-bold text-[11px] tracking-wider uppercase">
                  Cognitive Assistance Layer
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Advisory Only
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                AI Verification & Anomaly Triage
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Automated document validation, seal hashing, and risk flagging to support human officers.
              </p>
            </div>
          </div>
        </div>

        {/* Advisory Disclaimer Alert */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-start gap-3 text-xs relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-blue-600">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-slate-700 leading-relaxed">
            <strong className="text-navy-950">Mandatory Regulatory Protocol:</strong> AI predictions serve strictly as an assistive triage filter. All administrative determinations—including shortlisting, document rejection, or candidate disqualification—must be independently signed off by authorized institutional verification officers.
          </div>
        </div>

        {/* AI KPI Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard title="Documents Processed" value="18,420" highlightColor="blue" />
          <StatCard title="Documents Flagged" value="342" highlightColor="indigo" />
          <StatCard title="Potential Mismatches" value="118" highlightColor="amber" />
          <StatCard title="Duplicate Hashes" value="14" highlightColor="rose" />
          <StatCard title="High Risk Cases" value="52" highlightColor="rose" />
        </div>

        {/* Flagged Cases Queue */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>Flagged Inspection Dossiers ({cases.length} Items)</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Rank: Highest AI Confidence
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {cases.map((item) => (
              <div
                key={item.id}
                className="p-5 hover:bg-slate-50/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-navy-900 text-amber-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {item.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy-950 text-sm">{item.studentName}</span>
                        <span className="font-mono text-slate-400 text-[11px]">
                          {item.applicationNumber}
                        </span>
                        <RiskBadge level={item.riskLevel} />
                      </div>
                      <span className="text-slate-500 text-[11px]">Document: <strong className="text-slate-800">{item.documentType}</strong></span>
                    </div>
                  </div>

                  <div className="text-slate-700 bg-slate-50/90 p-3 rounded-xl border border-slate-200/90 font-medium">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">AI Anomaly Trigger</span>
                    <span className="text-navy-950 font-bold">{item.flag}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-slate-500 text-[11px]">
                    <span className="inline-flex items-center gap-1 font-mono text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {item.confidence}% Confidence
                    </span>
                    <span className="text-slate-600">Officer Action Recommendation: <strong>{item.recommendation}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-start md:self-center whitespace-nowrap">
                  {item.status === "Pending Review" ? (
                    <>
                      <button
                        onClick={() => handleCaseAction(item.id, "Accepted")}
                        className="px-3.5 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold shadow-xs transition cursor-pointer text-xs"
                      >
                        Accept Finding
                      </button>
                      <button
                        onClick={() => handleCaseAction(item.id, "Overridden")}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 transition cursor-pointer text-xs"
                      >
                        Override Flag
                      </button>
                    </>
                  ) : (
                    <span
                      className={`font-bold px-3 py-1 rounded-full text-xs border flex items-center gap-1.5 ${
                        item.status === "Accepted"
                          ? "bg-navy-50 text-navy-900 border-navy-200"
                          : "bg-slate-50 text-slate-700 border-slate-200"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Action: {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
