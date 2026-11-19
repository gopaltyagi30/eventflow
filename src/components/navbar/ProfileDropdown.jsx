
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  ChevronDown,
  UserRound,
  Settings,
  CircleHelp,
  LogOut,
} from "lucide-react";

import { logoutUser } from "../../features/auth/authSlice";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get logged-in user from Redux
  const user = useSelector((state) => state.auth.user);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Navigate and close dropdown
  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Logout user
  const handleLogout = () => {
    dispatch(logoutUser());

    setIsOpen(false);

    navigate("/", { replace: true });
  };

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Profile Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open profile menu"
        className={`flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-[var(--hover-bg)] ${
          isOpen ? "bg-[var(--hover-bg)]" : ""
        }`}
      >
        {/* User Details */}
        <div className="hidden text-right sm:block">
          <strong className="block text-sm font-semibold text-[var(--text-color)]">
            {user?.fullName || "User"}
          </strong>

          <span className="text-[10px] font-semibold tracking-wider text-[var(--muted-color)]">
            {user?.role?.toUpperCase() || "MEMBER"}
          </span>
        </div>

        {/* Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-white">
          <UserRound size={18} />
        </div>

        {/* Arrow */}
        <ChevronDown
          size={15}
          className={`text-[var(--muted-color)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-[200] mt-3 w-[280px] overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-2xl shadow-black/20"
        >

          {/* Profile Information */}
          <div className="p-4">
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
                <UserRound size={22} />
              </div>

              {/* User Details */}
              <div className="min-w-0 flex-1">
                <strong className="block truncate text-sm font-semibold text-[var(--text-color)]">
                  {user?.fullName || "User"}
                </strong>

                <span className="mt-1 block text-xs text-[var(--muted-color)]">
                  {user?.email || "No email available"}
                </span>
              </div>

              {/* Role Badge */}
              <span className="rounded-md bg-violet-500/10 px-2 py-1 text-[10px] font-bold tracking-wide text-violet-400">
                {user?.role?.toUpperCase() || "MEMBER"}
              </span>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)]" />

          {/* Menu Items */}
          <div className="p-2">

            {/* Settings */}
            <button
              onClick={() => handleNavigation("/main/settings")}
              role="menuitem"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted-color)] transition hover:bg-[var(--hover-bg)] hover:text-[var(--text-color)]"
            >
              <Settings size={17} />
              <span>Account Settings</span>
            </button>

            {/* Help */}
            <button
              onClick={() => handleNavigation("/main/help")}
              role="menuitem"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-[var(--muted-color)] transition hover:bg-[var(--hover-bg)] hover:text-[var(--text-color)]"
            >
              <CircleHelp size={17} />
              <span>Help & Documentation</span>
            </button>

          </div>

          <div className="border-t border-[var(--border-color)]" />

          {/* Sign Out */}
          <div className="p-2">
            <button
              onClick={handleLogout}
              role="menuitem"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={17} />
              <span>Sign Out</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
