import { Scholarship } from "../types/scholarship";

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "iicc-ug-prof-2026",
    name: "IICC Merit-cum-Means Undergraduate Professional Scholarship",
    code: "IICC-UG-2026",
    description:
      "Prestigious merit-cum-means financial award for students enrolled in full-time regular Bachelor's Professional Degrees (B.Tech, MBBS, BCA, BBA, Law, etc.) in recognized Indian institutes.",
    category: "Undergraduate Professional Course",
    educationLevel: "Undergraduate",
    amount: "₹50,000 / Year",
    amountNumeric: 50000,
    totalAwards: 50,
    reservedForIiccStaff: 8,
    deadline: "2026-10-31",
    location: "All India (Indian Citizens)",
    status: "Open",
    eligibilitySummary: "Indian citizen, regular full-time Bachelor's degree, minimum 60% marks or equivalent CGPA.",
    overview:
      "Instituted by the India Islamic Cultural Centre (IICC), New Delhi, to support meritorious and economically underprivileged students pursuing professional undergraduate higher education.",
    benefits: [
      "Annual scholarship grant of ₹50,000 deposited directly into bank account via DBT",
      "Official certificate of scholarship awarded by IICC Convener (Education)",
      "Access to IICC academic seminars, library access, and youth mentorship networks"
    ],
    eligibilityCriteria: [
      "Must be an Indian citizen studying in a recognized educational institution in India",
      "Must be enrolled in a regular full-time undergraduate professional program (no distance learning)",
      "Minimum 60% marks or equivalent CGPA in the previous annual examination (CGPA × 9.5)",
      "Annual family income evaluated under 100-mark objective scoring system",
      "Special category points available for orphan students, single/widow parents, PwD, and girl students"
    ],
    requiredDocuments: [
      "Aadhaar Card (PDF only, max 1MB)",
      "Student Photograph (image only, max 1MB)",
      "Previous Academic Marksheet (PDF only, max 1MB)",
      "Bonafide Certificate / Proof of Enrolment from School/College/University",
      "Income Certificate from Government Revenue Authority OR Affidavit attested by Notary Magistrate",
      "PwD Certificate (if applicable, optional)",
      "PAN Card (optional)"
    ],
    selectionProcess: [
      "Condition 1: Indian Nationality verification",
      "Condition 2: Regular course enrolment check (Distance mode ineligible)",
      "Condition 3: Minimum 60% marks qualification check",
      "Evaluation based on official 100-mark objective scoring: Academic (60) + Income (35) + Special Category (5)",
      "Sequential tie-breaking: Lower income ➡️ Higher % ➡️ Special category ➡️ Younger candidate",
      "Document verification and Video KYC liveness confirmation",
      "Final award conferral by Dr. Khwaja M. Shahid, Convener (Education), IICC"
    ],
    verificationProcess: [
      "Digital document verification and OCR authenticity check",
      "Identity verification via Aadhaar cross-check",
      "Direct bank disbursement confirmation"
    ],
    faqs: [
      {
        question: "How is the CGPA converted to percentage?",
        answer: "As per official IICC policy, Percentage = CGPA Score × 9.5."
      },
      {
        question: "Can distance education students apply?",
        answer: "No. As per Section 3.3, only candidates enrolled in a regular full-time program are eligible."
      },
      {
        question: "How are the 100 marks distributed?",
        answer: "Academic Performance carries up to 60 marks, Annual Family Income up to 35 marks, and Special Vulnerable Categories up to 5 marks."
      }
    ]
  },
  {
    id: "iicc-pg-prof-2026",
    name: "IICC Merit-cum-Means Postgraduate Professional Scholarship",
    code: "IICC-PG-2026",
    description:
      "Financial assistance for meritorious students enrolled in Master's and Postgraduate Professional Programs (M.Tech, MBA, MCA, MD/MS, LLM, etc.).",
    category: "Postgraduate Professional Course",
    educationLevel: "Postgraduate",
    amount: "₹60,000 / Year",
    amountNumeric: 60000,
    totalAwards: 40,
    reservedForIiccStaff: 6,
    deadline: "2026-10-31",
    location: "All India (Indian Citizens)",
    status: "Open",
    eligibilitySummary: "Enrolled in regular Master's/PG professional degree with >= 60% in Graduation.",
    overview:
      "Aimed at promoting advanced postgraduate professional research and specialized vocational proficiency among deserving students across India.",
    benefits: [
      "Direct financial grant of ₹60,000 per academic year",
      "Mentorship and career guidance workshops at IICC New Delhi",
      "Priority consideration for IICC research fellow conclaves"
    ],
    eligibilityCriteria: [
      "Indian citizen enrolled in a full-time regular postgraduate professional program",
      "Minimum 60% marks or equivalent CGPA in Graduation qualifying exams",
      "Complete family income certification from competent authority"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Graduation Final Degree / Marksheet",
      "Current PG Bonafide Certificate",
      "Income Certificate / Notarized Affidavit",
      "Bank Account details"
    ],
    selectionProcess: [
      "100-mark evaluation (60 Academic + 35 Income + 5 Special Category)",
      "Provisional merit listing and document scrutiny"
    ],
    verificationProcess: [
      "Institutional bonafide verification",
      "Digital document scrutiny"
    ],
    faqs: [
      {
        question: "What is the qualifying percentage required?",
        answer: "A minimum of 60% marks in previous annual/graduation examination is mandatory."
      }
    ]
  },
  {
    id: "iicc-senior-sec-2026",
    name: "IICC Merit-cum-Means Senior Secondary Scholarship",
    code: "IICC-SRSEC-2026",
    description:
      "Scholarship support for students studying in Class XI and XII across Science, Commerce, and Arts streams in recognized boards.",
    category: "Senior Secondary (Class XI – XII)",
    educationLevel: "Senior Secondary",
    amount: "₹25,000 / Year",
    amountNumeric: 25000,
    totalAwards: 50,
    reservedForIiccStaff: 5,
    deadline: "2026-10-31",
    location: "All India (Indian Citizens)",
    status: "Open",
    eligibilitySummary: "Class 11 or 12 regular students with >= 60% in Class 10 board examination.",
    overview:
      "Supporting talented secondary students to bridge the financial gap during the critical preparatory years of higher secondary education.",
    benefits: [
      "Annual scholarship grant of ₹25,000",
      "Educational guidance and coaching assistance grants"
    ],
    eligibilityCriteria: [
      "Enrolled as a regular student in Class XI or XII in a recognized Board (CBSE, ICSE, State Boards)",
      "Minimum 60% marks in Class X Board Examination"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Class 10th Board Marksheet",
      "Current School Bonafide Certificate / School ID",
      "Family Income Certificate / Affidavit"
    ],
    selectionProcess: [
      "100-mark objective scoring based on Class 10 marks and income bracket"
    ],
    verificationProcess: [
      "School principal attestation and document match"
    ],
    faqs: [
      {
        question: "Are private candidates eligible?",
        answer: "No, candidates must be enrolled in regular full-time schooling."
      }
    ]
  },
  {
    id: "iicc-school-level-2026",
    name: "IICC Merit-cum-Means School Level Scholarship",
    code: "IICC-SCH-2026",
    description:
      "Foundational educational assistance for deserving young students studying in Class IX and Class X.",
    category: "School Level (Class IX – X)",
    educationLevel: "School Level",
    amount: "₹15,000 / Year",
    amountNumeric: 15000,
    totalAwards: 20,
    reservedForIiccStaff: 4,
    deadline: "2026-10-31",
    location: "All India (Indian Citizens)",
    status: "Open",
    eligibilitySummary: "Class 9 or 10 regular school students with >= 60% marks in previous annual exam.",
    overview:
      "Empowering young minds from economically vulnerable families to complete their secondary schooling without financial distress.",
    benefits: [
      "₹15,000 annual scholarship deposited directly into student/parent joint account",
      "Textbook and uniform assistance"
    ],
    eligibilityCriteria: [
      "Regular enrolled student of Class IX or X in a recognized school",
      "Minimum 60% marks in previous class annual examination"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Previous Year School Marksheet / Progress Report",
      "School Enrolment Bonafide",
      "Income Proof / Affidavit"
    ],
    selectionProcess: [
      "Merit-cum-means ranking under 100-mark evaluation"
    ],
    verificationProcess: [
      "School enrollment verification"
    ],
    faqs: [
      {
        question: "Can parents with single income apply?",
        answer: "Yes, single parent / widow parent applicants receive 4 special category marks."
      }
    ]
  },
  {
    id: "iicc-diploma-2026",
    name: "IICC Merit-cum-Means Professional Diploma Scholarship",
    code: "IICC-DIP-2026",
    description:
      "Dedicated scholarship for students pursuing technical and vocational diplomas (Polytechnic, Paramedical, ITI) after Class 10, 12, or Graduation.",
    category: "Diploma",
    educationLevel: "Diploma",
    amount: "₹30,000 / Year",
    amountNumeric: 30000,
    totalAwards: 15,
    reservedForIiccStaff: 2,
    deadline: "2026-10-31",
    location: "All India (Indian Citizens)",
    status: "Open",
    eligibilitySummary: "Diploma students in recognized technical institutions with >= 60% qualifying score.",
    overview:
      "Promoting technical and vocational skills by supporting students pursuing diploma qualifications across engineering, health, and allied sectors.",
    benefits: [
      "Annual scholarship grant of ₹30,000",
      "Vocational tools and kit stipend allowance"
    ],
    eligibilityCriteria: [
      "Enrolled in regular full-time diploma course in a recognized board/polytechnic",
      "Minimum 60% marks in qualifying entry examination (Class 10 or 12)"
    ],
    requiredDocuments: [
      "Aadhaar Card",
      "Qualifying Marksheet",
      "Polytechnic / Institute Bonafide",
      "Income Certificate"
    ],
    selectionProcess: [
      "Objective 100-mark evaluation system"
    ],
    verificationProcess: [
      "Polytechnic bonafide verification"
    ],
    faqs: [
      {
        question: "Are lateral entry students eligible?",
        answer: "Yes, lateral entry polytechnic diploma students are eligible."
      }
    ]
  }
];
