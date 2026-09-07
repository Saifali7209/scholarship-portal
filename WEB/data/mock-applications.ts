import {
  Application,
  ApplicationStatus,
  RiskLevel,
  VerificationStatus,
  IncomeBracket,
  calculateIiccScore
} from "../types/scholarship";
import { PRESET_PERSONAS } from "./mock-students";

const baseApplications: Application[] = Object.values(PRESET_PERSONAS);

const FIRST_NAMES = [
  "AARAV", "ADITI", "AMAN", "ARJUN", "BHAVNA", "CHIRAG", "DEEPIKA", "DEV", "DIVYA",
  "FARHAN", "GAURAV", "HARSHITA", "ISHAAN", "JAYA", "KAVYA", "KARAN", "MADHAV",
  "MANISH", "NEHA", "NIKHIL", "POOJA", "PRANAV", "RADHIKA", "RISHI", "RIYA",
  "SIDDHARTH", "SIMRAN", "SNEHA", "TANVI", "UTKARSH", "VARUN", "VIDYA", "YASH", "ZOYA"
];

const LAST_NAMES = [
  "SHARMA", "VERMA", "GUPTA", "MALHOTRA", "REDDY", "NAIR", "IYER", "MEHTA", "PATIL",
  "DESHMUKH", "CHOUDHURY", "BOSE", "BANERJEE", "DAS", "MISHRA", "PANDEY", "YADAV",
  "KAUR", "SINGH", "KHAN", "AHMED", "JOSHI", "BHAT", "RAO", "PILLAI", "MENON"
];

const INSTITUTIONS = [
  { name: "Indian Institute of Technology (IIT) Delhi", type: "IIT/NIT" as const, state: "Delhi" },
  { name: "Jamia Millia Islamia (Central University)", type: "Central University" as const, state: "Delhi" },
  { name: "Aligarh Muslim University (AMU)", type: "Central University" as const, state: "Uttar Pradesh" },
  { name: "Indian Institute of Technology (IIT) Bombay", type: "IIT/NIT" as const, state: "Maharashtra" },
  { name: "Delhi Technological University (DTU)", type: "State University" as const, state: "Delhi" },
  { name: "Jamia Hamdard (Deemed University)", type: "Central University" as const, state: "Delhi" },
  { name: "Jadavpur University", type: "State University" as const, state: "West Bengal" },
  { name: "Banaras Hindu University (BHU)", type: "Central University" as const, state: "Uttar Pradesh" },
  { name: "Delhi Public School, R.K. Puram", type: "School" as const, state: "Delhi" },
  { name: "Government Polytechnic, Lucknow", type: "College" as const, state: "Uttar Pradesh" }
];

const IICC_SCHEMES_POOL = [
  { id: "iicc-ug-prof-2026", name: "IICC Merit-cum-Means Undergraduate Professional Scholarship", cat: "Undergraduate Professional Course" },
  { id: "iicc-pg-prof-2026", name: "IICC Merit-cum-Means Postgraduate Professional Scholarship", cat: "Postgraduate Professional Course" },
  { id: "iicc-senior-sec-2026", name: "IICC Merit-cum-Means Senior Secondary Scholarship", cat: "Senior Secondary (Class XI – XII)" },
  { id: "iicc-school-level-2026", name: "IICC Merit-cum-Means School Level Scholarship", cat: "School Level (Class IX – X)" },
  { id: "iicc-diploma-2026", name: "IICC Merit-cum-Means Professional Diploma Scholarship", cat: "Diploma" }
];

const INCOME_SLABS: IncomeBracket[] = [
  "Up to Rs.1,50,000",
  "Rs.1,50,001 - Rs.2,50,000",
  "Rs.2,50,001 - Rs.3,50,000",
  "Rs.3,50,001 - Rs.4,50,000",
  "Rs.4,50,001 to Rs.5,50,000",
  "Rs.5,50,001 to Rs.6,50,000",
  "Rs.6,50,001 to Rs.8,00,000",
  "Above Rs.8,00,000"
];

const STATUS_POOL: ApplicationStatus[] = [
  "Submitted",
  "Under Review",
  "Under Review",
  "Shortlisted",
  "Final Verification",
  "Waitlisted",
  "Approved",
  "Correction Required",
  "Rejected"
];

// Generate exactly 105 realistic IICC applicant records
export const GENERATED_MOCK_APPLICATIONS: Application[] = Array.from({ length: 105 }, (_, i) => {
  const index = i + 1;
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
  const fullName = `${firstName} ${lastName}`;
  const inst = INSTITUTIONS[i % INSTITUTIONS.length];
  const sch = IICC_SCHEMES_POOL[i % IICC_SCHEMES_POOL.length];
  const status = STATUS_POOL[i % STATUS_POOL.length];
  const incomeBracket = INCOME_SLABS[i % INCOME_SLABS.length];

  // Percentage between 60.0% and 98.5%
  const percentageNumeric = Number((62 + ((i * 7.3) % 36)).toFixed(2));
  const previousMarks = `${percentageNumeric}%`;

  const isGirlStudent = i % 2 === 0;
  const isOrphan = i % 18 === 0;
  const isSingleParentOrWidow = !isOrphan && i % 8 === 0;
  const isStudentWithDisability = i % 25 === 0;
  const isChildOfIiccEmployee = i % 30 === 0; // Reserved quota

  const specialCategories = {
    isGirlStudent,
    isOrphan,
    isSingleParentOrWidow,
    isStudentWithDisability,
    isChildOfIiccEmployee
  };

  // Calculate official 100-mark IICC score
  const scoringBreakdown = calculateIiccScore(percentageNumeric, incomeBracket, specialCategories);
  const score = scoringBreakdown.totalScore;

  const riskLevel: RiskLevel = i % 14 === 0 ? "High" : i % 6 === 0 ? "Medium" : "Low";
  const verificationStatus: VerificationStatus =
    status === "Approved" ? "Passed" :
    status === "Rejected" ? "Failed" :
    status === "Correction Required" || riskLevel === "High" ? "Manual Review" :
    status === "Final Verification" ? "In Progress" : "Pending";

  const appNumber = `IICC-2026-${String(1000 + index).padStart(6, "0")}`;
  const padDay = String((index % 28) + 1).padStart(2, "0");
  const subDate = `2026-08-${padDay}`;

  return {
    id: `app-gen-${index}`,
    applicationNumber: appNumber,
    scholarshipId: sch.id,
    scholarshipName: sch.name,
    studentId: `std-gen-${index}`,
    submissionDate: subDate,
    lastUpdated: `2026-09-0${(index % 3) + 1}`,
    status,
    riskLevel,
    verificationStatus,
    score,
    scoringBreakdown,
    specialCategories,
    rank: index <= 50 ? index : undefined,
    waitlistPosition: status === "Waitlisted" ? (index % 25) + 1 : undefined,
    personalDetails: {
      id: `std-gen-${index}`,
      fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`,
      mobile: `${9800000000 + (index * 47312) % 900000000}`,
      dob: `200${4 + (index % 3)}-0${(index % 9) + 1}-${String((index % 25) + 1).padStart(2, "0")}`,
      gender: isGirlStudent ? "Female" : "Male",
      religion: i % 3 === 0 ? "Islam" : i % 3 === 1 ? "Hinduism" : "Sikhism",
      category: i % 4 === 0 ? "OBC" : i % 6 === 0 ? "SC" : i % 8 === 0 ? "EWS" : "General",
      aadhaarMasked: `XXXX-XXXX-${String(1000 + (index * 17) % 9000)}`,
      panCardNumber: `ABCDE${String(1000 + index).slice(0, 4)}Z`,
      address: `House ${index * 4}, Sector ${(index % 12) + 1}, Main Colony`,
      city: inst.state === "Delhi" ? "New Delhi" : "Lucknow",
      district: inst.state === "Delhi" ? "Central Delhi" : "Lucknow",
      state: inst.state,
      pincode: `${110000 + (index * 53) % 800000}`
    },
    academicDetails: {
      institution: inst.name,
      institutionType: inst.type,
      boardOrUniversity: inst.name,
      course: sch.cat,
      degree: sch.cat,
      yearOfStudy: `${(index % 3) + 1}st Year`,
      rollNumber: `ENR2024-${String(index).padStart(4, "0")}`,
      examinationPassed: "Previous Annual Examination",
      yearOfPassing: "2024",
      markType: "Percentage",
      previousMarks,
      percentageNumeric
    },
    familyDetails: {
      fatherName: `MR. R. ${lastName}`,
      fatherOccupation: isOrphan ? "Deceased" : index % 3 === 0 ? "Daily Wage Artisan" : "Teacher",
      motherName: `MRS. S. ${lastName}`,
      motherOccupation: isSingleParentOrWidow ? "Single Parent" : "Homemaker",
      incomeBracket,
      annualFamilyIncome: incomeBracket,
      incomeNumeric: 150000 + (index * 20000) % 500000,
      familySize: 4,
      isFirstGenerationGraduate: index % 2 === 0
    },
    bankDetails: {
      bankName: "State Bank of India",
      accountHolderName: fullName,
      accountNumber: `4091827361${String(index).padStart(4, "0")}`,
      ifscCode: "SBIN0001824",
      branchName: "Main Branch"
    },
    scholarshipAnswers: {
      careerGoals: "Pursue excellence in vocational or professional academic discipline.",
      financialNeedStatement: "Assistance to cover semester fees, books, and educational materials."
    },
    documents: [
      {
        id: `doc-${index}-1`,
        type: "Identity Proof",
        name: "Aadhaar Card",
        required: true,
        status: "Verified",
        fileName: `${firstName}_Aadhaar.pdf`,
        fileSize: "1.2 MB",
        uploadDate: subDate,
        aiConfidence: 95 + (index % 5)
      },
      {
        id: `doc-${index}-2`,
        type: "Marksheet",
        name: "Marksheet",
        required: true,
        status: status === "Correction Required" ? "Needs Correction" : "Verified",
        fileName: `${firstName}_Marksheet.pdf`,
        fileSize: "1.0 MB",
        uploadDate: subDate,
        aiConfidence: 94
      }
    ],
    timeline: [
      {
        title: "Application Submitted",
        description: `Scored ${score}/100 under 100-mark IICC evaluation.`,
        timestamp: `${subDate}, 11:00 AM`,
        completed: true
      },
      {
        title: "Current Status",
        description: `Application is currently in ${status} status.`,
        timestamp: "03 Sep 2026",
        completed: true,
        current: true
      }
    ],
    aiFindings: riskLevel === "High" ? [
      {
        flag: "Income certificate verification discrepancy",
        confidence: 86,
        severity: "High",
        recommendation: "Manual verification of revenue authority seal required.",
        status: "Pending Review"
      }
    ] : undefined
  };
});

export const MOCK_APPLICATIONS: Application[] = [
  ...baseApplications,
  ...GENERATED_MOCK_APPLICATIONS
];
