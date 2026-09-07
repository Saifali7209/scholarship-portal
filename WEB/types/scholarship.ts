export type ApplicationStatus =
  | "Draft"
  | "Submitted"
  | "Under Review"
  | "Correction Required"
  | "Shortlisted"
  | "Waitlisted"
  | "Final Verification"
  | "Approved"
  | "Rejected";

export type DocumentStatus =
  | "Not Uploaded"
  | "Uploaded"
  | "Processing"
  | "Verified"
  | "Needs Correction"
  | "Rejected";

export type RiskLevel = "Low" | "Medium" | "High";

export type VerificationStatus =
  | "Pending"
  | "In Progress"
  | "Passed"
  | "Failed"
  | "Manual Review";

export type IiccCategory =
  | "School Level (Class IX – X)"
  | "Senior Secondary (Class XI – XII)"
  | "Diploma"
  | "Undergraduate Professional Course"
  | "Postgraduate Professional Course";

export type IncomeBracket =
  | "Up to Rs.1,50,000"
  | "Rs.1,50,001 - Rs.2,50,000"
  | "Rs.2,50,001 - Rs.3,50,000"
  | "Rs.3,50,001 - Rs.4,50,000"
  | "Rs.4,50,001 to Rs.5,50,000"
  | "Rs.5,50,001 to Rs.6,50,000"
  | "Rs.6,50,001 to Rs.8,00,000"
  | "Above Rs.8,00,000";

export interface Scholarship {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  educationLevel: string;
  amount: string;
  amountNumeric: number;
  totalAwards: number;
  reservedForIiccStaff: number;
  deadline: string;
  location: string;
  status: "Open" | "Closing Soon" | "Closed";
  eligibilitySummary: string;
  overview: string;
  benefits: string[];
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  selectionProcess: string[];
  verificationProcess: string[];
  faqs: { question: string; answer: string }[];
}

export interface SpecialCategorySelections {
  isGirlStudent: boolean; // +2 marks
  isOrphan: boolean; // +5 marks
  isSingleParentOrWidow: boolean; // +4 marks
  isStudentWithDisability: boolean; // +3 marks
  isChildOfIiccEmployee: boolean; // Reserved quota
}

export interface ScoringBreakdown {
  academicMarks: number; // Max 60
  incomeMarks: number; // Max 35
  specialCategoryMarks: number; // Max 5 (capped)
  totalScore: number; // Max 100
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  religion: string;
  category: "General" | "OBC" | "SC" | "ST" | "EWS";
  aadhaarMasked: string;
  panCardNumber?: string;
  address: string;
  currentAddress?: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  photoUrl?: string;
}

export interface AcademicDetails {
  institution: string;
  institutionType: "School" | "College" | "Central University" | "State University" | "IIT/NIT" | "Private College" | "Affiliated College";
  boardOrUniversity: string;
  course: string;
  degree: string;
  yearOfStudy: string;
  rollNumber: string;
  examinationPassed: string;
  yearOfPassing: string;
  markType: "Percentage" | "CGPA";
  marksObtained?: string;
  totalMarks?: string;
  previousMarks: string; // Percentage value as string e.g. "88.5%"
  percentageNumeric: number;
  cgpa?: string;
  convertedPercentage?: string;
  previousScholarships?: {
    availed: boolean;
    organizationName?: string;
    yearOfAward?: string;
  };
}

export interface FamilyDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  incomeBracket: IncomeBracket;
  annualFamilyIncome: string;
  incomeNumeric: number;
  familySize: number;
  isFirstGenerationGraduate?: boolean;
}

export interface BankDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
}

export interface DocumentItem {
  id: string;
  type: string;
  name: string;
  required: boolean;
  status: DocumentStatus;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
  ocrExtracted?: Record<string, string>;
  aiConfidence?: number;
  remarks?: string;
}

export interface Application {
  id: string;
  applicationNumber: string;
  scholarshipId: string;
  scholarshipName: string;
  studentId: string;
  submissionDate?: string;
  lastUpdated: string;
  status: ApplicationStatus;
  riskLevel: RiskLevel;
  verificationStatus: VerificationStatus;
  score: number;
  scoringBreakdown: ScoringBreakdown;
  specialCategories: SpecialCategorySelections;
  rank?: number;
  waitlistPosition?: number;
  personalDetails: StudentProfile;
  academicDetails: AcademicDetails;
  familyDetails: FamilyDetails;
  bankDetails: BankDetails;
  scholarshipAnswers: Record<string, string>;
  documents: DocumentItem[];
  timeline: {
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
  aiFindings?: {
    flag: string;
    confidence: number;
    severity: "Low" | "Medium" | "High";
    recommendation: string;
    status: "Pending Review" | "Accepted" | "Overridden";
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  targetRole: "student" | "admin";
  link?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  adminEmail: string;
  action: string;
  applicationNumber: string;
  studentName: string;
  previousStatus: string;
  newStatus: string;
  reason: string;
}

export interface FinalVerificationQueueItem {
  id: string;
  applicationNumber: string;
  studentName: string;
  rank: number;
  kycStatus: "Completed" | "Pending" | "In Review" | "Failed";
  identityStatus: "Verified" | "Pending" | "Flagged";
  documentStatus: "Verified" | "Pending" | "Correction" | "Flagged";
  livenessScore: number;
  faceMatchScore: number;
  riskLevel: "Low" | "Medium" | "High";
  timestamp: string;
  notes?: string;
}

/**
 * Official IICC 100-Mark Scoring Engine
 * Section 4: Evaluation and Scoring System
 */
export function calculateIiccScore(
  percentage: number,
  incomeBracket: IncomeBracket | string,
  special: SpecialCategorySelections
): ScoringBreakdown {
  // 1. Academic Performance (Max 60 Marks)
  let academicMarks = 0;
  if (percentage >= 95) academicMarks = 60;
  else if (percentage >= 90) academicMarks = 55;
  else if (percentage >= 85) academicMarks = 50;
  else if (percentage >= 80) academicMarks = 45;
  else if (percentage >= 75) academicMarks = 40;
  else if (percentage >= 70) academicMarks = 35;
  else if (percentage >= 65) academicMarks = 30;
  else if (percentage >= 60) academicMarks = 25;
  else academicMarks = 0; // Below 60% ineligible

  // 2. Family Income (Max 35 Marks)
  let incomeMarks = 3;
  if (incomeBracket.includes("1,50,000") && !incomeBracket.includes("2,50,000")) incomeMarks = 35;
  else if (incomeBracket.includes("2,50,000")) incomeMarks = 30;
  else if (incomeBracket.includes("3,50,000")) incomeMarks = 25;
  else if (incomeBracket.includes("4,50,000")) incomeMarks = 20;
  else if (incomeBracket.includes("5,50,000")) incomeMarks = 15;
  else if (incomeBracket.includes("6,50,000")) incomeMarks = 10;
  else if (incomeBracket.includes("8,00,000") && !incomeBracket.includes("Above")) incomeMarks = 5;
  else incomeMarks = 3;

  // 3. Special Category (Max 5 Marks - Capped)
  let rawSpecial = 0;
  if (special.isOrphan) rawSpecial += 5;
  if (special.isSingleParentOrWidow) rawSpecial += 4;
  if (special.isStudentWithDisability) rawSpecial += 3;
  if (special.isGirlStudent) rawSpecial += 2;
  const specialCategoryMarks = Math.min(5, rawSpecial);

  const totalScore = academicMarks + incomeMarks + specialCategoryMarks;

  return {
    academicMarks,
    incomeMarks,
    specialCategoryMarks,
    totalScore
  };
}
