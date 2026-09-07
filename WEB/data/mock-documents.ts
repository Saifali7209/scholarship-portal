export interface OcrComparisonItem {
  id: string;
  applicationNumber: string;
  studentName: string;
  documentType: string;
  documentFileName: string;
  fileSize: string;
  submittedOn: string;
  overallMatch: "MATCH" | "MISMATCH" | "FLAGGED";
  aiConfidence: number;
  riskLevel: "Low" | "Medium" | "High";
  fields: {
    fieldName: string;
    applicationValue: string;
    ocrExtractedValue: string;
    isMatch: boolean;
  }[];
  aiObservation: string;
  recommendation: string;
  status: "Pending" | "Verified" | "Needs Correction" | "Rejected";
}

export const MOCK_OCR_DOCUMENTS: OcrComparisonItem[] = [
  {
    id: "ocr-1",
    applicationNumber: "SCH-2026-001024",
    studentName: "Mohd Zama",
    documentType: "Aadhaar Card",
    documentFileName: "Aadhaar_Card_Masked.pdf",
    fileSize: "1.2 MB",
    submittedOn: "2026-09-02",
    overallMatch: "MATCH",
    aiConfidence: 98,
    riskLevel: "Low",
    fields: [
      {
        fieldName: "Full Name",
        applicationValue: "Mohd Zama",
        ocrExtractedValue: "Mohd Zama",
        isMatch: true
      },
      {
        fieldName: "Date of Birth",
        applicationValue: "14/04/2005",
        ocrExtractedValue: "14/04/2005",
        isMatch: true
      },
      {
        fieldName: "Gender",
        applicationValue: "Male",
        ocrExtractedValue: "Male",
        isMatch: true
      },
      {
        fieldName: "Aadhaar Masked No.",
        applicationValue: "XXXX-XXXX-4921",
        ocrExtractedValue: "XXXX-XXXX-4921",
        isMatch: true
      }
    ],
    aiObservation: "High confidence text extraction. UIDAI digital signature badge detected.",
    recommendation: "Ready for automatic verification.",
    status: "Verified"
  },
  {
    id: "ocr-2",
    applicationNumber: "SCH-2026-000412",
    studentName: "Priya Sharma",
    documentType: "Degree Grade Card",
    documentFileName: "GradeCard_Sem4.pdf",
    fileSize: "2.1 MB",
    submittedOn: "2026-08-28",
    overallMatch: "MATCH",
    aiConfidence: 97,
    riskLevel: "Low",
    fields: [
      {
        fieldName: "Student Name",
        applicationValue: "Priya Sharma",
        ocrExtractedValue: "Priya Sharma",
        isMatch: true
      },
      {
        fieldName: "Institution",
        applicationValue: "NIT Surathkal",
        ocrExtractedValue: "National Institute of Technology Karnataka, Surathkal",
        isMatch: true
      },
      {
        fieldName: "Cumulative CGPA",
        applicationValue: "9.65",
        ocrExtractedValue: "9.65 / 10.00",
        isMatch: true
      },
      {
        fieldName: "Result Status",
        applicationValue: "First Class",
        ocrExtractedValue: "First Class with Distinction",
        isMatch: true
      }
    ],
    aiObservation: "Official digital watermarked transcript from university examination portal.",
    recommendation: "Approved for academic verification.",
    status: "Verified"
  },
  {
    id: "ocr-3",
    applicationNumber: "SCH-2026-000781",
    studentName: "Vikram Singh",
    documentType: "Income Certificate",
    documentFileName: "Income_Cert_Expired.pdf",
    fileSize: "1.4 MB",
    submittedOn: "2026-08-20",
    overallMatch: "MISMATCH",
    aiConfidence: 76,
    riskLevel: "High",
    fields: [
      {
        fieldName: "Father's Name",
        applicationValue: "Mahendra Singh",
        ocrExtractedValue: "Mahendra Singh",
        isMatch: true
      },
      {
        fieldName: "Valid Financial Year",
        applicationValue: "2025-2026",
        ocrExtractedValue: "2022-2023",
        isMatch: false
      },
      {
        fieldName: "Annual Income",
        applicationValue: "₹3,10,000",
        ocrExtractedValue: "₹2,80,000",
        isMatch: false
      }
    ],
    aiObservation: "Document validity expired. Certificate timestamp belongs to prior assessment year.",
    recommendation: "Request student to upload updated Revenue Department certificate.",
    status: "Needs Correction"
  },
  {
    id: "ocr-4",
    applicationNumber: "SCH-2026-000845",
    studentName: "Aditya Kumar",
    documentType: "Class 12 Marksheet",
    documentFileName: "Aditya_12th_Scan.jpg",
    fileSize: "0.8 MB",
    submittedOn: "2026-08-29",
    overallMatch: "FLAGGED",
    aiConfidence: 68,
    riskLevel: "Medium",
    fields: [
      {
        fieldName: "Candidate Name",
        applicationValue: "Aditya Kumar",
        ocrExtractedValue: "Aditya Kumaar",
        isMatch: false
      },
      {
        fieldName: "Marks Declared",
        applicationValue: "92.4%",
        ocrExtractedValue: "88.6%",
        isMatch: false
      }
    ],
    aiObservation: "Minor character mismatch in surname spelling and discrepancy in calculated percentage.",
    recommendation: "Manual administrative review required before decision.",
    status: "Pending"
  }
];
