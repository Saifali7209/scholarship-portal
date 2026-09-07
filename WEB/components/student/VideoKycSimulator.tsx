"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Camera,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  UserCheck,
  FileText,
  Scan,
  Building
} from "lucide-react";

interface VideoKycSimulatorProps {
  onComplete?: () => void;
}

export const VideoKycSimulator: React.FC<VideoKycSimulatorProps> = ({ onComplete }) => {
  const { studentApplication, completeVideoKyc } = useApp();
  const [step, setStep] = useState<number>(1);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [livenessPrompt, setLivenessPrompt] = useState<string>("Look straight into the camera");
  const [simulatedProgress, setSimulatedProgress] = useState<number>(0);
  const [outcome, setOutcome] = useState<"SUCCESS" | "REVIEW" | "FAILED" | null>(null);

  // Step 2: Camera initiation
  const handleEnableCamera = () => {
    setCameraActive(true);
    setStep(2);
  };

  // Step 3: Start Liveness Check
  const handleStartLiveness = () => {
    setStep(3);
    setLivenessPrompt("Please blink twice slowly...");
    setTimeout(() => {
      setLivenessPrompt("Now tilt your head slightly to the right...");
      setTimeout(() => {
        setLivenessPrompt("Great! Hold still for biometric photo capture...");
        setTimeout(() => {
          setStep(4); // Move to show ID card
        }, 1800);
      }, 1800);
    }, 1800);
  };

  // Step 4: ID Card Capture
  const handleCaptureId = () => {
    setStep(5);
  };

  // Step 5: Start Processing
  const handleStartProcessing = (forcedOutcome?: "SUCCESS" | "REVIEW" | "FAILED") => {
    setStep(6);
    setSimulatedProgress(10);

    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const finalResult = forcedOutcome || "SUCCESS";
            setOutcome(finalResult);
            setStep(7);
            completeVideoKyc(finalResult === "SUCCESS");
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
      {/* Header */}
      <div className="bg-slate-50 text-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-navy-900 border border-navy-800 text-amber-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-navy-950">
              Biometric Video KYC & Liveness Verification
            </h3>
            <p className="text-[11px] text-slate-500 font-mono">
              Session: KYC-2026-{(Math.random() * 10000).toFixed(0)} • UIDAI & AICTE Cryptographic Protocol
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Encrypted Stream</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Step {step} of 7</span>
            <span className="font-semibold text-navy-950">
              {step === 1 && "Identity Confirmation"}
              {step === 2 && "Camera Permission & Alignment"}
              {step === 3 && "Face Liveness Detection"}
              {step === 4 && "Government Photo ID Check"}
              {step === 5 && "Document Inspection"}
              {step === 6 && "AI Biometric Comparison"}
              {step === 7 && "Verification Result"}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-navy-900 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Confirmation */}
        {step === 1 && (
          <div className="max-w-md mx-auto text-center py-6">
            <div className="w-16 h-16 rounded-full bg-navy-50 text-navy-900 border border-navy-200 flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-navy-950 mb-1">
              Confirm Applicant Identity
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              You are completing the final biometric stage for{" "}
              <strong className="text-slate-800">{studentApplication.scholarshipName}</strong>.
            </p>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-semibold text-slate-900">
                  {studentApplication.personalDetails.fullName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Application Reference:</span>
                <span className="font-mono font-semibold text-slate-900">
                  {studentApplication.applicationNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Aadhaar (Masked):</span>
                <span className="font-mono font-semibold text-slate-900">
                  {studentApplication.personalDetails.aadhaarMasked}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Provisional Merit Rank:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  #{studentApplication.rank || 18} (Shortlisted)
                </span>
              </div>
            </div>

            <button
              onClick={handleEnableCamera}
              className="w-full py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs transition cursor-pointer active:scale-98"
            >
              Continue to Camera Setup
            </button>
          </div>
        )}

        {/* Step 2 & 3: Camera & Liveness */}
        {(step === 2 || step === 3) && (
          <div className="max-w-lg mx-auto">
            {/* Camera Viewfinder Mock */}
            <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white border-2 border-slate-800 shadow-inner">
              {/* Overlay Face Oval Guide */}
              <div className="w-48 h-60 border-2 border-dashed border-sky-400/80 rounded-[50%] flex items-center justify-center relative">
                <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400 absolute top-0 left-6" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400 absolute top-0 right-6" />
                <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400 absolute bottom-0 left-6" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400 absolute bottom-0 right-6" />
                <span className="text-[11px] text-sky-200 bg-navy-950/80 px-2.5 py-1 rounded-full backdrop-blur border border-sky-400/30">
                  Position face in oval
                </span>
              </div>

              {/* Status Banner in Viewfinder */}
              <div className="absolute bottom-4 left-4 right-4 bg-navy-950/80 backdrop-blur border border-navy-800 rounded-lg px-4 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-white font-medium">
                    {step === 3 ? livenessPrompt : "Camera Active (Simulated)"}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">1080p • 30fps</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Ensure good frontal lighting and avoid dark glasses or caps.
              </div>
              {step === 2 ? (
                <button
                  onClick={handleStartLiveness}
                  className="px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold whitespace-nowrap shadow-xs transition cursor-pointer"
                >
                  Start Liveness Test
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs text-navy-900 font-semibold">
                  <Loader2 className="w-4 h-4 animate-spin text-navy-800" />
                  <span>Checking liveness...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Show ID card */}
        {step === 4 && (
          <div className="max-w-lg mx-auto">
            <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white border-2 border-slate-800">
              {/* ID Card Box Guide */}
              <div className="w-72 h-44 border-2 border-emerald-400 rounded-xl flex flex-col items-center justify-center p-3 relative bg-slate-900/60 backdrop-blur">
                <Scan className="w-8 h-8 text-emerald-400 mb-2 animate-pulse" />
                <span className="text-xs text-emerald-300 font-medium">
                  Align Original Physical ID Card
                </span>
                <span className="text-[10px] text-slate-300 mt-1 font-mono">
                  Aadhaar Card / Voter ID
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-navy-950/80 backdrop-blur rounded-lg px-4 py-2 flex items-center justify-between text-xs border border-navy-800">
                <span className="text-emerald-400 font-medium">Card Detected (98% Alignment)</span>
                <span className="text-[11px] text-slate-400 font-mono">UIDAI Security Microprint OK</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Hold card steady inside the rectangular guide without glare.
              </span>
              <button
                onClick={handleCaptureId}
                className="px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Capture ID Document
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Required documents check */}
        {step === 5 && (
          <div className="max-w-md mx-auto text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-navy-950 mb-1">
              Documents & Biometrics Captured
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Live portrait frames and document scans have been queued for automated cryptographic matching.
            </p>

            <div className="text-left bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">✓ Live Facial Frame</span>
                <span className="text-emerald-800 font-semibold">Captured (High Clarity)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">✓ Liveness Blink Verification</span>
                <span className="text-emerald-800 font-semibold">Passed (99.1%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">✓ Physical Aadhaar Card Scan</span>
                <span className="text-emerald-800 font-semibold">Matched (Masked)</span>
              </div>
            </div>

            {/* Prototype simulation controls */}
            <div className="mb-4 p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-left">
              <span className="text-[11px] font-bold text-amber-900 block mb-1.5">
                Evaluation Test Scenario:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStartProcessing("SUCCESS")}
                  className="flex-1 py-1.5 rounded text-[11px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition cursor-pointer"
                >
                  Simulate Success
                </button>
                <button
                  onClick={() => handleStartProcessing("REVIEW")}
                  className="flex-1 py-1.5 rounded text-[11px] font-bold bg-amber-700 hover:bg-amber-800 text-white transition cursor-pointer"
                >
                  Manual Review
                </button>
                <button
                  onClick={() => handleStartProcessing("FAILED")}
                  className="flex-1 py-1.5 rounded text-[11px] font-bold bg-rose-700 hover:bg-rose-800 text-white transition cursor-pointer"
                >
                  Simulate Fail
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Processing animation */}
        {step === 6 && (
          <div className="max-w-md mx-auto text-center py-10">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
              <div
                className="absolute inset-0 rounded-full border-4 border-navy-900 border-t-transparent animate-spin"
              />
            </div>
            <h4 className="text-sm font-bold text-navy-950 mb-1">
              Verifying Biometrics & Identity...
            </h4>
            <p className="text-xs text-slate-500 mb-6">
              Running facial recognition vector comparison against institutional databases.
            </p>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden max-w-xs mx-auto mb-2">
              <div
                className="h-full bg-navy-900 transition-all duration-300 rounded-full"
                style={{ width: `${simulatedProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-navy-950 tabular-nums">{simulatedProgress}%</span>
          </div>
        )}

        {/* Step 7: Final Result */}
        {step === 7 && (
          <div className="max-w-md mx-auto text-center py-6">
            {outcome === "SUCCESS" && (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-1">
                  Identity Verification Completed!
                </h4>
                <p className="text-xs text-slate-600 mb-6">
                  Your facial recognition match score is <strong className="text-navy-950">99.2%</strong>. Your scholarship award has been officially confirmed.
                </p>

                <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-emerald-900">Biometric Liveness:</span>
                    <span className="font-bold text-emerald-950 font-mono">Passed (Score: 99.4)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-900">Photo Matching:</span>
                    <span className="font-bold text-emerald-950 font-mono">Match Confirmed (Score: 99.2)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-900">Verification Determination:</span>
                    <span className="font-bold text-emerald-950">APPROVED</span>
                  </div>
                </div>

                <a
                  href="/student/status"
                  className="inline-block w-full py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition shadow-xs"
                >
                  View Application Status & Award Details
                </a>
              </>
            )}

            {outcome === "REVIEW" && (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-1">
                  Submitted for Manual Review
                </h4>
                <p className="text-xs text-slate-600 mb-6">
                  Your biometric session has been forwarded to a verification officer for secondary review. Expected resolution within 24–48 hours.
                </p>

                <a
                  href="/student/dashboard"
                  className="inline-block w-full py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition shadow-xs"
                >
                  Return to Student Dashboard
                </a>
              </>
            )}

            {outcome === "FAILED" && (
              <>
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-800 border border-rose-200 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-navy-950 mb-1">
                  Verification Could Not Be Completed
                </h4>
                <p className="text-xs text-slate-600 mb-6">
                  Camera illumination or angle did not satisfy regulatory clarity standards. Please try again in a well-lit area.
                </p>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
