
import React from "react";

const RecentRegistration = ({ registrations = [] }) => {
  const getStatusStyle = (status) => {
    if (status === "Confirmed") {
      return "bg-green-500/10 text-green-400 border-green-500/20";
    }

    if (status === "Checked In") {
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }

    return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  };

  return (
    <div className="w-full min-w-0 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-[var(--text-color)]">
            Recent Registrations
          </h3>

          <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Stream
          </span>
        </div>

        <span className="text-xs text-[var(--muted-color)]">
          4 inbound / hour
        </span>

      </div>

      {/* Responsive Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">

          <thead>
            <tr className="border-b border-[var(--border-color)]">
              {["ATTENDEE", "EVENT", "TICKET TIER", "TIME", "STATUS"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-[10px] font-bold tracking-wider text-[var(--muted-color)] whitespace-nowrap"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {registrations.length > 0 ? (
              registrations.map((person) => (
                <tr
                  key={person.name}
                  className="border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)] transition-colors"
                >

                  {/* Attendee */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold">
                        {person.initials}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-color)] whitespace-nowrap">
                          {person.name}
                        </p>

                        <p className="text-xs text-[var(--muted-color)] mt-1">
                          {person.email}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Event */}
                  <td className="px-4 py-4 text-sm text-[var(--text-color)] whitespace-nowrap">
                    {person.event}
                  </td>

                  {/* Ticket */}
                  <td className="px-4 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-medium whitespace-nowrap">
                      {person.ticket}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="px-4 py-4 text-xs text-[var(--muted-color)] whitespace-nowrap">
                    {person.time}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-medium whitespace-nowrap ${getStatusStyle(
                        person.status
                      )}`}
                    >
                      {person.status}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-10 text-center text-sm text-[var(--muted-color)]"
                >
                  No registrations available yet.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default RecentRegistration;
