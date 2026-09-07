"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicNavbar } from "../../../components/layout/PublicNavbar";
import { PublicFooter } from "../../../components/layout/PublicFooter";
import { MOCK_SCHOLARSHIPS } from "../../../data/mock-scholarships";
import {
  CheckCircle2,
  Calendar,
  Award,
  FileText,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Clock,
  ArrowLeft
} from "lucide-react";

export default function ScholarshipDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const scholarship = MOCK_SCHOLARSHIPS.find((s) => s.id === resolvedParams.id);

  if (!scholarship) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <PublicNavbar />
        <div className="flex-1 max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-bold text-slate-800">Scholarship Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            The requested scholarship code does not exist in our active directory.
          </p>
          <Link
            href="/scholarships"
            className="btn btn-primary btn-md text-xs"
          >
            Back to All Scholarships
          </Link>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/scholarships" className="hover:text-navy-900 font-medium flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Scholarships</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-bold truncate">{scholarship.name}</span>
        </div>

        {/* Header Hero Card */}
        <div className="gov-card p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-800 border border-navy-200/80">
                {scholarship.category}
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {scholarship.code}
              </span>
            </div>
            <span className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Deadline: {scholarship.deadline}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {scholarship.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            {scholarship.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Total Grant
              </span>
              <span className="text-xl font-extrabold text-emerald-700 font-mono tabular-nums">
                {scholarship.amount}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Awards Quota
              </span>
              <span className="text-lg font-bold text-navy-900 font-mono tabular-nums">
                {scholarship.totalAwards} General Seats
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Staff Children Quota
              </span>
              <span className="text-xs font-bold text-amber-900 mt-1 block">
                {scholarship.reservedForIiccStaff > 0 ? `${scholarship.reservedForIiccStaff} Seats Reserved` : "25 Central Pool Seats"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                Evaluation Model
              </span>
              <span className="text-xs font-bold text-navy-900 mt-1 block font-mono">
                100-Mark Merit Engine
              </span>
            </div>
          </div>
        </div>

        {/* Content Tabs / Sections */}
        <div className="space-y-6">
          {/* Overview */}
          <section className="gov-card p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-2.5 uppercase tracking-wider">Program Overview</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {scholarship.overview}
            </p>
          </section>

          {/* Benefits */}
          <section className="gov-card p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Key Grant Benefits</h2>
            <ul className="space-y-2.5">
              {scholarship.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Eligibility Criteria */}
          <section className="gov-card p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Eligibility Requirements</h2>
            <ul className="space-y-2.5">
              {scholarship.eligibilityCriteria.map((crit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-navy-800 mt-2 flex-shrink-0" />
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Required Documents */}
          <section className="gov-card p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Required Documents for Upload</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scholarship.requiredDocuments.map((doc, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3 text-xs text-slate-800 font-semibold"
                >
                  <FileText className="w-4 h-4 text-navy-800 flex-shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Selection & Verification Process */}
          <section className="gov-card p-6 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Selection & Verification Workflow
            </h2>
            <div className="space-y-3">
              {scholarship.selectionProcess.map((proc, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-slate-700">
                  <span className="w-6 h-6 rounded-full bg-navy-100 text-navy-900 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-navy-200">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{proc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          {scholarship.faqs && scholarship.faqs.length > 0 && (
            <section className="gov-card p-6 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Specific Scheme FAQs</h2>
              <div className="space-y-3">
                {scholarship.faqs.map((faq, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                    <p className="font-bold text-slate-900 mb-1">Q: {faq.question}</p>
                    <p className="text-slate-600 leading-relaxed">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sticky Bottom Bar with Apply CTA */}
          <div className="bg-blue-50/80 text-slate-900 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs border border-blue-200/90">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight text-navy-950">Ready to apply for {scholarship.name}?</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Applications close on <strong className="text-amber-800 font-mono font-semibold">{scholarship.deadline}</strong>. Have your marksheets ready.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/eligibility"
                className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold hover:bg-slate-50 transition text-slate-700 shadow-2xs"
              >
                Check Eligibility
              </Link>
              <Link
                href="/student/application"
                className="px-5 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs transition active:scale-95 uppercase tracking-wide cursor-pointer"
              >
                Apply Online Now
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
