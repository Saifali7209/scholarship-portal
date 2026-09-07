"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import { StudentLayout } from "../../../components/layout/StudentLayout";
import {
  calculateIiccScore,
  IncomeBracket,
  SpecialCategorySelections
} from "../../../types/scholarship";
import {
  User,
  GraduationCap,
  Users,
  Award,
  Building,
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  Camera,
  ShieldCheck,
  Scale,
  Sparkles,
  Info
} from "lucide-react";

const INDIAN_STATES = [
  "Delhi",
  "Uttar Pradesh",
  "Bihar",
  "Jammu & Kashmir",
  "Maharashtra",
  "West Bengal",
  "Karnataka",
  "Telangana",
  "Kerala",
  "Tamil Nadu",
  "Rajasthan",
  "Madhya Pradesh",
  "Gujarat",
  "Assam",
  "Punjab",
  "Haryana",
  "Jharkhand",
  "Odisha",
  "Uttarakhand",
  "Himachal Pradesh",
  "Andhra Pradesh",
  "Goa",
  "Manipur",
  "Meghalaya",
  "Tripura",
  "Other"
];

const INCOME_SLABS: { val: IncomeBracket; label: string; marks: number }[] = [
  { val: "Up to Rs.1,50,000", label: "Up to ₹1,50,000 per annum", marks: 35 },
  { val: "Rs.1,50,001 - Rs.2,50,000", label: "₹1,50,001 to ₹2,50,000 per annum", marks: 30 },
  { val: "Rs.2,50,001 - Rs.3,50,000", label: "₹2,50,001 to ₹3,50,000 per annum", marks: 25 },
  { val: "Rs.3,50,001 - Rs.4,50,000", label: "₹3,50,001 to ₹4,50,000 per annum", marks: 20 },
  { val: "Rs.4,50,001 to Rs.5,50,000", label: "₹4,50,001 to ₹5,50,000 per annum", marks: 15 },
  { val: "Rs.5,50,001 to Rs.6,50,000", label: "₹5,50,001 to ₹6,50,000 per annum", marks: 10 },
  { val: "Rs.6,50,001 to Rs.8,00,000", label: "₹6,50,001 to ₹8,00,000 per annum", marks: 5 },
  { val: "Above Rs.8,00,000", label: "Above ₹8,00,000 per annum", marks: 3 }
];

export default function ApplicationFormPage() {
  const { studentApplication, saveDraft } = useApp();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState("");

  // Form States initialized from studentApplication
  const [personal, setPersonal] = useState(studentApplication.personalDetails);
  const [academic, setAcademic] = useState(studentApplication.academicDetails);
  const [family, setFamily] = useState(studentApplication.familyDetails);
  const [bank, setBank] = useState(studentApplication.bankDetails);
  const [scholarshipAnswers, setScholarshipAnswers] = useState(
    studentApplication.scholarshipAnswers || {}
  );
  const [specialCategories, setSpecialCategories] = useState<SpecialCategorySelections>(
    studentApplication.specialCategories || {
      isGirlStudent: studentApplication.personalDetails?.gender === "Female",
      isOrphan: false,
      isSingleParentOrWidow: false,
      isStudentWithDisability: false,
      isChildOfIiccEmployee: false
    }
  );

  const [sameAsPermanent, setSameAsPermanent] = useState(true);
  const [declarationChecked, setDeclarationChecked] = useState(true);

  // Handle CGPA to percentage live conversion
  const handleCgpaChange = (cgpaVal: string) => {
    const numericCgpa = parseFloat(cgpaVal);
    if (!isNaN(numericCgpa) && numericCgpa > 0) {
      const converted = Math.min(100, Math.round(numericCgpa * 9.5 * 100) / 100);
      setAcademic({
        ...academic,
        cgpa: cgpaVal,
        percentageNumeric: converted,
        convertedPercentage: `${converted}%`,
        previousMarks: `${converted}%`
      });
    } else {
      setAcademic({
        ...academic,
        cgpa: cgpaVal
      });
    }
  };

  const handlePercentageChange = (pctVal: string) => {
    const numericPct = parseFloat(pctVal);
    setAcademic({
      ...academic,
      previousMarks: pctVal.includes("%") ? pctVal : `${pctVal}%`,
      percentageNumeric: isNaN(numericPct) ? 0 : numericPct
    });
  };

  // Live Score Calculator
  const liveScore = useMemo(() => {
    const pct = academic.percentageNumeric || 80;
    const bracket = family.incomeBracket || "Rs.2,50,001 - Rs.3,50,000";
    return calculateIiccScore(pct, bracket, specialCategories);
  }, [academic.percentageNumeric, family.incomeBracket, specialCategories]);

  const steps = [
    { num: 1, title: "Personal Details (Q01–Q12)", icon: User },
    { num: 2, title: "Academic & Marks (Q13–Q28)", icon: GraduationCap },
    { num: 3, title: "Special Category (Q29–Q30)", icon: Award },
    { num: 4, title: "Family & Income (Q31–Q35)", icon: Users },
    { num: 5, title: "Bank & Undertaking (Q36–Q46)", icon: Building }
  ];

  const handleSaveDraft = () => {
    saveDraft({
      personalDetails: {
        ...personal,
        currentAddress: sameAsPermanent ? personal.address : personal.currentAddress
      },
      academicDetails: academic,
      familyDetails: family,
      bankDetails: bank,
      specialCategories,
      scholarshipAnswers
    });
    setSaveSuccessMsg("Application draft & 100-mark scoring updated successfully!");
    setTimeout(() => setSaveSuccessMsg(""), 3500);
  };

  const handleNext = () => {
    handleSaveDraft();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/student/application/documents");
    }
  };

  const isReadOnly =
    studentApplication.status !== "Draft" &&
    studentApplication.status !== "Correction Required";

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-navy-800 uppercase tracking-widest bg-navy-50 px-2.5 py-0.5 rounded-md border border-navy-200/60">
                  Ref: {studentApplication.applicationNumber}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200">
                  2026-27 Session
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-navy-950 tracking-tight">
                IICC Scholarship Application Dossier
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                India Islamic Cultural Centre • Complete the 46 official eligibility & merit questions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                disabled={isReadOnly}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold disabled:opacity-40 transition cursor-pointer shadow-2xs"
              >
                <Save className="w-3.5 h-3.5 text-slate-500" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Merit Score Breakdown Bar */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-slate-900 text-white p-4 rounded-xl shadow-sm border border-navy-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-slate-300">
                  Live IICC 100-Mark Formula Engine
                </span>
                <p className="text-[11px] text-slate-400">
                  Automatic calculation based on academic %, family income bracket, and special categories.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-center px-2 py-1 bg-white/10 rounded">
                <span className="text-[10px] uppercase tracking-wider text-slate-300 block">Academic</span>
                <span className="text-sm font-bold text-blue-300">{liveScore.academicMarks} / 60</span>
              </div>
              <span className="text-slate-400">+</span>
              <div className="text-center px-2 py-1 bg-white/10 rounded">
                <span className="text-[10px] uppercase tracking-wider text-slate-300 block">Income</span>
                <span className="text-sm font-bold text-emerald-300">{liveScore.incomeMarks} / 35</span>
              </div>
              <span className="text-slate-400">+</span>
              <div className="text-center px-2 py-1 bg-white/10 rounded">
                <span className="text-[10px] uppercase tracking-wider text-slate-300 block">Special</span>
                <span className="text-sm font-bold text-amber-300">{liveScore.specialCategoryMarks} / 5</span>
              </div>
              <span className="text-slate-400">=</span>
              <div className="text-center px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded">
                <span className="text-[10px] uppercase tracking-wider text-amber-300 block">Total Score</span>
                <span className="text-base font-extrabold text-white">{liveScore.totalScore} / 100</span>
              </div>
            </div>
          </div>
        </div>

        {saveSuccessMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {isReadOnly && (
          <div className="p-4 bg-navy-50 border border-navy-200 rounded-xl text-xs text-navy-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-navy-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Application is in read-only mode:</span>
              <p className="mt-0.5 text-navy-800">
                This application has already been submitted and is currently in{" "}
                <strong>{studentApplication.status}</strong> status. Editing is locked.
              </p>
            </div>
          </div>
        )}

        {/* Multi-Step Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between min-w-[620px]">
            {steps.map((s) => {
              const Icon = s.icon;
              const isCurrent = currentStep === s.num;
              const isPast = currentStep > s.num;

              return (
                <button
                  key={s.num}
                  onClick={() => setCurrentStep(s.num)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-navy-800 text-white shadow-sm"
                      : isPast
                      ? "text-navy-900 bg-navy-50 hover:bg-navy-100"
                      : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content Container */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* STEP 1: Personal Details (Q01 - Q12) */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 1: Applicant Identification (Questions 01–12)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Details must exactly match your Aadhaar Card and Matriculation/10th Board Certificate.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">PDF Page 2</span>
              </div>

              {/* Q01 Photograph Preview */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-24 bg-slate-200 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-semibold">Passport Photo</span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="text-xs font-bold text-slate-800 block">
                    Q01. Recent Passport Size Photograph
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Clear front-facing color photo against a light background (Max 2MB, JPEG/PNG).
                  </p>
                  <button
                    type="button"
                    disabled={isReadOnly}
                    className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-navy-700 text-navy-800 hover:bg-navy-50"
                  >
                    Select Photo File
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Q02 Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q02. Full Name of the Applicant (in Block Letters)
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={personal.fullName}
                    onChange={(e) => setPersonal({ ...personal, fullName: e.target.value.toUpperCase() })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 uppercase"
                  />
                </div>

                {/* Q07 Date of Birth */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q07. Date of Birth (as per 10th Certificate)
                  </label>
                  <input
                    type="date"
                    disabled={isReadOnly}
                    value={personal.dob}
                    onChange={(e) => setPersonal({ ...personal, dob: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                {/* Q05 Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Q05. Gender</label>
                  <select
                    disabled={isReadOnly}
                    value={personal.gender}
                    onChange={(e) => {
                      const newGender = e.target.value as any;
                      setPersonal({ ...personal, gender: newGender });
                      if (newGender === "Female") {
                        setSpecialCategories({ ...specialCategories, isGirlStudent: true });
                      }
                    }}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female (+2 Special Marks)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Q06 Religion */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q06. Religion / Faith
                  </label>
                  <select
                    disabled={isReadOnly}
                    value={personal.religion || "Muslim"}
                    onChange={(e) => setPersonal({ ...personal, religion: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  >
                    <option value="Muslim">Muslim</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Jain">Jain</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Q08 Aadhaar Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q08. Aadhaar Number (UIDAI)
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={personal.aadhaarMasked}
                      onChange={(e) => setPersonal({ ...personal, aadhaarMasked: e.target.value })}
                      placeholder="XXXX-XXXX-XXXX"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 font-mono"
                    />
                    <ShieldCheck className="w-4 h-4 text-emerald-600 absolute right-3 top-2.5" />
                  </div>
                </div>

                {/* Optional PAN Card */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    PAN Card Number (Optional)
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={personal.panCardNumber || ""}
                    onChange={(e) => setPersonal({ ...personal, panCardNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. ABCDE1234F"
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 uppercase font-mono"
                  />
                </div>

                {/* Q12 Mobile & Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q12. Mobile Number (WhatsApp enabled)
                  </label>
                  <input
                    type="tel"
                    disabled={isReadOnly}
                    value={personal.mobile}
                    onChange={(e) => setPersonal({ ...personal, mobile: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Email Address for Correspondence
                  </label>
                  <input
                    type="email"
                    disabled={isReadOnly}
                    value={personal.email}
                    onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                {/* Q09 Permanent Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Q09. Permanent Residential Address
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={personal.address}
                    onChange={(e) => setPersonal({ ...personal, address: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                {/* Q10 State & District & PIN */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q10. State of Domicile
                  </label>
                  <select
                    disabled={isReadOnly}
                    value={personal.state}
                    onChange={(e) => setPersonal({ ...personal, state: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">District</label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={personal.district}
                    onChange={(e) => setPersonal({ ...personal, district: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">PIN Code</label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={personal.pincode}
                    onChange={(e) => setPersonal({ ...personal, pincode: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 font-mono"
                  />
                </div>

                {/* Q11 Current Address toggle */}
                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="checkbox"
                      checked={sameAsPermanent}
                      onChange={(e) => setSameAsPermanent(e.target.checked)}
                      className="rounded text-navy-800 focus:ring-navy-700"
                    />
                    <span>Q11. Current Address is same as Permanent Address</span>
                  </label>
                  {!sameAsPermanent && (
                    <input
                      type="text"
                      disabled={isReadOnly}
                      placeholder="Enter current communication address"
                      value={personal.currentAddress || ""}
                      onChange={(e) => setPersonal({ ...personal, currentAddress: e.target.value })}
                      className="mt-2 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Record & Marks (Q13 - Q28) */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 2: Educational Details & Academic Scoring (Questions 13–28)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Academic performance awards up to 60 marks in the 100-mark merit table. Minimum 60% is mandatory.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">PDF Page 2-3</span>
              </div>

              {/* Q13 Scholarship Category Applied Under */}
              <div className="p-4 bg-navy-50/70 border border-navy-200 rounded-xl space-y-2">
                <label className="block text-xs font-bold text-navy-900">
                  Q13. IICC Educational Category Applied Under (Total 175 General + 25 Staff Awards)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "UG", label: "Undergraduate Professional Course", quota: "50 Awards" },
                    { id: "PG", label: "Postgraduate Professional Course", quota: "40 Awards" },
                    { id: "XI-XII", label: "Senior Secondary (Class XI–XII)", quota: "50 Awards" },
                    { id: "IX-X", label: "School Level (Class IX–X)", quota: "20 Awards" },
                    { id: "Diploma", label: "Diploma (Polytechnic / Post-Grad)", quota: "15 Awards" }
                  ].map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:border-navy-500"
                    >
                      <span className="font-semibold text-slate-800">{cat.label}</span>
                      <span className="text-[10px] font-bold text-navy-800 bg-navy-100 px-2 py-0.5 rounded">
                        {cat.quota}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q15 - Q18 Present Course & Institution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Q17. Name & Full Address of Present School / College / University
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={academic.institution}
                    onChange={(e) => setAcademic({ ...academic, institution: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q15. Name of Present Course / Program of Study
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={academic.course}
                    onChange={(e) => setAcademic({ ...academic, course: e.target.value })}
                    placeholder="e.g. B.Tech Computer Science / Class 11th Science"
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q16. Current Year / Semester of Study
                  </label>
                  <select
                    disabled={isReadOnly}
                    value={academic.yearOfStudy}
                    onChange={(e) => setAcademic({ ...academic, yearOfStudy: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  >
                    <option value="1st Year">1st Year / 1st-2nd Sem</option>
                    <option value="2nd Year">2nd Year / 3rd-4th Sem</option>
                    <option value="3rd Year">3rd Year / 5th-6th Sem</option>
                    <option value="4th Year">4th Year / 7th-8th Sem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q18. Institutional Roll / Enrolment Number
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={academic.rollNumber}
                    onChange={(e) => setAcademic({ ...academic, rollNumber: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q19. Last Qualifying Examination Passed
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={academic.examinationPassed || "Class 12th Board / Intermediate"}
                    onChange={(e) => setAcademic({ ...academic, examinationPassed: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q20. Name of Board / University
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={academic.boardOrUniversity || "CBSE / State Board"}
                    onChange={(e) => setAcademic({ ...academic, boardOrUniversity: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q21. Year of Passing
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={academic.yearOfPassing || "2025"}
                    onChange={(e) => setAcademic({ ...academic, yearOfPassing: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>
              </div>

              {/* Q26 - Q27 Scoring Engine: Percentage vs CGPA */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Q26–Q27. Academic Scoring Engine (Max 60 Marks)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Official Rule: If marks are in CGPA, convert using formula:{" "}
                      <strong className="text-navy-900">Percentage = CGPA × 9.5</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="markType"
                        checked={academic.markType === "Percentage"}
                        onChange={() => setAcademic({ ...academic, markType: "Percentage" })}
                        className="text-navy-800"
                      />
                      <span>Percentage (%)</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer ml-3">
                      <input
                        type="radio"
                        name="markType"
                        checked={academic.markType === "CGPA"}
                        onChange={() => setAcademic({ ...academic, markType: "CGPA" })}
                        className="text-navy-800"
                      />
                      <span>CGPA (10 Point Scale)</span>
                    </label>
                  </div>
                </div>

                {academic.markType === "CGPA" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Enter CGPA Obtained (out of 10.0)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        max="10"
                        min="0"
                        disabled={isReadOnly}
                        value={academic.cgpa || ""}
                        onChange={(e) => handleCgpaChange(e.target.value)}
                        placeholder="e.g. 9.4"
                        className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-white font-mono font-bold text-slate-900"
                      />
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          Converted via CGPA × 9.5
                        </span>
                        <span className="text-base font-extrabold text-emerald-900">
                          {academic.convertedPercentage || "—"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">
                          Academic Award
                        </span>
                        <span className="text-base font-extrabold text-navy-900">
                          {liveScore.academicMarks} / 60 Marks
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Total Maximum Marks
                      </label>
                      <input
                        type="number"
                        disabled={isReadOnly}
                        value={academic.totalMarks || "500"}
                        onChange={(e) => setAcademic({ ...academic, totalMarks: e.target.value })}
                        placeholder="500"
                        className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Marks Obtained
                      </label>
                      <input
                        type="number"
                        disabled={isReadOnly}
                        value={academic.marksObtained || ""}
                        onChange={(e) => {
                          const obt = parseFloat(e.target.value);
                          const tot = parseFloat(academic.totalMarks || "500");
                          const pct = !isNaN(obt) && tot > 0 ? Math.round((obt / tot) * 10000) / 100 : 0;
                          setAcademic({
                            ...academic,
                            marksObtained: e.target.value,
                            percentageNumeric: pct,
                            previousMarks: `${pct}%`
                          });
                        }}
                        placeholder="e.g. 445"
                        className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700">
                        Aggregate Percentage
                      </label>
                      <input
                        type="text"
                        disabled={isReadOnly}
                        value={academic.previousMarks}
                        onChange={(e) => handlePercentageChange(e.target.value)}
                        placeholder="e.g. 89.0%"
                        className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white font-bold font-mono text-navy-900"
                      />
                    </div>
                  </div>
                )}

                {/* Score Slab Matrix Reference */}
                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded border border-slate-200">
                  <span className="font-bold text-slate-700">Official IICC Marks Table:</span>{" "}
                  &gt;=95% (60m) • 90–94.99% (55m) • 85–89.99% (50m) • 80–84.99% (45m) • 75–79.99% (40m) • 70–74.99% (35m) • 65–69.99% (30m) • 60–64.99% (25m) • Below 60% (Ineligible).
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Special Category & IICC Staff Child (Q29 - Q30) */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 3: Special Category & Employee Quota (Questions 29–30)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Special categories carry up to 5 additional merit marks (capped). 25 awards are reserved for IICC staff children.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">PDF Page 3</span>
              </div>

              {/* Q29 Special Category Multi-Select */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Q29. Applicable Special Category Criteria (Check all that apply):
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Earned: {liveScore.specialCategoryMarks} / 5 Marks (Capped)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={specialCategories.isOrphan}
                      onChange={(e) =>
                        setSpecialCategories({ ...specialCategories, isOrphan: e.target.checked })
                      }
                      className="mt-0.5 rounded text-navy-800 focus:ring-navy-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Orphan Student</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          +5 Marks
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Both parents deceased; certificate required.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={specialCategories.isSingleParentOrWidow}
                      onChange={(e) =>
                        setSpecialCategories({
                          ...specialCategories,
                          isSingleParentOrWidow: e.target.checked
                        })
                      }
                      className="mt-0.5 rounded text-navy-800 focus:ring-navy-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Single Parent / Widow Mother</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          +4 Marks
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Death certificate or legal single-parent documentation required.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={specialCategories.isStudentWithDisability}
                      onChange={(e) =>
                        setSpecialCategories({
                          ...specialCategories,
                          isStudentWithDisability: e.target.checked
                        })
                      }
                      className="mt-0.5 rounded text-navy-800 focus:ring-navy-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Student with Disability (PwD)</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          +3 Marks
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Minimum 40% benchmark disability certificate required.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={specialCategories.isGirlStudent}
                      onChange={(e) =>
                        setSpecialCategories({
                          ...specialCategories,
                          isGirlStudent: e.target.checked
                        })
                      }
                      className="mt-0.5 rounded text-navy-800 focus:ring-navy-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Girl Student</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          +2 Marks
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Encouraging female higher education participation.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Q30 IICC Staff Child Reservation */}
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-950 block">
                      Q30. Is applicant a child of an IICC Employee / Management Staff?
                    </span>
                    <span className="text-[11px] text-amber-800">
                      25 scholarships out of 200 are reserved specifically for wards of IICC staff.
                    </span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={specialCategories.isChildOfIiccEmployee}
                      onChange={(e) =>
                        setSpecialCategories({
                          ...specialCategories,
                          isChildOfIiccEmployee: e.target.checked
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                </div>

                {specialCategories.isChildOfIiccEmployee && (
                  <div className="pt-2 border-t border-amber-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-900">
                        Employee Parent Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Late Mohd. Rais"
                        className="mt-1 w-full px-2.5 py-1.5 text-xs border border-amber-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-900">
                        Department / Designation
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Administration / Caretaker"
                        className="mt-1 w-full px-2.5 py-1.5 text-xs border border-amber-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-amber-900">
                        IICC Staff ID / Code
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. IICC-EMP-084"
                        className="mt-1 w-full px-2.5 py-1.5 text-xs border border-amber-300 rounded bg-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Family Details & Income Bracket (Q31 - Q35) */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 4: Family Details & Annual Income (Questions 31–35)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Annual family income awards up to 35 marks in the 100-mark merit table. Lower income receives higher weightage.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">PDF Page 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Q31 Father Details */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q31. Father's Full Name
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={family.fatherName}
                    onChange={(e) => setFamily({ ...family, fatherName: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q32. Father's Occupation
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={family.fatherOccupation}
                    onChange={(e) => setFamily({ ...family, fatherOccupation: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                {/* Q33 Mother Details */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q33. Mother's Full Name
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={family.motherName || "Fatima Begum"}
                    onChange={(e) => setFamily({ ...family, motherName: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q34. Mother's Occupation
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={family.motherOccupation || "Homemaker"}
                    onChange={(e) => setFamily({ ...family, motherOccupation: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Total Family Size (Members in household)
                  </label>
                  <input
                    type="number"
                    disabled={isReadOnly}
                    value={family.familySize}
                    onChange={(e) => setFamily({ ...family, familySize: Number(e.target.value) })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Annual Household Income (Exact Figures in INR)
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={family.annualFamilyIncome}
                    onChange={(e) => setFamily({ ...family, annualFamilyIncome: e.target.value })}
                    placeholder="e.g. ₹2,40,000"
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 font-mono"
                  />
                </div>
              </div>

              {/* Q35 Official 8 Income Slabs Dropdown */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-emerald-950">
                    Q35. Official Annual Family Income Slab (Carries Max 35 Marks)
                  </label>
                  <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                    Award: {liveScore.incomeMarks} / 35 Marks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INCOME_SLABS.map((slab) => {
                    const isSelected = family.incomeBracket === slab.val;
                    return (
                      <label
                        key={slab.val}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                          isSelected
                            ? "bg-white border-emerald-600 shadow-sm"
                            : "bg-white/60 border-slate-200 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="incomeBracket"
                            value={slab.val}
                            checked={isSelected}
                            onChange={() => setFamily({ ...family, incomeBracket: slab.val })}
                            className="text-emerald-700 focus:ring-emerald-600"
                          />
                          <span className={`text-xs ${isSelected ? "font-bold text-slate-900" : "text-slate-700"}`}>
                            {slab.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                          {slab.marks} Marks
                        </span>
                      </label>
                    );
                  })}
                </div>

                <p className="text-[11px] text-emerald-800 pt-1">
                  <strong>Verification Note:</strong> Must upload competent authority certificate (SDM/Tehsildar/Revenue Officer) or Notary Affidavit on ₹10 non-judicial stamp paper in Step 6.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5: Bank Disbursement & Undertaking (Q36 - Q46) */}
          {currentStep === 5 && (
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Step 5: Bank Details & Official Undertaking (Questions 36–46)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Direct scholarship grant disbursement will be remitted solely into the applicant's verified bank account.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-slate-400">PDF Page 4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Q36 Account Holder Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q36. Name of Account Holder (Must be in Student's Name)
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={bank.accountHolderName}
                    onChange={(e) => setBank({ ...bank, accountHolderName: e.target.value.toUpperCase() })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 uppercase"
                  />
                </div>

                {/* Q37 Bank Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q37. Name of Bank & Branch
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={bank.bankName}
                    onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100"
                  />
                </div>

                {/* Q38 Account Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q38. Savings Bank Account Number
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={bank.accountNumber}
                    onChange={(e) => setBank({ ...bank, accountNumber: e.target.value })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 font-mono"
                  />
                </div>

                {/* Q39 IFSC Code */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Q39. IFSC Code of Bank Branch
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={bank.ifscCode}
                    onChange={(e) => setBank({ ...bank, ifscCode: e.target.value.toUpperCase() })}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-navy-700 bg-slate-50 focus:bg-white disabled:bg-slate-100 uppercase font-mono"
                  />
                </div>
              </div>

              {/* Q46 Official Declaration */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-navy-800 flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-900">
                    Q46. Official Undertaking & Declaration (Mandatory)
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed space-y-2">
                  <p>
                    "I hereby declare that the particulars given above are true and correct to the best of my knowledge and belief. If at any stage any information is found false or suppressed, the scholarship awarded may be cancelled and recovered."
                  </p>
                  <p>
                    "I also confirm that I am a regular student in the stated recognized institution and fulfill all 3 eligibility conditions prescribed by the India Islamic Cultural Centre (IICC)."
                  </p>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800 pt-1">
                  <input
                    type="checkbox"
                    checked={declarationChecked}
                    onChange={(e) => setDeclarationChecked(e.target.checked)}
                    className="rounded text-navy-800 focus:ring-navy-700"
                  />
                  <span>I agree to the declaration and accept responsibility for information provided.</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentStep === 5 && !declarationChecked}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <span>{currentStep === 5 ? "Proceed to Documents (Q41–Q45)" : "Next Step"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
