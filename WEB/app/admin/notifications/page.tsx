"use client";

import React, { useState } from "react";
import { AdminLayout } from "../../../components/layout/AdminLayout";
import { Bell, Mail, Smartphone, Eye, Check, X, Send, Building } from "lucide-react";
import { Modal } from "../../../components/ui/Modal";

interface NotificationTemplate {
  id: string;
  triggerEvent: string;
  channel: "Email + SMS" | "Email Only" | "In-App Only";
  subject: string;
  bodyTemplate: string;
  sentCount: number;
  enabled: boolean;
}

const TEMPLATES: NotificationTemplate[] = [
  {
    id: "tmpl-1",
    triggerEvent: "Application Submitted",
    channel: "Email + SMS",
    subject: "Application Submitted Successfully - [AppNumber]",
    bodyTemplate:
      "Dear [StudentName], your scholarship application [AppNumber] for [ScholarshipName] has been successfully submitted and queued for verification.",
    sentCount: 9842,
    enabled: true
  },
  {
    id: "tmpl-2",
    triggerEvent: "Correction Required",
    channel: "Email + SMS",
    subject: "Urgent: Document Correction Required for [AppNumber]",
    bodyTemplate:
      "Dear [StudentName], a discrepancy was identified in your uploaded [DocumentType]. Please login to the portal and re-upload an authentic valid certificate before the deadline.",
    sentCount: 312,
    enabled: true
  },
  {
    id: "tmpl-3",
    triggerEvent: "Shortlisted for Award",
    channel: "Email + SMS",
    subject: "Congratulations! You have been Shortlisted for [ScholarshipName]",
    bodyTemplate:
      "Dear [StudentName], you have secured Merit Rank #[Rank]. Please login to complete your mandatory browser-based Video KYC verification within 7 days.",
    sentCount: 325,
    enabled: true
  },
  {
    id: "tmpl-4",
    triggerEvent: "Final Verification Required",
    channel: "Email + SMS",
    subject: "Action Required: Complete Your Biometric Video KYC",
    bodyTemplate:
      "Dear [StudentName], your final biometric verification session is now unlocked. Ensure you have your original physical Aadhaar Card ready.",
    sentCount: 287,
    enabled: true
  },
  {
    id: "tmpl-5",
    triggerEvent: "Verification Completed",
    channel: "Email Only",
    subject: "Biometric Identity Verification Completed",
    bodyTemplate:
      "Dear [StudentName], your Video KYC session has been processed with 99.2% match accuracy. Your dossier is now awaiting final award sign-off.",
    sentCount: 248,
    enabled: true
  },
  {
    id: "tmpl-6",
    triggerEvent: "Waitlist Activated",
    channel: "Email + SMS",
    subject: "Important Update: Promoted from Waiting List to Final Verification",
    bodyTemplate:
      "Dear [StudentName], congratulations! A seat has become available and you have been promoted from the waiting list to final Video KYC verification.",
    sentCount: 18,
    enabled: true
  },
  {
    id: "tmpl-7",
    triggerEvent: "Scholarship Approved",
    channel: "Email + SMS",
    subject: "Scholarship Award Conferred - PFMS Disbursement Queued",
    bodyTemplate:
      "Dear [StudentName], we are pleased to inform you that your fellowship award of [Amount] has been officially sanctioned. Direct transfer to your bank account is underway.",
    sentCount: 198,
    enabled: true
  },
  {
    id: "tmpl-8",
    triggerEvent: "Application Rejected",
    channel: "Email Only",
    subject: "Status Update regarding your Scholarship Application [AppNumber]",
    bodyTemplate:
      "Dear [StudentName], after careful evaluation, your application could not be selected during this cycle due to [Reason]. We wish you the best in your academic endeavors.",
    sentCount: 1224,
    enabled: true
  }
];

export default function AdminNotificationsPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(TEMPLATES);
  const [previewTmpl, setPreviewTmpl] = useState<NotificationTemplate | null>(null);

  const toggleTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
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
                  Automated Dispatches
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  Templates: <strong className="text-navy-950 font-bold">{templates.length} Active</strong>
                </span>
              </div>
              <h1 className="text-2xl font-black text-navy-950 tracking-tight">
                Automated Notification Templates
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Manage triggered email and SMS notifications dispatched at critical application lifecycle milestones.
              </p>
            </div>
          </div>
        </div>

        {/* Templates Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-navy-950 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center border border-navy-100">
                <Bell className="w-4 h-4" />
              </div>
              <span>Configured Dispatch Triggers ({templates.length} Templates)</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              System Dispatch Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-bold">
                <tr>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Trigger Lifecycle Event</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Channels</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Subject Header</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Total Dispatched</th>
                  <th className="px-5 py-3 text-left uppercase tracking-wider text-[11px]">Status</th>
                  <th className="px-5 py-3 text-right uppercase tracking-wider text-[11px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {templates.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition">
                    <td className="px-5 py-3.5 font-bold text-navy-950">
                      {t.triggerEvent}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200/70 font-bold text-[11px]">
                        <Mail className="w-3 h-3 text-navy-700" />
                        {t.channel}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700 truncate max-w-xs font-mono text-[11px]">
                      {t.subject}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-black text-navy-950 tabular-nums">
                      {t.sentCount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => toggleTemplate(t.id)}
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition cursor-pointer inline-flex items-center gap-1.5 ${
                          t.enabled
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-slate-100 text-slate-500 border-slate-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            t.enabled ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        {t.enabled ? "Active" : "Disabled"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => setPreviewTmpl(t)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-navy-950 rounded-lg text-xs font-bold transition cursor-pointer shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-navy-700" />
                        <span>Preview</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Template Preview Modal */}
        <Modal
          isOpen={!!previewTmpl}
          onClose={() => setPreviewTmpl(null)}
          title={`Notification Template: ${previewTmpl?.triggerEvent}`}
          maxWidth="md"
        >
          {previewTmpl && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-2.5">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Delivery Channel
                  </span>
                  <span className="font-bold text-navy-950 mt-0.5 block">{previewTmpl.channel}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                    Email Subject
                  </span>
                  <span className="font-bold text-navy-950 font-mono mt-0.5 block">
                    {previewTmpl.subject}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1 text-[10px] uppercase tracking-wider">
                  Message Body Template
                </label>
                <div className="p-4 bg-white border border-slate-200/90 rounded-2xl text-slate-800 leading-relaxed font-mono text-[11px] whitespace-pre-wrap shadow-inner">
                  {previewTmpl.bodyTemplate}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setPreviewTmpl(null)}
                  className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-bold transition cursor-pointer text-xs"
                >
                  Close Preview
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}
