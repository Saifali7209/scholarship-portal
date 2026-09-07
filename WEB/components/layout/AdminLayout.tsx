"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminNavbar } from "./AdminNavbar";
import { useApp } from "../../context/AppContext";

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminSidebarCollapsed, toggleAdminSidebar } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileOpen((prev) => !prev);
    } else {
      toggleAdminSidebar();
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex font-sans text-slate-900">
      {/* Sidebar for desktop & mobile */}
      <AdminSidebar
        isOpen={mobileOpen}
        isCollapsed={adminSidebarCollapsed}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={toggleAdminSidebar}
      />

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-35 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content Area with dynamic padding matching sidebar width */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[padding] duration-200 ease-in-out ${
          adminSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <AdminNavbar
          onToggleSidebar={handleToggle}
          isCollapsed={adminSidebarCollapsed}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
