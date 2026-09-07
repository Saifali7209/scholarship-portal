import { AuditLog } from "../types/scholarship";

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-1",
    timestamp: "2026-09-04 11:15:20",
    adminName: "Dr. Rajeshwar Rao (Super Admin)",
    adminEmail: "admin@scholarship.demo",
    action: "Final Approval Granted",
    applicationNumber: "SCH-2026-000109",
    studentName: "Ananya Patel",
    previousStatus: "Final Verification",
    newStatus: "Approved",
    reason: "Passed all biometric liveness checks and bank account validation."
  },
  {
    id: "aud-2",
    timestamp: "2026-09-03 16:40:12",
    adminName: "Sneha Mukherjee (Review Officer)",
    adminEmail: "sneha.m@scholarship.demo",
    action: "Requested Correction",
    applicationNumber: "SCH-2026-000781",
    studentName: "Vikram Singh",
    previousStatus: "Under Review",
    newStatus: "Correction Required",
    reason: "Uploaded Income Certificate validity expired in 2023."
  },
  {
    id: "aud-3",
    timestamp: "2026-09-03 14:10:05",
    adminName: "Sneha Mukherjee (Review Officer)",
    adminEmail: "sneha.m@scholarship.demo",
    action: "Provisional Shortlist Assigned",
    applicationNumber: "SCH-2026-000412",
    studentName: "Priya Sharma",
    previousStatus: "Under Review",
    newStatus: "Shortlisted",
    reason: "Merit score 96.8 ranked #18 in Women in Tech category."
  },
  {
    id: "aud-4",
    timestamp: "2026-09-02 17:22:45",
    adminName: "Amitabh Sen (Verification Officer)",
    adminEmail: "amitabh.s@scholarship.demo",
    action: "Candidate Placed on Waitlist",
    applicationNumber: "SCH-2026-000589",
    studentName: "Rahul Verma",
    previousStatus: "Under Review",
    newStatus: "Waitlisted",
    reason: "Composite score 88.2 placed at rank #132 (Waitlist Position #12)."
  },
  {
    id: "aud-5",
    timestamp: "2026-09-02 10:30:19",
    adminName: "Dr. Rajeshwar Rao (Super Admin)",
    adminEmail: "admin@scholarship.demo",
    action: "Candidate Promoted from Waitlist",
    applicationNumber: "SCH-2026-000214",
    studentName: "Meenakshi Sundaram",
    previousStatus: "Waitlisted",
    newStatus: "Final Verification",
    reason: "Promoted to replace candidate who opted out of the award."
  },
  {
    id: "aud-6",
    timestamp: "2026-09-01 14:05:30",
    adminName: "Amitabh Sen (Verification Officer)",
    adminEmail: "amitabh.s@scholarship.demo",
    action: "AI Finding Overridden",
    applicationNumber: "SCH-2026-000845",
    studentName: "Aditya Kumar",
    previousStatus: "Flagged",
    newStatus: "Under Review",
    reason: "Spelling difference in 12th marksheet confirmed as minor transliteration variation."
  }
];
