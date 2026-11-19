
import React from "react";
import { NavLink } from "react-router";
import {
  Zap,
  LayoutDashboard,
  Compass,
  CalendarDays,
  ClipboardList,
  PlusCircle,
  ChartNoAxesColumnIncreasing,
  Settings,
  CircleHelp,
  Cloud
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/main",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Discover Events",
      path: "/main/discover",
      icon: Compass,
    },
    {
      name: "My Events",
      path: "/main/my-events",
      icon: CalendarDays,
    },
    {
      name: "Manage Events",
      path: "/main/manage-events",
      icon: ClipboardList,
    },
    {
      name: "Create Event",
      path: "/main/create",
      icon: PlusCircle,
    },
    {
      name: "Analytics",
      path: "/main/analytics",
      icon: ChartNoAxesColumnIncreasing,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
    transition-all duration-200 group
    ${
      isActive
        ? "bg-violet-600/15 text-violet-400 border border-violet-500/20"
        : "text-gray-400 hover:bg-[#211e2b] hover:text-white border border-transparent"
    }`;

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#302c3a] bg-[#111015] px-4 py-6 text-white">

      {/* Brand */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
          <Zap size={21} fill="currentColor" />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-wide">
            EventFlow
          </h2>
          <span className="text-[10px] font-semibold tracking-[2px] text-gray-500">
            ENTERPRISE
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-1 flex-col gap-2">
        <p className="mb-2 px-3 text-[10px] font-semibold tracking-[1.5px] text-gray-600">
          MAIN MENU
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={navLinkClass}
            >
              <Icon
                size={18}
                className="shrink-0"
              />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-2">

        <p className="mb-2 px-3 text-[10px] font-semibold tracking-[1.5px] text-gray-600">
          PREFERENCES
        </p>

        <NavLink to="/main/settings" className={navLinkClass}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/main/help" className={navLinkClass}>
          <CircleHelp size={18} />
          <span>Help & Documentation</span>
        </NavLink>

        {/* System Status */}
        <div className="mt-5 rounded-xl border border-[#302c3a] bg-[#18161f] p-4">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>

            <span className="text-[10px] font-semibold tracking-[1.5px] text-gray-500">
              SYSTEM STATUS
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Cloud size={15} className="text-green-400" />
            <span>Cluster Operational</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 border-t border-[#302c3a] pt-4 text-center">
          <p className="text-[10px] text-gray-600">
            EventFlow Dashboard v1.0
          </p>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
