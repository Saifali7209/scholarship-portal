"use client";

import React from "react";
import Link from "next/link";
import { StudentLayout } from "../../../components/layout/StudentLayout";
import { VideoKycSimulator } from "../../../components/student/VideoKycSimulator";
import { useApp } from "../../../context/AppContext";
import { ArrowLeft, ShieldCheck, Camera, Info } from "lucide-react";

export default function FinalVerificationPage() {
  const { studentApplication } = useApp();

  return (
    <StudentLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link
              href="/student/dashboard"
              className="flex items-center gap-1 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Stage 5: Biometric Verification
          </span>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start gap-3 text-xs">
          <Info className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
          <div className="text-slate-600 leading-relaxed">
            <strong>Candidate Verification Guidelines:</strong> Please ensure you are in a quiet, well-illuminated room. Have your physical <strong>Aadhaar Card</strong> or official Photo ID ready to hold up to the camera when prompted.
          </div>
        </div>

        {/* Video KYC Simulator Component */}
        <VideoKycSimulator />
      </div>
    </StudentLayout>
  );
}
