"use client";

import React, { useState } from "react";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { StatCard } from "../../../components/ui/StatCard";
import { RiskBadge } from "../../../components/ui/StatusBadge";
import { Modal } from "../../../components/ui/Modal";
import { MOCK_FINAL_VERIFICATIONS, FinalVerificationQueueItem } from "../../../data/mock-verifications";
import {
  Video,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Camera,
  Scan,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function AdminFinalVerificationQueuePage() {
  const [items, setItems] = useState<FinalVerificationQueueItem[]>(MOCK_FINAL_VERIFICATIONS);
  const [selectedKyc, setSelectedKyc] = useState<FinalVerificationQueueItem | null>(null);

  const handleDecision = (
    itemId: string,
    newStatus: "Completed" | "Failed" | "In Review"
  ) => {
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, kycStatus: newStatus } : it))
    );
    setSelectedKyc(null);
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
                  Biometric Assurance
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  Verified Intake: <strong className="text-navy-950 font-bold">248 Passed</strong>
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                Final Verification & Video KYC Queue
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Review live webcam frames, liveness blink checks, and photo comparison confidence before final scholarship disbursement.
              </p>
            </div>
          </div>
        </div>

        {/* Top 5 StatCards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard title="Total Final Candidates" value="287" highlightColor="blue" />
          <StatCard title="Pending KYC" value="14" highlightColor="indigo" />
          <StatCard title="Verified Passed" value="248" highlightColor="emerald" />
          <StatCard title="Manual Review" value="19" highlightColor="amber" />
          <StatCard title="Failed / Disqualified" value="6" highlightColor="rose" />
        </div>

        {/* Verification Sessions Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <Video className="w-4 h-4" />
              </div>
              <span>Biometric KYC Sessions ({items.length} Records)</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Live Auditing Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Student / App Ref</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Merit Rank</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">KYC Session Status</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Liveness Score</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Face Match</th>
                  <th className="px-5 py-3 text-left font-bold uppercase tracking-wider text-[11px]">Risk Rating</th>
                  <th className="px-5 py-3 text-right font-bold uppercase tracking-wider text-[11px]">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {items.map((it) => (
                  <tr key={it.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-navy-900 text-amber-300 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {it.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-bold text-navy-950">{it.studentName}</div>
                          <div className="font-mono text-[10px] text-slate-400">
                            {it.applicationNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono font-bold text-slate-800">
                      <span className="font-mono font-black text-navy-950 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        #{it.rank}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] border inline-flex items-center gap-1.5 ${
                          it.kycStatus === "Completed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : it.kycStatus === "Failed"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : it.kycStatus === "In Review"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            it.kycStatus === "Completed"
                              ? "bg-emerald-500"
                              : it.kycStatus === "Failed"
                              ? "bg-rose-500"
                              : it.kycStatus === "In Review"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {it.kycStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono">
                      {it.livenessScore > 0 ? (
                        <span className="text-emerald-700 font-bold font-mono">{it.livenessScore}%</span>
                      ) : (
                        <span className="text-slate-400 font-mono">Pending</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 font-mono">
                      {it.faceMatchScore > 0 ? (
                        <span className="text-emerald-700 font-bold font-mono">{it.faceMatchScore}%</span>
                      ) : (
                        <span className="text-slate-400 font-mono">Pending</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <RiskBadge level={it.riskLevel} />
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedKyc(it)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-navy-950 hover:bg-slate-200 rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-navy-700" />
                        <span>Inspect Session</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Video KYC Inspection Modal */}
        <Modal
          isOpen={!!selectedKyc}
          onClose={() => setSelectedKyc(null)}
          title={`Video KYC Dossier: ${selectedKyc?.studentName} (${selectedKyc?.applicationNumber})`}
          maxWidth="xl"
        >
          {selectedKyc && (
            <div className="space-y-6 text-xs">
              {/* Camera & ID Comparison Frames */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-navy-950 rounded-2xl p-4 text-white text-center aspect-video flex flex-col items-center justify-center border border-navy-800 shadow-inner">
                  <Camera className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="text-[11px] font-bold text-slate-200">
                    Live Webcam Capture
                  </span>
                  <span className="text-[10px] text-emerald-400 mt-1 font-mono font-bold">
                    Liveness: {selectedKyc.livenessScore || "98.5"}% Passed
                  </span>
                </div>

                <div className="bg-navy-950 rounded-2xl p-4 text-white text-center aspect-video flex flex-col items-center justify-center border border-navy-800 shadow-inner">
                  <Scan className="w-8 h-8 text-emerald-400 mb-2" />
                  <span className="text-[11px] font-bold text-slate-200">
                    Aadhaar Photo Scan
                  </span>
                  <span className="text-[10px] text-emerald-400 mt-1 font-mono font-bold">
                    Face Match: {selectedKyc.faceMatchScore || "98.8"}%
                  </span>
                </div>
              </div>

              {/* Session Meta */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">Merit Rank:</span>
                  <span className="font-bold text-navy-950 font-mono text-sm">#{selectedKyc.rank}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Biometric Authenticity:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Verified High Fidelity
                  </span>
                </div>
                {selectedKyc.notes && (
                  <div className="pt-2.5 border-t border-slate-200/60">
                    <span className="text-slate-500 block mb-1 font-medium">Session Notes:</span>
                    <p className="text-slate-700 font-medium bg-white p-2.5 rounded-xl border border-slate-200">{selectedKyc.notes}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedKyc(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 font-bold transition text-xs cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => handleDecision(selectedKyc.id, "In Review")}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/90 hover:bg-amber-100 font-bold transition text-xs cursor-pointer shadow-2xs"
                >
                  Flag Manual Review
                </button>

                <button
                  onClick={() => handleDecision(selectedKyc.id, "Failed")}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-800 border border-rose-200/90 hover:bg-rose-100 font-bold transition text-xs cursor-pointer shadow-2xs"
                >
                  Disqualify
                </button>

                <button
                  onClick={() => handleDecision(selectedKyc.id, "Completed")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs cursor-pointer active:scale-95 text-xs"
                >
                  Approve Verification
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}
