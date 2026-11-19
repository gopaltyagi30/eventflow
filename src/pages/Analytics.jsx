
import React from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Download,
  ArrowLeft,
  LockKeyhole,
  ChartNoAxesCombined,
  Target,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router";

const Analytics = () => {
  const navigate = useNavigate();

  const upcomingFeatures = [
    {
      icon: TrendingUp,
      title: "Registration Trends",
      description:
        "Track registration growth and understand how your events perform over time.",
      tag: "Coming Soon",
    },
    {
      icon: Users,
      title: "Audience Insights",
      description:
        "Understand your audience, attendee demographics and engagement patterns.",
      tag: "Coming Soon",
    },
    {
      icon: BarChart3,
      title: "Event Performance",
      description:
        "Compare events using attendance, registrations and performance metrics.",
      tag: "Coming Soon",
    },
    {
      icon: Download,
      title: "Advanced Reports",
      description:
        "Generate detailed reports and export your event performance data.",
      tag: "Coming Soon",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-10 text-white">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl border border-[#302c3a] bg-gradient-to-br from-[#211832] via-[#171421] to-[#111015] p-6 md:p-10">

        {/* Background Effects */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl"></div>

        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* Hero Content */}
          <div className="max-w-xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-[10px] font-bold tracking-[1.5px] text-amber-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></span>
              UNDER DEVELOPMENT
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              Your event insights,
              <span className="block bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
                reimagined.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 md:text-base">
              We're building a powerful analytics experience to help you
              understand your events, track registrations and make
              smarter decisions.
            </p>

            <button
              onClick={() => navigate("/main")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all hover:-translate-y-0.5 hover:bg-violet-500"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </button>

          </div>

          {/* Analytics Visual */}
          <div className="relative mx-auto w-full max-w-md">

            {/* Main Card */}
            <div className="rounded-2xl border border-[#393247] bg-[#18151f]/95 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">

              {/* Card Header */}
              <div className="flex items-center justify-between">

                <div>
                  <span className="text-[10px] font-semibold tracking-[1.5px] text-gray-500">
                    PERFORMANCE OVERVIEW
                  </span>

                  <h3 className="mt-1 text-lg font-semibold">
                    Event Analytics
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
                  <ChartNoAxesCombined size={22} />
                </div>

              </div>

              {/* Preview Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-[#211e2b] p-4">
                  <span className="text-xs text-gray-500">
                    Total Registrations
                  </span>
                  <strong className="mt-2 block text-2xl text-gray-300">
                    ---
                  </strong>
                </div>

                <div className="rounded-xl bg-[#211e2b] p-4">
                  <span className="text-xs text-gray-500">
                    Event Growth
                  </span>
                  <strong className="mt-2 block text-2xl text-gray-300">
                    ---
                  </strong>
                </div>

              </div>

              {/* Chart */}
              <div className="mt-8 flex h-36 items-end justify-between gap-2 border-b border-[#302c3a] px-2">

                {[35, 55, 42, 75, 58, 88, 68, 100].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="w-full rounded-t-md bg-gradient-to-t from-violet-700 to-violet-400 opacity-80 transition-all duration-300 hover:opacity-100"
                      style={{ height: `${height}%` }}
                    ></div>
                  )
                )}

              </div>

              {/* Chart Labels */}
              <div className="mt-3 flex justify-between px-1 text-[9px] font-semibold tracking-wider text-gray-600">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>

              {/* Card Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-[#302c3a] pt-4 text-xs text-gray-500">

                <div className="flex items-center gap-2">
                  <LockKeyhole size={13} />
                  Analytics preview
                </div>

                <span className="text-violet-400">
                  Coming soon
                </span>

              </div>

            </div>

            {/* Floating Icons */}
            <div className="absolute -left-5 top-20 hidden h-12 w-12 items-center justify-center rounded-xl border border-[#393247] bg-[#211e2b] text-green-400 shadow-xl sm:flex">
              <TrendingUp size={22} />
            </div>

            <div className="absolute -right-5 top-1/3 hidden h-12 w-12 items-center justify-center rounded-xl border border-[#393247] bg-[#211e2b] text-violet-400 shadow-xl sm:flex">
              <Target size={22} />
            </div>

            <div className="absolute -bottom-5 left-12 hidden h-12 w-12 items-center justify-center rounded-xl border border-[#393247] bg-[#211e2b] text-blue-400 shadow-xl sm:flex">
              <Users size={22} />
            </div>

          </div>

        </div>
      </section>

      {/* UPCOMING FEATURES */}
      <section>

        {/* Section Heading */}
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <span className="text-[10px] font-bold tracking-[2px] text-violet-400">
              WHAT'S IN THE PIPELINE
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Powerful insights are on their way
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Here's what we're working on for your analytics workspace.
            </p>
          </div>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {upcomingFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-[#302c3a] bg-[#18161f] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-[#1d1a27]"
              >

                {/* Card Top */}
                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition-all group-hover:bg-violet-500/20">
                    <Icon size={23} />
                  </div>

                  <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold text-violet-400">
                    {feature.tag}
                  </span>

                </div>

                {/* Card Content */}
                <h3 className="mt-6 text-base font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                  {feature.description}
                </p>

                {/* Card Bottom */}
                <div className="mt-6 flex items-center gap-2 border-t border-[#302c3a] pt-4 text-xs text-gray-600">
                  <LockKeyhole size={13} />
                  <span>Not available yet</span>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="flex flex-col gap-5 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-[#211832] to-[#18151f] p-6 md:flex-row md:items-center md:justify-between md:p-7">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
            <Clock3 size={23} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              We're working behind the scenes!
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Our analytics workspace is currently in development.
              Stay tuned for a smarter way to manage your events.
            </p>
          </div>

        </div>

        <button
          onClick={() => navigate("/main/manage-events")}
          className="shrink-0 rounded-xl border border-violet-500/30 bg-violet-600/15 px-5 py-3 text-sm font-semibold text-violet-300 transition-all hover:bg-violet-600 hover:text-white"
        >
          Manage Events
        </button>

      </section>

      {/* FOOTER */}
      <footer className="flex flex-col items-center justify-between gap-2 border-t border-[#302c3a] pt-6 text-[10px] font-semibold tracking-[1.5px] text-gray-600 sm:flex-row">

        <span>EVENTFLOW ANALYTICS</span>

        <span className="font-normal tracking-normal">
          Better insights. Better events.
        </span>

      </footer>

    </div>
  );
};

export default Analytics;
