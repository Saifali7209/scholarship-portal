import { NotificationItem } from "../types/scholarship";

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Application Draft Saved",
    message: "Your application for National Merit STEM Fellowship has been saved in draft state.",
    timestamp: "02 Sep 2026, 10:30 AM",
    read: false,
    type: "info",
    targetRole: "student",
    link: "/student/application"
  },
  {
    id: "notif-2",
    title: "Document Verification Progress",
    message: "Aadhaar Card and Marksheet have been successfully matched via automated verification.",
    timestamp: "02 Sep 2026, 10:45 AM",
    read: false,
    type: "success",
    targetRole: "student",
    link: "/student/application/documents"
  },
  {
    id: "notif-3",
    title: "Provisional Shortlist Announced",
    message: "The 2026 provisional shortlist has been released. Check your application status.",
    timestamp: "01 Sep 2026, 03:00 PM",
    read: true,
    type: "info",
    targetRole: "student",
    link: "/student/status"
  },
  {
    id: "notif-admin-1",
    title: "High Risk Document Flagged",
    message: "Income Certificate for Application SCH-2026-000781 has been flagged with mismatched validity year.",
    timestamp: "03 Sep 2026, 09:12 AM",
    read: false,
    type: "warning",
    targetRole: "admin",
    link: "/admin/verification"
  },
  {
    id: "notif-admin-2",
    title: "Final Verification Queue Pending",
    message: "14 shortlisted students have completed their Video KYC sessions and are awaiting admin sign-off.",
    timestamp: "03 Sep 2026, 11:30 AM",
    read: false,
    type: "info",
    targetRole: "admin",
    link: "/admin/final-verification"
  },
  {
    id: "notif-admin-3",
    title: "Disbursement Batch Prepared",
    message: "PFMS disbursement file generated for 48 approved awardees.",
    timestamp: "02 Sep 2026, 06:00 PM",
    read: true,
    type: "success",
    targetRole: "admin",
    link: "/admin/reports"
  }
];
