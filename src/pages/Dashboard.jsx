
import { stats, weeklyData, registrations } from "../data/dashboardData";
import { Plus, Download, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import StatCard from "../components/dashboard/StatCard";
import UpcomingEvent from "../components/dashboard/UpcomingEvent";
import RecentRegistration from "../components/dashboard/RecentRegistration";
import WeeklyCharts from "../components/dashboard/WeeklyCharts";
import QuickActions from "../components/dashboard/QuickActions";
import ApprovalCard from "../components/dashboard/ApprovalCard";

import downloadEventReport from "../data/downloadEventReport";

// Get live date
const today = new Date();

const formattedDate = today
  .toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
  .toUpperCase();

const Dashboard = () => {
  // Get events from Redux
  const eventsFromStore = useSelector(
    (state) => state.events?.events
  );

  const events = Array.isArray(eventsFromStore)
    ? eventsFromStore
    : [];

  // Get logged-in user
  const user = useSelector(
    (state) => state.auth?.user
  );

  const navigate = useNavigate();

  // Get user's name
  const userName =
    user?.fullName ||
    user?.name ||
    user?.email?.split("@")[0] ||
    "User";

  // Dynamic greeting according to current time
  const currentHour = new Date().getHours();

  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return (
    <div className="w-full min-h-screen text-[#f5f3fa]">

      {/* Dashboard Header */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {greeting}, {userName}!{" "}
            <span className="text-purple-400">✦</span>
          </h1>

          <div className="flex items-center gap-2 mt-3 text-xs font-semibold tracking-wider text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            LIVE SYNC · {formattedDate}
          </div>

          <p className="text-sm text-gray-400 mt-3">
            Here's what's happening with your events today across the regional
            pipeline.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">

          <button
            title="Download Report"
            onClick={() => downloadEventReport(events)}
            className="w-11 h-11 flex items-center justify-center rounded-xl
            bg-[#18161f] border border-[#302c3a] text-gray-300
            hover:bg-[#25212f] hover:text-white transition"
          >
            <Download size={18} />
          </button>

          <button
            onClick={() => navigate("/main/create")}
            className="flex items-center justify-center gap-2 px-5 py-3
            rounded-xl bg-purple-600 hover:bg-purple-700
            text-white text-sm font-semibold transition shadow-lg shadow-purple-900/20"
          >
            <Plus size={17} />
            Create Event
          </button>

        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}

      </section>

      {/* Main Dashboard Content */}
      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)] gap-6">

        {/* Left Column */}
        <div className="min-w-0 space-y-7">

          {/* Upcoming Events */}
          <div>

            <div className="flex items-center justify-between gap-3 mb-5">

              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">
                  Upcoming Events
                </h3>

                <span className="text-[10px] font-bold tracking-wider
                px-2.5 py-1 rounded-full bg-green-500/10
                text-green-400 border border-green-500/20">
                  4 ACTIVE
                </span>
              </div>

              <button
                onClick={() => navigate("/main/discover")}
                className="flex items-center gap-1.5 text-sm
                font-medium text-purple-400 hover:text-purple-300 transition"
              >
                View All
                <ArrowRight size={15} />
              </button>

            </div>

            {/* Events List */}
            <div className="space-y-4">

              {events.length > 0 ? (
                events.map((event) => (
                  <UpcomingEvent key={event.id} event={event} />
                ))
              ) : (
                <div className="bg-[#18161f] border border-[#302c3a]
                rounded-2xl p-8 text-center">
                  <p className="text-gray-400 text-sm">
                    No events available yet.
                  </p>

                  <button
                    onClick={() => navigate("/main/create")}
                    className="mt-3 text-sm text-purple-400
                    hover:text-purple-300 font-medium"
                  >
                    Create your first event
                  </button>
                </div>
              )}

            </div>

          </div>

          {/* Recent Registrations */}
          <RecentRegistration registrations={registrations} />

        </div>

        {/* Right Column */}
        <aside className="min-w-0 space-y-5">

          <WeeklyCharts weeklyData={weeklyData} />

          <QuickActions />

          <ApprovalCard />

        </aside>

      </section>

    </div>
  );
};

export default Dashboard;
