"use client";

import React, { useState } from "react";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { useApp } from "../../../context/AppContext";
import { History, Search, ShieldCheck, Download } from "lucide-react";

export default function AdminAuditLogsPage() {
  const { auditLogs } = useApp();
  const [search, setSearch] = useState("");

  const filtered = auditLogs.filter((log) => {
    const q = search.toLowerCase();
    return (
      !q ||
      log.action.toLowerCase().includes(q) ||
      log.studentName.toLowerCase().includes(q) ||
      log.applicationNumber.toLowerCase().includes(q) ||
      log.adminName.toLowerCase().includes(q) ||
      log.reason.toLowerCase().includes(q)
    );
  });

  const handleExportLogsCsv = () => {
    const headers = [
      "Timestamp",
      "AdminOfficer",
      "Action",
      "ApplicationNumber",
      "StudentName",
      "PreviousStatus",
      "NewStatus",
      "Justification"
    ];
    const rows = filtered.map((l) => [
      l.timestamp,
      `"${l.adminName}"`,
      `"${l.action}"`,
      l.applicationNumber,
      `"${l.studentName}"`,
      l.previousStatus,
      l.newStatus,
      `"${l.reason}"`
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Audit_Logs_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                  Regulatory Compliance
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  Immutable Events: <strong className="text-navy-950 font-bold">{filtered.length} Recorded</strong>
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                Tamper-Evident Audit Trail
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Comprehensive immutable log recording all administrative status modifications and officer overrides.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportLogsCsv}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-navy-950 text-xs font-black shadow-2xs hover:shadow-xs transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-navy-700" />
                <span>Export Audit Trail (CSV)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400 ml-1 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search audit trail by officer name, application ref, candidate name, or regulatory grounds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs font-medium focus:outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
          />
        </div>

        {/* Audit Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <History className="w-4 h-4" />
              </div>
              <span>Event Ledger ({filtered.length} Events)</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              SHA-256 Ledger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold">
                <tr>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Timestamp (IST)</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Authorized Officer</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Action Performed</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Application Ref / Student</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">State Transition</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Regulatory Justification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5 font-mono text-slate-500 whitespace-nowrap text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-navy-900 text-amber-300 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                          {log.adminName
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <div className="font-bold text-navy-950">{log.adminName}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{log.adminEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-navy-900">
                      <span className="bg-navy-50 text-navy-900 px-2.5 py-0.5 rounded-full border border-navy-200/70 font-bold text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-mono font-bold text-slate-900">
                        {log.applicationNumber}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">{log.studentName}</div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono text-[11px]">
                      <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{log.previousStatus}</span>
                      <span className="mx-1.5 text-amber-600 font-black">➔</span>
                      <span className="font-bold text-navy-950 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{log.newStatus}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 max-w-xs leading-relaxed font-medium">
                      {log.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
