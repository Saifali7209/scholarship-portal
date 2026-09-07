"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { useApp } from "../../../context/AppContext";
import { Settings, Save, RotateCcw, ShieldAlert, CheckCircle2, Sliders } from "lucide-react";

export default function AdminSettingsPage() {
  const { resetDemoData } = useApp();
  const router = useRouter();

  const [settings, setSettings] = useState({
    academicYear: "2026-27",
    applicationDeadline: "2026-10-31",
    shortlistQuota: 200,
    waitlistQuota: 100,
    autoOcrConfidenceThreshold: 85,
    livenessScoreThreshold: 90,
    allowLateCorrectionUploads: true,
    emailAlertsEnabled: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset all prototype data back to initial seed state? This will clear any status updates or newly created applications.")) {
      resetDemoData();
      router.push("/admin/dashboard");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 via-amber-500 to-navy-800" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200/70 font-bold text-[11px] tracking-wider uppercase">
                  Configuration & Governance
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  Cycle 2026-27 Active
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                System & Governance Parameters
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Tune cycle deadlines, merit quotas, AI verification thresholds, and demo environment settings.
              </p>
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-2.5 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span className="font-bold">Settings saved successfully into local browser state!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Cycle Parameters */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-black text-navy-950 border-b border-slate-100 pb-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <Sliders className="w-3.5 h-3.5" />
              </div>
              <span>Application Cycle Parameters</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Cycle</label>
                <input
                  type="text"
                  value={settings.academicYear}
                  onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hard Application Deadline</label>
                <input
                  type="date"
                  value={settings.applicationDeadline}
                  onChange={(e) =>
                    setSettings({ ...settings, applicationDeadline: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Shortlist Award Quota (Top Candidates)
                </label>
                <input
                  type="number"
                  value={settings.shortlistQuota}
                  onChange={(e) =>
                    setSettings({ ...settings, shortlistQuota: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Contingency Waiting List Quota
                </label>
                <input
                  type="number"
                  value={settings.waitlistQuota}
                  onChange={(e) =>
                    setSettings({ ...settings, waitlistQuota: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* AI & KYC Thresholds */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-black text-navy-950 border-b border-slate-100 pb-3 flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <ShieldAlert className="w-3.5 h-3.5 text-navy-700" />
              </div>
              <span>Verification Engine Thresholds</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Automated OCR Confidence Threshold (%)
                </label>
                <input
                  type="number"
                  value={settings.autoOcrConfidenceThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoOcrConfidenceThreshold: Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Documents matching below this threshold trigger human officer manual review.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Video KYC Liveness Minimum Threshold (%)
                </label>
                <input
                  type="number"
                  value={settings.livenessScoreThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      livenessScoreThreshold: Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono font-bold focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Biometric confidence percentage required to clear automated KYC.
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-black shadow-xs hover:shadow transition cursor-pointer"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save System Parameters</span>
            </button>

            {/* Prototype Reset */}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
              <span>Reset Entire Prototype State</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
