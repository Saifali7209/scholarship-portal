"use client";

import React from "react";
import Link from "next/link";
import { StudentLayout } from "../../../components/layout/StudentLayout";
import { useApp } from "../../../context/AppContext";
import { Bell, CheckCheck, Info, CheckCircle2, AlertTriangle, ArrowRight, Building } from "lucide-react";

export default function StudentNotificationsPage() {
  const { notifications, markNotificationAsRead } = useApp();

  const studentNotifs = notifications.filter((n) => n.targetRole === "student");

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-md bg-navy-50 text-navy-800 border border-navy-200/60 font-semibold text-[10px] tracking-wider uppercase">
                  Notification Center
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  Active Alerts: <strong className="text-navy-950 font-bold">{studentNotifs.length}</strong>
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
                Alerts & System Dispatches
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Important communication notices regarding your application stage, biometric deadlines, and committee determinations.
              </p>
            </div>

            <button
              onClick={() => {
                studentNotifs.forEach((n) => markNotificationAsRead(n.id));
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 hover:text-navy-950 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg border border-slate-200 transition cursor-pointer self-start sm:self-auto"
            >
              <CheckCheck className="w-3.5 h-3.5 text-navy-700" />
              <span>Mark All as Read</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {studentNotifs.length > 0 ? (
            studentNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead(n.id)}
                className={`p-4 rounded-xl border transition flex items-start justify-between gap-4 cursor-pointer ${
                  n.read
                    ? "bg-white border-slate-200/90 text-slate-700 shadow-2xs"
                    : "bg-navy-50/50 border-navy-200/80 shadow-xs"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2 rounded-lg flex-shrink-0 ${
                      n.type === "success"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : n.type === "warning"
                        ? "bg-amber-100 text-amber-900 border border-amber-200"
                        : "bg-navy-100 text-navy-900 border border-navy-200"
                    }`}
                  >
                    {n.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : n.type === "warning" ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : (
                      <Info className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-navy-950">{n.title}</h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-navy-900" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {n.message}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono mt-1.5 block">
                      {n.timestamp}
                    </span>
                  </div>
                </div>

                {n.link && (
                  <Link
                    href={n.link}
                    className="flex-shrink-0 self-center text-xs font-semibold text-navy-800 hover:text-navy-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-slate-200"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500">You're all caught up! No unread notifications.</p>
            </div>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
