
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ProfileDropdown from "../navbar/ProfileDropdown";

import {
  Bell,
  Sun,
  Moon,
  CircleHelp,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("eventflow-theme");
    return savedTheme === "light" ? "light" : "dark";
  });

  // Role state
  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem("eventflow-role") || "organizer";
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("eventflow-theme", theme);
  }, [theme]);

  // Save selected role
  useEffect(() => {
    localStorage.setItem("eventflow-role", activeRole);
  }, [activeRole]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Switch role
  const handleRoleChange = (role) => {
    setActiveRole(role);
  };

  const isDark = theme === "dark";

  // Page names based on current route
  const pageNames = {
    "/": "Dashboard",
    "/main": "Dashboard",
    "/main/discover": "Discover Events",
    "/discover": "Discover Events",
    "/my-events": "My Events",
    "/main/my-events": "My Events",
    "/main/manage-events": "Manage Events",
    "/main/create": "Create Event",
    "/main/analytics": "Analytics",
    "/settings": "Settings",
    "/main/settings": "Settings",
    "/help": "Help & Documentation",
    "/main/help": "Help & Documentation",
  };

  const currentPage =
    pageNames[location.pathname] || "Event Details";

  return (
    <header
      className={`sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b px-6 transition-colors duration-200 ${
        isDark
          ? "border-[#302c3a] bg-[#111015] text-white"
          : "border-gray-200 bg-white text-gray-800"
      }`}
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-3">
        <span
          className={`hidden text-sm sm:block ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Overview
        </span>

        <span
          className={`hidden sm:block ${
            isDark ? "text-gray-600" : "text-gray-300"
          }`}
        >
          /
        </span>

        <span className="text-sm font-semibold">
          {currentPage}
        </span>
      </div>

      {/* Right: Navbar Actions */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Theme Toggle
        <button
          type="button"
          onClick={toggleTheme}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
            isDark
              ? "text-gray-400 hover:bg-[#211e2b] hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {isDark ? <Sun size={19} /> : <Moon size={19} />}
        </button> */}

        {/* About EventFlow Tooltip */}
        <div className="group relative">
          <button
            type="button"
            aria-label="About EventFlow"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
              isDark
                ? "text-gray-400 hover:bg-[#211e2b] hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <CircleHelp size={19} />
          </button>

          <div
            className={`invisible absolute right-0 top-12 z-50 w-72 translate-y-2 rounded-xl border p-4 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
              isDark
                ? "border-[#302c3a] bg-[#18161f] text-gray-300"
                : "border-gray-200 bg-white text-gray-600"
            }`}
          >
            <h3
              className={`mb-2 text-sm font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              About EventFlow
            </h3>

            <p className="text-xs leading-5">
              EventFlow is a personal frontend development
              project built with React. It is currently a
              demonstration platform and is not an official
              event-management service. Some features use
              demo data and may not provide real-world
              functionality.
            </p>

            <div
              className={`mt-3 border-t pt-3 text-[11px] leading-5 ${
                isDark
                  ? "border-[#302c3a] text-gray-500"
                  : "border-gray-200 text-gray-400"
              }`}
            >
              <p>Built for learning and demonstration.</p>
              <p>Made by Gopal Tyagi</p>
            </div>
          </div>
        </div>

        {/* Role Switcher */}
        <div
          className={`hidden items-center gap-1 rounded-xl p-1 sm:flex ${
            isDark ? "bg-[#211e2b]" : "bg-gray-100"
          }`}
        >
          {/* Organizer */}
          <button
            type="button"
            onClick={() => handleRoleChange("organizer")}
            aria-pressed={activeRole === "organizer"}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              activeRole === "organizer"
                ? "bg-violet-600 text-white shadow"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Organizer
          </button>

          {/* Attendee */}
          <button
            type="button"
            onClick={() => handleRoleChange("attendee")}
            aria-pressed={activeRole === "attendee"}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              activeRole === "attendee"
                ? "bg-violet-600 text-white shadow"
                : isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Attendee
          </button>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
            isDark
              ? "text-gray-400 hover:bg-[#211e2b] hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-[#111015] bg-violet-500"></span>
        </button>

        {/* Profile Dropdown */}
        <div
          className={`ml-1 border-l pl-3 ${
            isDark ? "border-[#302c3a]" : "border-gray-200"
          }`}
        >
          <ProfileDropdown />
        </div>

      </div>
    </header>
  );
};

export default Navbar;
