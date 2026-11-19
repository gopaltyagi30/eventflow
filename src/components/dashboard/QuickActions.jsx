
import React from "react";
import { ArrowRight, ClipboardList, Compass, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">

      {/* Heading */}
      <h4 className="text-xs font-bold tracking-widest text-[var(--muted-color)] mb-4">
        QUICK ACTIONS
      </h4>

      {/* Create Event */}
      <button
        type="button"
        onClick={() => navigate("/main/create")}
        className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-[var(--hover-bg)] transition-all duration-200 group"
      >
        <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <Plus size={18} />
        </span>

        <span className="flex-1 min-w-0">
          <strong className="block text-sm font-semibold text-[var(--text-color)]">
            Create Event
          </strong>
          <small className="block mt-1 text-xs text-[var(--muted-color)]">
            Launch multi-step pipeline wizard
          </small>
        </span>

        <ArrowRight
          size={17}
          className="shrink-0 text-[var(--muted-color)] group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
        />
      </button>

      {/* Discover Events */}
      <button
        type="button"
        onClick={() => navigate("/main/discover")}
        className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-[var(--hover-bg)] transition-all duration-200 group"
      >
        <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <Compass size={18} />
        </span>

        <span className="flex-1 min-w-0">
          <strong className="block text-sm font-semibold text-[var(--text-color)]">
            Discover Events
          </strong>
          <small className="block mt-1 text-xs text-[var(--muted-color)]">
            Browse calendar & sync schedule
          </small>
        </span>

        <ArrowRight
          size={17}
          className="shrink-0 text-[var(--muted-color)] group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
        />
      </button>

      {/* Manage Events */}
      <button
        type="button"
        onClick={() => navigate("/main/manage-events")}
        className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-[var(--hover-bg)] transition-all duration-200 group"
      >
        <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-green-500/10 text-green-400">
          <ClipboardList size={18} />
        </span>

        <span className="flex-1 min-w-0">
          <strong className="block text-sm font-semibold text-[var(--text-color)]">
            Manage Events
          </strong>
          <small className="block mt-1 text-xs text-[var(--muted-color)]">
            Export rosters, badges & passes
          </small>
        </span>

        <ArrowRight
          size={17}
          className="shrink-0 text-[var(--muted-color)] group-hover:text-green-400 group-hover:translate-x-1 transition-all"
        />
      </button>

    </div>
  );
};

export default QuickActions;
