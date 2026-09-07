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

export const MOCK_FINAL_VERIFICATIONS: FinalVerificationQueueItem[] = [
  {
    id: "fvk-1",
    applicationNumber: "SCH-2026-000412",
    studentName: "Priya Sharma",
    rank: 18,
    kycStatus: "Pending",
    identityStatus: "Verified",
    documentStatus: "Verified",
    livenessScore: 0,
    faceMatchScore: 0,
    riskLevel: "Low",
    timestamp: "2026-09-03 14:00"
  },
  {
    id: "fvk-2",
    applicationNumber: "SCH-2026-000109",
    studentName: "Ananya Patel",
    rank: 4,
    kycStatus: "Completed",
    identityStatus: "Verified",
    documentStatus: "Verified",
    livenessScore: 99.4,
    faceMatchScore: 98.8,
    riskLevel: "Low",
    timestamp: "2026-09-01 11:30",
    notes: "High quality session. Real-time blink & head turn passed smoothly."
  },
  {
    id: "fvk-3",
    applicationNumber: "SCH-2026-000301",
    studentName: "Rohan Kulkarni",
    rank: 42,
    kycStatus: "In Review",
    identityStatus: "Flagged",
    documentStatus: "Verified",
    livenessScore: 78.5,
    faceMatchScore: 81.2,
    riskLevel: "Medium",
    timestamp: "2026-09-02 16:45",
    notes: "Poor lighting during camera capture caused low contrast on ID card."
  },
  {
    id: "fvk-4",
    applicationNumber: "SCH-2026-000289",
    studentName: "Sunil Meena",
    rank: 64,
    kycStatus: "Failed",
    identityStatus: "Flagged",
    documentStatus: "Flagged",
    livenessScore: 42.1,
    faceMatchScore: 51.0,
    riskLevel: "High",
    timestamp: "2026-09-02 10:15",
    notes: "Face liveness test failed. Multiple faces detected in video frame."
  }
];
