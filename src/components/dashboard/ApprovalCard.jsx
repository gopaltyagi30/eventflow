
import { Bell, ArrowRight } from "lucide-react";

const ApprovalCard = () => {
  return (
    <div className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <Bell size={18} />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[var(--text-color)]">
            Approvals Required
          </h4>

          <p className="text-[10px] font-semibold tracking-widest text-[var(--muted-color)] mt-1">
            ACTION ITEM
          </p>
        </div>

        <span className="ml-auto flex items-center justify-center min-w-7 h-7 px-2 rounded-full bg-red-500/10 text-red-400 text-xs font-bold">
          3
        </span>

      </div>

      {/* Description */}
      <p className="text-sm leading-6 text-[var(--muted-color)] mb-5">
        3 pending speaker proposals for Tech Summit await review and calendar
        slot assignment.
      </p>

      {/* Divider */}
      <div className="border-t border-[var(--border-color)] mb-4" />

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div className="flex items-center gap-2 text-xs text-[var(--muted-color)]">
          <span className="w-2 h-2 rounded-full bg-orange-400" />
          Due today, 18:00 IST
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors duration-200"
        >
          Review Proposals
          <ArrowRight size={14} />
        </button>

      </div>

    </div>
  );
};

export default ApprovalCard;
