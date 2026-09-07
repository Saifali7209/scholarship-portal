"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { PublicFooter } from "../../components/layout/PublicFooter";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  BookOpen,
  Award,
  Scale
} from "lucide-react";

export default function EligibilityCheckPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    isIndianCitizen: "yes",
    isRegularStudent: "yes",
    marksBracket: "80_above",
    courseCategory: "ug_professional",
    isIiccChild: "no",
    annualIncome: "under_3.5L"
  });

  const [determined, setDetermined] = useState(false);
  const [isEligible, setIsEligible] = useState(true);

  const handleCalculate = () => {
    // Official IICC 3 Baseline Conditions:
    // 1. Must be Indian citizen
    // 2. Must be regular student (not distance/correspondence)
    // 3. Minimum 60% aggregate marks in previous qualifying exam
    const eligible =
      answers.isIndianCitizen === "yes" &&
      answers.isRegularStudent === "yes" &&
      answers.marksBracket !== "below_60";

    setIsEligible(eligible);
    setDetermined(true);
  };

  const handleReset = () => {
    setStep(1);
    setDetermined(false);
    setAnswers({
      isIndianCitizen: "yes",
      isRegularStudent: "yes",
      marksBracket: "80_above",
      courseCategory: "ug_professional",
      isIiccChild: "no",
      annualIncome: "under_3.5L"
    });
  };

  const categoryNames: Record<string, { title: string; awards: string }> = {
    school: { title: "School Level (Class IX–X)", awards: "20 Awards" },
    senior_secondary: { title: "Senior Secondary (Class XI–XII)", awards: "50 Awards" },
    diploma: { title: "Diploma Course (Post Class 10/12/Grad)", awards: "15 Awards" },
    ug_professional: { title: "Undergraduate Professional Degree (B.Tech, MBBS, BCA, etc.)", awards: "50 Awards" },
    pg_professional: { title: "Postgraduate Professional Degree (M.Tech, MBA, MCA, etc.)", awards: "40 Awards" }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-navy-800 uppercase tracking-widest bg-navy-50 px-3 py-1 rounded-full border border-navy-200">
            Official 2026-27 Guidelines
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Check Scholarship Eligibility
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            Verify if you fulfill the mandatory 3 conditions and see your applicable IICC award category out of 200 total scholarships.
          </p>
        </div>

        {!determined ? (
          <div className="gov-card p-6 sm:p-8 shadow-xs">
            {/* Step Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
                <span className="font-semibold text-slate-700">Verification Step {step} of 6</span>
                <span className="font-mono tabular-nums">{Math.round((step / 6) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-navy-900 transition-all duration-300"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>
            </div>

            {/* Questions Container */}
            <div className="space-y-6">
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Condition 1
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Are you a citizen of India residing in India?
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    The IICC scholarship scheme is strictly open to Indian national students only.
                  </p>
                  <div className="space-y-2">
                    {["yes", "no"].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                          answers.isIndianCitizen === opt
                            ? "bg-navy-50/70 border-navy-700 text-navy-900 font-bold shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs">{opt === "yes" ? "Yes, Indian National" : "No, Overseas / Foreign National"}</span>
                        <input
                          type="radio"
                          name="isIndianCitizen"
                          value={opt}
                          checked={answers.isIndianCitizen === opt}
                          onChange={(e) => setAnswers({ ...answers, isIndianCitizen: e.target.value })}
                          className="text-navy-900 focus:ring-navy-700 w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Condition 2
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Are you pursuing a regular, full-time recognized course?
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Distance learning, correspondence, private coaching, or part-time programs are strictly ineligible.
                  </p>
                  <div className="space-y-2">
                    {["yes", "no"].map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                          answers.isRegularStudent === opt
                            ? "bg-navy-50/70 border-navy-700 text-navy-900 font-bold shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs">{opt === "yes" ? "Yes, Regular Full-Time On-Campus Student" : "No, Distance / Part-Time / Private"}</span>
                        <input
                          type="radio"
                          name="isRegularStudent"
                          value={opt}
                          checked={answers.isRegularStudent === opt}
                          onChange={(e) => setAnswers({ ...answers, isRegularStudent: e.target.value })}
                          className="text-navy-900 focus:ring-navy-700 w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Condition 3
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Did you score at least 60% in your previous qualifying examination?
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">
                    Official rule: Minimum 60% marks in the last qualifying examination. CGPA converted via Percentage = CGPA × 9.5.
                  </p>
                  <div className="space-y-2">
                    {[
                      { val: "90_above", label: "90% & Above / CGPA >= 9.5 (55–60 Academic Marks)" },
                      { val: "80_89", label: "80% to 89.99% / CGPA 8.4–9.4 (45–50 Academic Marks)" },
                      { val: "70_79", label: "70% to 79.99% / CGPA 7.4–8.3 (35–40 Academic Marks)" },
                      { val: "60_69", label: "60% to 69.99% / CGPA 6.3–7.3 (25–30 Academic Marks)" },
                      { val: "below_60", label: "Below 60% / CGPA < 6.3 (Ineligible under Condition 3)" }
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                          answers.marksBracket === opt.val
                            ? "bg-navy-50/70 border-navy-700 text-navy-900 font-bold shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs">{opt.label}</span>
                        <input
                          type="radio"
                          name="marksBracket"
                          value={opt.val}
                          checked={answers.marksBracket === opt.val}
                          onChange={(e) => setAnswers({ ...answers, marksBracket: e.target.value })}
                          className="text-navy-900 focus:ring-navy-700 w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    Which educational category are you applying under?
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    IICC distributes 175 general awards across 5 streams, plus 25 for employee children.
                  </p>
                  <div className="space-y-2">
                    {[
                      { val: "ug_professional", label: "Undergraduate Professional Course (B.Tech, MBBS, BDS, BCA, etc.) — 50 Awards" },
                      { val: "pg_professional", label: "Postgraduate Professional Course (M.Tech, MBA, MCA, M.Sc, etc.) — 40 Awards" },
                      { val: "senior_secondary", label: "Senior Secondary (Class XI–XII) — 50 Awards" },
                      { val: "school", label: "School Level (Class IX–X) — 20 Awards" },
                      { val: "diploma", label: "Diploma (Polytechnic / Post-Class 10/12/Grad) — 15 Awards" }
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                          answers.courseCategory === opt.val
                            ? "bg-navy-50/70 border-navy-700 text-navy-900 font-bold shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs">{opt.label}</span>
                        <input
                          type="radio"
                          name="courseCategory"
                          value={opt.val}
                          checked={answers.courseCategory === opt.val}
                          onChange={(e) => setAnswers({ ...answers, courseCategory: e.target.value })}
                          className="text-navy-900 focus:ring-navy-700 w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    Are you a child of an IICC employee / staff member?
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    25 awards are specifically reserved under the IICC Staff / Management Children quota.
                  </p>
                  <div className="space-y-2">
                    {[
                      { val: "no", label: "No, applying under General Merit Category (175 Awards)" },
                      { val: "yes", label: "Yes, parent is an active/retired employee of IICC (25 Awards)" }
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                          answers.isIiccChild === opt.val
                            ? "bg-navy-50/70 border-navy-700 text-navy-900 font-bold shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs">{opt.label}</span>
                        <input
                          type="radio"
                          name="isIiccChild"
                          value={opt.val}
                          checked={answers.isIiccChild === opt.val}
                          onChange={(e) => setAnswers({ ...answers, isIiccChild: e.target.value })}
                          className="text-navy-900 focus:ring-navy-700 w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 6 && (
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    What is your total gross annual family income?
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Family income carries up to 35 marks in the official 100-mark merit formula.
                  </p>
                  <div className="space-y-2">
                    {[
                      { val: "under_1.5L", label: "Up to ₹1,50,000 (Maximum 35 Income Marks)" },
                      { val: "1.5L_2.5L", label: "₹1,50,001 to ₹2,50,000 (30 Income Marks)" },
                      { val: "2.5L_3.5L", label: "₹2,50,001 to ₹3,50,000 (25 Income Marks)" },
                      { val: "3.5L_5.5L", label: "₹3,50,001 to ₹5,50,000 (15–20 Income Marks)" },
                      { val: "5.5L_8L", label: "₹5,50,001 to ₹8,00,000 (5–10 Income Marks)" },
                      { val: "above_8L", label: "Above ₹8,00,000 (3 Income Marks)" }
                    ].map((opt) => (
                      <label
                        key={opt.val}
                        className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition ${
                          answers.annualIncome === opt.val
                            ? "bg-navy-50/70 border-navy-700 text-navy-900 font-bold shadow-2xs"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs">{opt.label}</span>
                        <input
                          type="radio"
                          name="annualIncome"
                          value={opt.val}
                          checked={answers.annualIncome === opt.val}
                          onChange={(e) => setAnswers({ ...answers, annualIncome: e.target.value })}
                          className="text-navy-900 focus:ring-navy-700 w-4 h-4"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 6 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 px-4 py-2 rounded-lg shadow-xs transition"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleCalculate}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 rounded-lg shadow-xs transition"
                >
                  <span>Check Eligibility</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : isEligible ? (
          /* Success State */
          <div className="gov-card border-emerald-200 p-6 sm:p-8 shadow-xs text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 inline-block">
              IICC Eligibility Confirmed
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 mb-2 tracking-tight">
              You Meet All 3 Mandatory Conditions!
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              You fulfill Condition 1 (Indian National), Condition 2 (Regular Student), and Condition 3 (at least 60% marks in qualifying exam).
            </p>

            <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/80 text-left text-xs space-y-3 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-emerald-200/70 pb-2">
                <span className="font-bold text-emerald-950">Recommended Award Stream:</span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded font-mono">
                  {categoryNames[answers.courseCategory]?.awards || "Quota Available"}
                </span>
              </div>
              <p className="text-emerald-900 font-semibold text-xs">
                {categoryNames[answers.courseCategory]?.title || "IICC Scholarship Scheme"}
              </p>
              {answers.isIiccChild === "yes" && (
                <div className="text-[11px] text-emerald-800 bg-white/80 p-2.5 rounded-lg border border-emerald-200">
                  <span className="font-bold">Staff Quota:</span> Also eligible under the 25 reserved seats for IICC employees' children.
                </div>
              )}
              <div className="pt-1 text-[11px] text-emerald-800">
                <span className="font-bold">Merit Formula (100 Marks):</span> Academic (60) + Income (35) + Special Category (5).
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/student/register"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-xs transition uppercase tracking-wide"
              >
                Apply for IICC Scholarship 2026-27
              </Link>
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        ) : (
          /* Not Eligible State */
          <div className="gov-card border-amber-200 p-6 sm:p-8 shadow-xs text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
              <XCircle className="w-8 h-8" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 inline-block">
              Condition Not Met
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2 mb-2 tracking-tight">
              You do not meet the minimum eligibility criteria.
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Under IICC guidelines, applicants must be Indian nationals pursuing regular on-campus education and have achieved an aggregate minimum of 60% in the last qualifying examination.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold shadow-xs transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Check Again with Updated Info</span>
              </button>
              <Link
                href="/scholarships"
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
              >
                View Award Categories
              </Link>
            </div>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
