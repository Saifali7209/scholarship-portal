"use client";

import React, { useState } from "react";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { MOCK_OCR_DOCUMENTS, OcrComparisonItem } from "../../../data/mock-documents";
import { DocumentCompareModal } from "../../../components/admin/DocumentCompareModal";
import { RiskBadge } from "../../../components/ui/StatusBadge";
import { FileText, Sparkles, CheckCircle2, AlertTriangle, Eye, ShieldCheck, Building } from "lucide-react";

export default function AdminDocumentsQueuePage() {
  const [documents, setDocuments] = useState<OcrComparisonItem[]>(MOCK_OCR_DOCUMENTS);
  const [selectedDoc, setSelectedDoc] = useState<OcrComparisonItem | null>(null);
  const [filter, setFilter] = useState("All");

  const handleAction = (docId: string, newStatus: any) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: newStatus } : d))
    );
  };

  const filtered = documents.filter(
    (d) => filter === "All" || d.status === filter
  );

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
                  Document Authenticity
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  Active Submissions: <strong className="text-navy-950 font-bold">{filtered.length}</strong>
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                OCR & Credential Verification Queue
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Side-by-side comparison of applicant uploaded certificates against declared dossier values using OCR extraction.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="py-2 px-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 shadow-2xs cursor-pointer"
              >
                <option value="All">All Documents</option>
                <option value="Pending">Pending Review</option>
                <option value="Verified">Verified</option>
                <option value="Needs Correction">Needs Correction</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Student / App No.</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Document Type</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">OCR Status</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">AI Confidence</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Risk Rating</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Review Status</th>
                  <th className="px-5 py-3 text-right font-bold uppercase tracking-wider text-[11px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-navy-900 text-amber-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {doc.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-bold text-navy-950">{doc.studentName}</div>
                          <div className="font-mono text-[10px] text-slate-400">
                            {doc.applicationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-800">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-navy-700" />
                        <span className="font-bold text-slate-900">{doc.documentType}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        {doc.documentFileName}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {doc.overallMatch === "MATCH" ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          MATCH
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          {doc.overallMatch}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-bold font-mono text-navy-950">
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-mono font-bold text-navy-950">{doc.aiConfidence}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <RiskBadge level={doc.riskLevel} />
                    </td>
                    <td className="px-5 py-3.5 font-bold text-slate-700">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] border font-bold ${
                          doc.status === "Verified"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : doc.status === "Needs Correction"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            doc.status === "Verified"
                              ? "bg-emerald-500"
                              : doc.status === "Needs Correction"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-navy-950 hover:bg-slate-200 rounded-lg text-xs font-bold transition cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-navy-700" />
                        <span>Inspect OCR</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* OCR Comparison Modal */}
        <DocumentCompareModal
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          document={selectedDoc}
          onAction={(newStatus, remarks) => {
            if (selectedDoc) {
              handleAction(selectedDoc.id, newStatus);
            }
          }}
        />
      </div>
    </AdminLayout>
  );
}
