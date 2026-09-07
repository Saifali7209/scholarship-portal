"use client";

import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { OcrComparisonItem } from "../../data/mock-documents";
import { RiskBadge } from "../ui/StatusBadge";
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  ShieldCheck,
  XCircle,
  Clock
} from "lucide-react";

interface DocumentCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: OcrComparisonItem | null;
  onAction?: (action: string, remarks?: string) => void;
}

export const DocumentCompareModal: React.FC<DocumentCompareModalProps> = ({
  isOpen,
  onClose,
  document: doc,
  onAction
}) => {
  const [remarks, setRemarks] = useState("");

  if (!doc) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`OCR Inspection: ${doc.documentType} - ${doc.studentName}`}
      maxWidth="2xl"
    >
      <div className="space-y-6 text-xs">
        {/* Top Header Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-50 text-navy-900 border border-navy-200/80 rounded-xl shadow-2xs flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-navy-950 block text-sm tracking-tight">
                {doc.documentFileName}
              </span>
              <span className="text-slate-500 text-[11px] font-mono">
                App #{doc.applicationNumber} • Size: {doc.fileSize} • Uploaded: {doc.submittedOn}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                AI Confidence
              </span>
              <span className="text-sm font-black text-navy-950 font-mono flex items-center gap-1 justify-end">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {doc.aiConfidence}%
              </span>
            </div>
            <RiskBadge level={doc.riskLevel} />
          </div>
        </div>

        {/* AI Assistance Observation */}
        <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start gap-3 shadow-2xs">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-black text-amber-950 block text-xs">AI Verification Finding</span>
            <p className="text-amber-900 mt-0.5 leading-relaxed text-[11px]">{doc.aiObservation}</p>
            <span className="text-[11px] text-amber-900 font-bold block mt-2 px-2.5 py-0.5 bg-white/90 rounded-full border border-amber-200 inline-block font-mono">
              Recommendation: {doc.recommendation}
            </span>
          </div>
        </div>

        {/* Side-by-side comparison table */}
        <div>
          <h4 className="font-bold text-slate-900 text-xs mb-2.5 uppercase tracking-wider">
            Field Cross-Verification (Declared vs. Extracted OCR)
          </h4>

          <div className="border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold">
                <tr>
                  <th className="px-3.5 py-2.5 text-left uppercase text-[10px] tracking-wider">Field</th>
                  <th className="px-3.5 py-2.5 text-left uppercase text-[10px] tracking-wider">
                    Application Declared
                  </th>
                  <th className="px-3.5 py-2.5 text-left uppercase text-[10px] tracking-wider">
                    OCR Extracted
                  </th>
                  <th className="px-3.5 py-2.5 text-center uppercase text-[10px] tracking-wider">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {doc.fields.map((field) => (
                  <tr key={field.fieldName} className="hover:bg-slate-50/70 transition">
                    <td className="px-3.5 py-2.5 font-bold text-slate-800">
                      {field.fieldName}
                    </td>
                    <td className="px-3.5 py-2.5 font-mono text-slate-600">
                      {field.applicationValue}
                    </td>
                    <td className="px-3.5 py-2.5 font-mono font-bold text-navy-950">
                      {field.ocrExtractedValue}
                    </td>
                    <td className="px-3.5 py-2.5 text-center">
                      {field.isMatch ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          MATCH
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          MISMATCH
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Remarks Input */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Verification Officer Remarks (Optional)
          </label>
          <textarea
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Add notes for audit trail or correction message to student..."
            className="w-full p-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
          />
        </div>

        {/* Decision Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-bold transition text-xs cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onAction) onAction("Needs Correction", remarks);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/90 hover:bg-amber-100 font-bold transition flex items-center gap-1.5 text-xs shadow-2xs cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Request Correction</span>
            </button>

            <button
              onClick={() => {
                if (onAction) onAction("Rejected", remarks);
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-900 border border-rose-200/90 hover:bg-rose-100 font-bold transition flex items-center gap-1.5 text-xs shadow-2xs cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Reject Document</span>
            </button>

            <button
              onClick={() => {
                if (onAction) onAction("Verified", remarks);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition flex items-center gap-1.5 text-xs cursor-pointer active:scale-95"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <span>Approve & Verify</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
