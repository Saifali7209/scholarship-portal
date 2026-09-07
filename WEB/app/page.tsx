"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "../components/layout/PublicNavbar";
import { PublicFooter } from "../components/layout/PublicFooter";
import { HomeDotBackground } from "../components/ui/HomeDotBackground";
import { MOCK_SCHOLARSHIPS } from "../data/mock-scholarships";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  FileText,
  Search,
  ChevronDown,
  HelpCircle,
  Clock,
  Sparkles,
  Building,
  Check
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What are the 3 baseline conditions for the IICC Scholarship?",
      a: "As per official guidelines: 1. Must be a citizen of India residing in India. 2. Must be a regular full-time student in a recognized institution/school/college (distance/correspondence courses are not eligible). 3. Must have secured at least 60% aggregate marks in the last qualifying examination (CGPA converted via Percentage = CGPA × 9.5)."
    },
    {
      q: "How many total scholarships are awarded under the IICC programme?",
      a: "A total of 200 awards are granted annually: 175 awards distributed across 5 categories (UG Professional: 50, Senior Secondary: 50, PG Professional: 40, School Level: 20, Diploma: 15) plus 25 awards reserved for children of IICC employees and management staff."
    },
    {
      q: "How is the 100-mark merit score calculated?",
      a: "Marks are calculated strictly out of 100: Academic Performance carries up to 60 marks (based on % bracket), Annual Family Income carries up to 35 marks (lower income slabs receive higher marks), and Special Categories carry up to 5 marks capped (Orphan: 5, Single Parent/Widow: 4, PwD: 3, Girl Student: 2)."
    },
    {
      q: "What is the tie-breaking policy if two candidates have the same score?",
      a: "Ranking resolution follows a strict sequential hierarchy: 1. Candidate with lower family income receives priority. 2. Higher qualifying examination percentage. 3. Special category seniority. 4. Date of birth (younger candidate priority)."
    },
    {
      q: "What documents are mandatory for submission (Q41–Q45)?",
      a: "Self-attested copy of Aadhaar Card (Q41), PAN Card if available (Q42), Bonafide Certificate / Enrolment proof from Head of Institution (Q43), Disability/Special category certificate if claimed (Q44), and Income Certificate or Notarized Affidavit on ₹10 non-judicial stamp paper (Q45)."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900 relative">
      {/* Full-Page Evenly Spaced Regular Dot Grid Background (Covering naturally from top to bottom) */}
      <HomeDotBackground />

      <PublicNavbar />

      <main className="relative z-10 flex-1">
        {/* Hero Section (Light, Clean, Airy, Institutional with Subtle Dot Grid) */}
        <section className="relative text-slate-900 py-14 sm:py-20 lg:py-24 border-b border-slate-200/80 overflow-hidden">
          {/* Soft subtle ambient radial glow centered on text to ensure maximum text readability */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_80%)] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Top Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>India Islamic Cultural Centre (IICC) • Session 2026-27</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
                IICC Merit-cum-Means <br className="hidden sm:inline" />
                <span className="text-navy-900">
                  Scholarship Programme
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mb-2 font-medium">
                87-88, Lodhi Road, New Delhi-110003 • Education Committee • Convener: Dr. Khwaja M. Shahid
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                Offering 200 merit-cum-means awards (175 General + 25 Staff Wards) across School, Senior Secondary, Diploma, Undergraduate, and Postgraduate Professional courses for talented regular Indian students.
              </p>

              {/* 3 Mandatory Conditions Card (Crisp Solid Light Surfaces) */}
              <div className="relative bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-8 text-left shadow-xs">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
                  <span className="text-xs font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-navy-800" />
                    <span>Mandatory Baseline Eligibility (All 3 Conditions Required):</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">Statutory Criteria</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 hover:bg-white hover:border-navy-200 transition shadow-2xs">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs">Condition 1: Indian Citizen</strong>
                      <span className="text-slate-600 text-[11px]">Must be a citizen of India residing in India</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 hover:bg-white hover:border-navy-200 transition shadow-2xs">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs">Condition 2: Regular Enrolment</strong>
                      <span className="text-slate-600 text-[11px]">Enrolled full-time in recognized institute</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-3 hover:bg-white hover:border-navy-200 transition shadow-2xs">
                    <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs">Condition 3: Academic Merit</strong>
                      <span className="text-slate-600 text-[11px]">Min. 60% aggregate marks (CGPA × 9.5)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
                <Link
                  href="/eligibility"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-xs sm:text-sm bg-navy-900 hover:bg-navy-800 text-white shadow-sm hover:shadow transition active:scale-98 tracking-wide uppercase cursor-pointer"
                >
                  <span>Check 3-Step Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/scholarships"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs hover:shadow-xs transition"
                >
                  <span>View 5 Award Streams</span>
                </Link>
              </div>

              {/* Hero Key Metrics Bar (Solid White Card) */}
              <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs text-left">
                <div className="p-2 sm:border-r border-slate-200 last:border-r-0">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">
                    Total Awards
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-navy-950 font-mono tabular-nums">200 Seats</span>
                </div>
                <div className="p-2 sm:border-r border-slate-200 last:border-r-0">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">
                    General + Staff Quota
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-emerald-700 font-mono tabular-nums">175 + 25</span>
                </div>
                <div className="p-2 sm:border-r border-slate-200 last:border-r-0">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">
                    Scoring Engine
                  </span>
                  <span className="text-lg sm:text-xl font-extrabold text-navy-900 font-mono tabular-nums">100 Marks</span>
                </div>
                <div className="p-2">
                  <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-semibold">
                    Application Deadline
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-emerald-700 flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    31 Oct 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative py-16 sm:py-20 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                IICC Merit Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">How Selection Works</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                From online eligibility verification to 100-mark scoring formula and merit-ranked award disbursement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-navy-900 text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Check Eligibility</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Answer simple questions about your nationality, ongoing course, past marks, and family income to find matching schemes.
                </p>
              </div>

              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-navy-900 text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Submit Application</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fill the 5-step form, upload your marksheets and certificates, and save drafts at any time before final confirmation.
                </p>
              </div>

              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-navy-900 text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Merit Shortlisting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent ranking of all applicants with live waiting list positions. Shortlisted candidates are invited for Video KYC.
                </p>
              </div>

              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  4
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Final Award & DBT</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Once biometric verification completes, award letters are issued and funds are disbursed directly to your bank account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Available Scholarships Section */}
        <section className="relative py-16 sm:py-20 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold text-navy-900 uppercase tracking-widest bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                  Official 2026-27 Schemes
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">IICC Scholarship Streams</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  200 merit-cum-means awards distributed across 5 education categories plus staff quota.
                </p>
              </div>
              <Link
                href="/scholarships"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 hover:text-navy-950 hover:underline"
              >
                <span>View All 5 Award Streams</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_SCHOLARSHIPS.map((sch) => (
                <div
                  key={sch.id}
                  className="relative bg-white rounded-xl border border-slate-200/90 p-5 sm:p-6 hover:border-slate-300 transition hover:shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-900 border border-navy-200/80">
                        {sch.category}
                      </span>
                      <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        Deadline: {sch.deadline}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1.5">
                      <Link href={`/scholarships/${sch.id}`} className="hover:text-navy-900">
                        {sch.name}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 mb-3.5 line-clamp-2 leading-relaxed">{sch.description}</p>

                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/70 text-xs text-slate-600 mb-4">
                      <strong className="text-slate-800">Eligibility:</strong> {sch.eligibilitySummary}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                        Grant Amount
                      </span>
                      <span className="text-base font-extrabold text-emerald-700 font-mono tabular-nums">
                        {sch.amount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/scholarships/${sch.id}`}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs"
                      >
                        Details
                      </Link>
                      <Link
                        href="/student/application"
                        className="px-3.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-2xs transition active:scale-95 cursor-pointer"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Dates Timeline (Clean Light Surface) */}
        <section className="relative py-14 sm:py-16 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-widest bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                Schedule & Milestones
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">Key Operational Dates</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative bg-white p-5 rounded-xl border border-slate-200 text-center shadow-xs">
                <div className="text-[11px] font-bold text-navy-800 uppercase tracking-wider">
                  Portal Opens
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">01 Aug 2026</div>
                <p className="text-[11px] text-slate-500 mt-1">Applications & registration live</p>
              </div>
              <div className="relative bg-white p-5 rounded-xl border border-slate-200 text-center shadow-xs">
                <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  Application Closes
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">31 Oct 2026</div>
                <p className="text-[11px] text-slate-500 mt-1">Hard deadline for submissions</p>
              </div>
              <div className="relative bg-white p-5 rounded-xl border border-slate-200 text-center shadow-xs">
                <div className="text-[11px] font-bold text-purple-800 uppercase tracking-wider">
                  Shortlist Released
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">15 Nov 2026</div>
                <p className="text-[11px] text-slate-500 mt-1">Provisional merit & waiting list</p>
              </div>
              <div className="relative bg-white p-5 rounded-xl border border-slate-200 text-center shadow-xs">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  KYC & Disbursement
                </div>
                <div className="text-lg font-bold text-slate-900 mt-1 font-mono">01 Dec 2026</div>
                <p className="text-[11px] text-slate-500 mt-1">Video verification & DBT transfers</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative py-16 sm:py-20 border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-widest bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                Guidance & Queries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.q}
                  className="relative bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaq === idx ? "rotate-180 text-navy-900" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Banner (Light Corporate Style) */}
        <section className="relative py-14 sm:py-18">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white border border-slate-200/90 rounded-2xl p-8 sm:p-12 shadow-xs text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-navy-900 border border-blue-200/80 text-[11px] font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Academic Year 2026-27 Intake</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
                Ready to apply for your scholarship grant?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
                Complete the 3-minute eligibility check and take the first step towards securing your educational fellowship.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/eligibility"
                  className="px-6 py-3 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm hover:shadow cursor-pointer"
                >
                  Start Free Eligibility Check
                </Link>
                <Link
                  href="/student/register"
                  className="px-6 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 font-semibold text-xs hover:bg-slate-50 transition shadow-2xs"
                >
                  Create Student Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
