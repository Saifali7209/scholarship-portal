"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Application,
  ApplicationStatus,
  AuditLog,
  DocumentItem,
  NotificationItem,
  RiskLevel,
  VerificationStatus,
  calculateIiccScore
} from "../types/scholarship";
import { PRESET_PERSONAS } from "../data/mock-students";
import { MOCK_APPLICATIONS } from "../data/mock-applications";
import { MOCK_NOTIFICATIONS } from "../data/mock-notifications";
import { MOCK_AUDIT_LOGS } from "../data/mock-audit";

interface AppContextType {
  role: "guest" | "student" | "admin";
  activePersonaKey: string;
  studentApplication: Application;
  allApplications: Application[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  switchPersona: (personaKey: string) => void;
  saveDraft: (updatedData: Partial<Application>) => void;
  submitApplication: () => string;
  uploadDocumentMock: (docId: string, fileName: string, fileSize: string) => void;
  completeVideoKyc: (passed: boolean) => void;
  updateApplicationStatus: (
    appId: string,
    newStatus: ApplicationStatus,
    reason: string
  ) => void;
  promoteWaitlistCandidate: (appId: string) => void;
  markNotificationAsRead: (id: string) => void;
  loginAs: (role: "student" | "admin", personaKey?: string) => void;
  logout: () => void;
  resetDemoData: () => void;
  adminSidebarCollapsed: boolean;
  toggleAdminSidebar: () => void;
  setAdminSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: "sch_demo_role",
  PERSONA: "sch_demo_persona",
  STUDENT_APP: "sch_demo_student_app",
  ALL_APPS: "sch_demo_all_apps",
  NOTIFS: "sch_demo_notifs",
  AUDIT: "sch_demo_audit",
  ADMIN_SIDEBAR_COLLAPSED: "sch_demo_admin_sidebar_collapsed"
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<"guest" | "student" | "admin">("guest");
  const [activePersonaKey, setActivePersonaKey] = useState<string>("draft");
  const [studentApplication, setStudentApplication] = useState<Application>(
    PRESET_PERSONAS.draft
  );
  const [allApplications, setAllApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [adminSidebarCollapsed, setAdminSidebarCollapsed] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      const savedPersona = localStorage.getItem(STORAGE_KEYS.PERSONA);
      const savedStudentApp = localStorage.getItem(STORAGE_KEYS.STUDENT_APP);
      const savedAllApps = localStorage.getItem(STORAGE_KEYS.ALL_APPS);
      const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFS);
      const savedAudit = localStorage.getItem(STORAGE_KEYS.AUDIT);

      if (savedRole) setRole(savedRole as any);
      if (savedPersona && PRESET_PERSONAS[savedPersona]) {
        setActivePersonaKey(savedPersona);
      }
      if (savedStudentApp) {
        setStudentApplication(JSON.parse(savedStudentApp));
      } else if (savedPersona && PRESET_PERSONAS[savedPersona]) {
        setStudentApplication(PRESET_PERSONAS[savedPersona]);
      }
      if (savedAllApps) {
        setAllApplications(JSON.parse(savedAllApps));
      }
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      }
      if (savedAudit) {
        setAuditLogs(JSON.parse(savedAudit));
      }
      const savedSidebar = localStorage.getItem(STORAGE_KEYS.ADMIN_SIDEBAR_COLLAPSED);
      if (savedSidebar !== null) {
        setAdminSidebarCollapsed(savedSidebar === "true");
      }
    } catch (e) {
      console.error("Failed to read localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when updated
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, role);
      localStorage.setItem(STORAGE_KEYS.PERSONA, activePersonaKey);
      localStorage.setItem(STORAGE_KEYS.STUDENT_APP, JSON.stringify(studentApplication));
      localStorage.setItem(STORAGE_KEYS.ALL_APPS, JSON.stringify(allApplications));
      localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
      localStorage.setItem(STORAGE_KEYS.ADMIN_SIDEBAR_COLLAPSED, String(adminSidebarCollapsed));
    } catch (e) {
      console.error("Failed to write localStorage:", e);
    }
  }, [role, activePersonaKey, studentApplication, allApplications, notifications, auditLogs, adminSidebarCollapsed, isLoaded]);

  const switchPersona = (personaKey: string) => {
    if (PRESET_PERSONAS[personaKey]) {
      setActivePersonaKey(personaKey);
      setStudentApplication(PRESET_PERSONAS[personaKey]);
      setRole("student");
    }
  };

  const saveDraft = (updatedData: Partial<Application>) => {
    setStudentApplication((prev) => {
      const merged = {
        ...prev,
        ...updatedData,
        lastUpdated: new Date().toISOString().split("T")[0]
      };

      // Recalculate 100-mark IICC score dynamically
      const pct = merged.academicDetails?.percentageNumeric || 80;
      const inc = merged.familyDetails?.incomeBracket || "Rs.2,50,001 - Rs.3,50,000";
      const spec = merged.specialCategories || {
        isGirlStudent: false,
        isOrphan: false,
        isSingleParentOrWidow: false,
        isStudentWithDisability: false,
        isChildOfIiccEmployee: false
      };

      const breakdown = calculateIiccScore(pct, inc, spec);
      merged.scoringBreakdown = breakdown;
      merged.score = breakdown.totalScore;

      return merged;
    });
  };

  const submitApplication = (): string => {
    const randomAppNo = `IICC-2026-${String(Math.floor(100000 + Math.random() * 900000)).slice(0, 6)}`;
    const nowStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const submittedApp: Application = {
      ...studentApplication,
      applicationNumber: randomAppNo,
      status: "Submitted",
      submissionDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      timeline: [
        {
          title: "Application Submitted",
          description: `Official application submitted with registration number ${randomAppNo}.`,
          timestamp: `${nowStr}, ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`,
          completed: true,
          current: true
        },
        {
          title: "Document Verification",
          description: "Institutional and OCR authenticity verification.",
          timestamp: "In Progress",
          completed: false
        },
        {
          title: "Shortlist Announcement",
          description: "Announcement of provisional merit selections.",
          timestamp: "Pending",
          completed: false
        },
        {
          title: "Final Video KYC Verification",
          description: "Biometric and live photo confirmation.",
          timestamp: "Pending",
          completed: false
        }
      ]
    };

    setStudentApplication(submittedApp);

    // Update in all applications list
    setAllApplications((prev) => [submittedApp, ...prev.filter((a) => a.id !== submittedApp.id)]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Application Submitted Successfully",
      message: `Your application ${randomAppNo} has been registered and is queued for verification.`,
      timestamp: "Just now",
      read: false,
      type: "success",
      targetRole: "student",
      link: "/student/status"
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return randomAppNo;
  };

  const uploadDocumentMock = (docId: string, fileName: string, fileSize: string) => {
    setStudentApplication((prev) => {
      const updatedDocs = prev.documents.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: "Uploaded" as const,
            fileName,
            fileSize,
            uploadDate: new Date().toISOString().split("T")[0],
            aiConfidence: 96
          };
        }
        return doc;
      });
      return { ...prev, documents: updatedDocs };
    });
  };

  const completeVideoKyc = (passed: boolean) => {
    setStudentApplication((prev) => {
      const updated: Application = {
        ...prev,
        verificationStatus: passed ? "Passed" : "Manual Review",
        status: passed ? "Approved" : "Under Review",
        timeline: prev.timeline.map((t) => {
          if (t.title.includes("Video KYC")) {
            return {
              ...t,
              completed: true,
              current: false,
              description: passed
                ? "Biometric liveness (99.2%) and identity verified successfully."
                : "Submitted for manual verification review."
            };
          }
          return t;
        })
      };

      if (passed) {
        updated.timeline.push({
          title: "Scholarship Award Approved",
          description: "Award letter generated and bank disbursement queued.",
          timestamp: "Just now",
          completed: true,
          current: true
        });
      }

      return updated;
    });

    // Add audit log
    const audit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      adminName: "Automated Video KYC Service",
      adminEmail: "kyc-system@scholarship.demo",
      action: passed ? "Biometric KYC Verified" : "KYC Flagged for Manual Review",
      applicationNumber: studentApplication.applicationNumber,
      studentName: studentApplication.personalDetails.fullName,
      previousStatus: studentApplication.status,
      newStatus: passed ? "Approved" : "Under Review",
      reason: passed
        ? "Facial recognition match 99.2% with Aadhaar photo."
        : "Low light environment required manual officer check."
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const updateApplicationStatus = (
    appId: string,
    newStatus: ApplicationStatus,
    reason: string
  ) => {
    let targetApp: Application | undefined;

    setAllApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          targetApp = app;
          return {
            ...app,
            status: newStatus,
            lastUpdated: new Date().toISOString().split("T")[0]
          };
        }
        return app;
      })
    );

    // If active student app is updated
    if (studentApplication.id === appId) {
      setStudentApplication((prev) => ({
        ...prev,
        status: newStatus,
        lastUpdated: new Date().toISOString().split("T")[0]
      }));
    }

    // Add audit log
    const audit: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      adminName: "Dr. Rajeshwar Rao (Super Admin)",
      adminEmail: "admin@scholarship.demo",
      action: `Status Updated to ${newStatus}`,
      applicationNumber: targetApp?.applicationNumber || appId,
      studentName: targetApp?.personalDetails.fullName || "Applicant",
      previousStatus: targetApp?.status || "Unknown",
      newStatus,
      reason
    };
    setAuditLogs((prev) => [audit, ...prev]);
  };

  const promoteWaitlistCandidate = (appId: string) => {
    updateApplicationStatus(
      appId,
      "Final Verification",
      "Promoted from waiting list to fill unfulfilled shortlisted vacancy."
    );

    // If waitlisted persona is active, update
    if (activePersonaKey === "waitlisted") {
      setStudentApplication((prev) => ({
        ...prev,
        status: "Final Verification",
        waitlistPosition: undefined
      }));
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const loginAs = (userRole: "student" | "admin", personaKey: string = "draft") => {
    setRole(userRole);
    if (userRole === "student") {
      switchPersona(personaKey);
    }
  };

  const logout = () => {
    setRole("guest");
  };

  const resetDemoData = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    setRole("guest");
    setActivePersonaKey("draft");
    setStudentApplication(PRESET_PERSONAS.draft);
    setAllApplications(MOCK_APPLICATIONS);
    setNotifications(MOCK_NOTIFICATIONS);
    setAuditLogs(MOCK_AUDIT_LOGS);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        activePersonaKey,
        studentApplication,
        allApplications,
        notifications,
        auditLogs,
        switchPersona,
        saveDraft,
        submitApplication,
        uploadDocumentMock,
        completeVideoKyc,
        updateApplicationStatus,
        promoteWaitlistCandidate,
        markNotificationAsRead,
        loginAs,
        logout,
        resetDemoData,
        adminSidebarCollapsed,
        toggleAdminSidebar: () => setAdminSidebarCollapsed((prev) => !prev),
        setAdminSidebarCollapsed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
