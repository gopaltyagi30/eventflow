
import React from "react";

const WeeklyCharts = ({ weeklyData = [] }) => {
  return (
    <div className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">

      {/* Card Label */}
      <p className="text-[10px] font-bold tracking-widest text-[var(--muted-color)]">
        REGISTRATION VOLUME
      </p>

      {/* Chart Heading */}
      <div className="flex items-center justify-between gap-2 mt-3">
        <h3 className="text-lg font-semibold text-[var(--text-color)]">
          Weekly Velocity
        </h3>

        <span className="text-sm font-semibold text-purple-400">
          1,240 Total
        </span>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-40 mt-7 px-1">

        {weeklyData.map((item, index) => {
          const barHeight = Math.min(100, Math.max(0, Number(item.value) || 0));
          const isHighlighted = index === 3;

          return (
            <div
              key={index}
              className="flex-1 h-full flex flex-col items-center justify-end gap-3 min-w-0"
            >

              {/* Bar */}
              <div className="w-full flex-1 flex items-end justify-center">
                <div
                  className={`w-full max-w-9 rounded-t-lg transition-all duration-300 hover:opacity-80 ${
                    isHighlighted
                      ? "bg-purple-500 shadow-lg shadow-purple-500/20"
                      : "bg-purple-500/30"
                  }`}
                  style={{ height: `${barHeight}%` }}
                  title={`${item.day}: ${item.value}%`}
                />
              </div>

              {/* Day Label */}
              <span
                className={`text-[10px] font-medium ${
                  isHighlighted
                    ? "text-purple-400"
                    : "text-[var(--muted-color)]"
                }`}
              >
                {item.day}
              </span>

            </div>
          );
        })}

      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border-color)] my-5" />

      {/* Chart Summary */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <p className="text-[9px] font-bold tracking-wider text-[var(--muted-color)]">
            PEAK DAY
          </p>

          <strong className="block mt-2 text-sm font-semibold text-[var(--text-color)]">
            Thursday (+248)
          </strong>
        </div>

        <div>
          <p className="text-[9px] font-bold tracking-wider text-[var(--muted-color)]">
            CONVERSION RATE
          </p>

          <strong className="block mt-2 text-sm font-semibold text-green-400">
            84.2%
          </strong>
        </div>

      </div>

    </div>
  );
};

export default WeeklyCharts;
