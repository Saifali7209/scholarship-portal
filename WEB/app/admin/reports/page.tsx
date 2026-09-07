"use client";

import React, { useState } from "react";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { StatCard } from "../../../components/ui/StatCard";
import { Download, FileSpreadsheet, BarChart3, Filter, Calendar, Building } from "lucide-react";

export default function AdminReportsPage() {
  const [selectedReport, setSelectedReport] = useState("all_applications");
  const [selectedScheme, setSelectedScheme] = useState("all");

  const handleExportReportCsv = (reportName: string) => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];

    if (reportName === "geographic") {
      headers = ["State", "TotalApplicants", "Shortlisted", "ApprovedAwards", "TotalDisbursementINR"];
      rows = [
        ["Uttar Pradesh", 2410, 84, 52, "₹62,40,000"],
        ["Maharashtra", 1890, 62, 38, "₹45,60,000"],
        ["Karnataka", 1420, 51, 32, "₹38,40,000"],
        ["Tamil Nadu", 1310, 48, 29, "₹34,80,000"],
        ["Delhi NCR", 1120, 42, 26, "₹31,20,000"],
        ["Gujarat", 890, 31, 18, "₹21,60,000"],
        ["West Bengal", 740, 24, 14, "₹16,80,000"],
        ["Rajasthan", 680, 21, 12, "₹14,40,000"]
      ];
    } else if (reportName === "institutions") {
      headers = ["InstitutionName", "Type", "Applications", "Verified", "SelectedAwards"];
      rows = [
        ["IIT Delhi", "IIT/NIT", 420, 412, 18],
        ["IIT Bombay", "IIT/NIT", 390, 384, 16],
        ["NIT Surathkal", "IIT/NIT", 310, 302, 14],
        ["Delhi Technological University", "State University", 480, 460, 15],
        ["Anna University", "State University", 520, 498, 14],
        ["Jadavpur University", "State University", 290, 281, 9],
        ["BITS Pilani", "Private College", 340, 335, 12]
      ];
    } else {
      headers = ["MetricCategory", "Count", "PercentageOfTotal", "CycleComparison"];
      rows = [
        ["Total Applications Received", 10248, "100%", "+14.2% YoY"],
        ["Successfully Submitted", 9842, "96.0%", "+12.8% YoY"],
        ["Document Verification Cleared", 6210, "60.6%", "+18.1% YoY"],
        ["Merit Shortlisted Tier", 325, "3.1%", "Fixed Quota"],
        ["Final Video KYC Completed", 287, "2.8%", "98.2% Pass Rate"],
        ["Final Approved Awardees", 198, "1.9%", "Disbursement Ready"],
        ["Active Waitlisted Pool", 100, "0.9%", "Standby Contingency"]
      ];
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Report_${reportName}_${Date.now()}.csv`);
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
                  Auditing & Reporting
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  Academic Cycle 2026-27
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                Institutional Reports & Analytics
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Export downloadable CSV datasets for government auditing, committee presentations, and statutory returns.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExportReportCsv(selectedReport)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-black shadow-xs hover:shadow transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Report (CSV)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Report Selector Cards (HRMS Top Accent Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedReport("all_applications")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden shadow-xs ${
              selectedReport === "all_applications"
                ? "bg-white border-navy-900 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-500"
                : "bg-white border-slate-200/90 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-navy-950">Application Funnel & Pipeline</span>
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              End-to-end breakdown from intake to disbursement clearance.
            </p>
          </button>

          <button
            onClick={() => setSelectedReport("geographic")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden shadow-xs ${
              selectedReport === "geographic"
                ? "bg-white border-navy-900 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-500"
                : "bg-white border-slate-200/90 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-navy-950">Geographic State Distribution</span>
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Regional intake volume, state allocations, and grant disbursements.
            </p>
          </button>

          <button
            onClick={() => setSelectedReport("institutions")}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden shadow-xs ${
              selectedReport === "institutions"
                ? "bg-white border-navy-900 before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] before:bg-amber-500"
                : "bg-white border-slate-200/90 hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-navy-950">College & University Analysis</span>
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Central universities, IITs, NITs, and affiliated college metrics.
            </p>
          </button>
        </div>

        {/* Report Preview Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h3 className="text-sm font-black text-navy-950 capitalize flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span>Live Dataset Preview: {selectedReport.replace("_", " ")}</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              RFC 4180 CSV Compliant
            </span>
          </div>

          {selectedReport === "geographic" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50/80 font-bold text-slate-500">
                  <tr>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">State / Territory</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Total Applicants</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Shortlisted</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Approved Awards</th>
                    <th className="py-3 px-4 text-right uppercase tracking-wider text-[11px]">Disbursed Grant</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { s: "Uttar Pradesh", tot: 2410, sl: 84, ap: 52, amt: "₹62,40,000" },
                    { s: "Maharashtra", tot: 1890, sl: 62, ap: 38, amt: "₹45,60,000" },
                    { s: "Karnataka", tot: 1420, sl: 51, ap: 32, amt: "₹38,40,000" },
                    { s: "Tamil Nadu", tot: 1310, sl: 48, ap: 29, amt: "₹34,80,000" },
                    { s: "Delhi NCR", tot: 1120, sl: 42, ap: 26, amt: "₹31,20,000" },
                    { s: "Gujarat", tot: 890, sl: 31, ap: 18, amt: "₹21,60,000" }
                  ].map((r) => (
                    <tr key={r.s} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{r.s}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{r.tot}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{r.sl}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{r.ap}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-bold text-right">
                        {r.amt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedReport === "institutions" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50/80 font-bold text-slate-500">
                  <tr>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Institution Name</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Category</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Total Applicants</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Verified</th>
                    <th className="py-3 px-4 text-right uppercase tracking-wider text-[11px]">Selected Awards</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { n: "IIT Delhi", t: "IIT/NIT", tot: 420, v: 412, a: 18 },
                    { n: "IIT Bombay", t: "IIT/NIT", tot: 390, v: 384, a: 16 },
                    { n: "NIT Surathkal", t: "IIT/NIT", tot: 310, v: 302, a: 14 },
                    { n: "Delhi Tech University", t: "State University", tot: 480, v: 460, a: 15 },
                    { n: "Anna University", t: "State University", tot: 520, v: 498, a: 14 }
                  ].map((r) => (
                    <tr key={r.n} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{r.n}</td>
                      <td className="py-3 px-4 text-slate-600 font-medium">{r.t}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{r.tot}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{r.v}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-bold text-right">
                        {r.a}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedReport === "all_applications" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-xs">
                <thead className="bg-slate-50/80 font-bold text-slate-500">
                  <tr>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Lifecycle Stage</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Applicant Count</th>
                    <th className="py-3 px-4 text-left uppercase tracking-wider text-[11px]">Conversion %</th>
                    <th className="py-3 px-4 text-right uppercase tracking-wider text-[11px]">YoY Benchmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { s: "Total Applications Received", c: "10,248", pct: "100%", b: "+14.2%" },
                    { s: "Submitted Applications", c: "9,842", pct: "96.0%", b: "+12.8%" },
                    { s: "Document Verification Cleared", c: "6,210", pct: "60.6%", b: "+18.1%" },
                    { s: "Merit Shortlist", c: "325", pct: "3.1%", b: "Fixed Quota" },
                    { s: "Final Video KYC Completed", c: "287", pct: "2.8%", b: "98.2% Pass" },
                    { s: "Final Approved & Disbursed", c: "198", pct: "1.9%", b: "100% Filled" }
                  ].map((r) => (
                    <tr key={r.s} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-bold text-slate-900">{r.s}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{r.c}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{r.pct}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-bold text-right">
                        {r.b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
