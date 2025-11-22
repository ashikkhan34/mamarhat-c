"use client";

import Sidebar from "./dashboardComponent/Sidebar/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
