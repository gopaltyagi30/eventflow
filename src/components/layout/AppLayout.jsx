
import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d0c10]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64 min-h-screen flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 min-w-0 p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AppLayout;
