
import { CalendarDays, MapPin, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router";

const UpcomingEvent = ({ event }) => {
  const navigate = useNavigate();

  // Calculate registration percentage safely
  const percentage =
    Number(event.capacity) > 0
      ? Math.min(
          100,
          Math.round(
            (Number(event.registrations || 0) / Number(event.capacity)) * 100
          )
        )
      : 0;

  // Open event details
  const openEvent = () => {
    navigate(`/main/events/${event.id}`);
  };

  return (
    <div
      onClick={openEvent}
      className="relative w-full flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--hover-bg)] hover:border-purple-500/40 transition-all duration-200 cursor-pointer group"
    >
      {/* Event Image */}
      <div className="w-full sm:w-36 h-40 sm:h-32 shrink-0 overflow-hidden rounded-xl bg-[var(--hover-bg)]">
        {event.cover ? (
          <img
            src={event.cover}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--muted-color)] text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Event Information */}
      <div className="flex-1 min-w-0 py-1 pr-8">

        {/* Category and Status */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-purple-400">
            {event.category}
          </span>

          <span className="text-[var(--muted-color)]">•</span>

          <span className="text-xs font-medium text-green-400">
            {event.status}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-semibold text-[var(--text-color)] truncate">
          {event.title}
        </h4>

        {/* Event Meta */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mt-3">

          <span className="flex items-center gap-1.5 text-xs text-[var(--muted-color)]">
            <CalendarDays size={14} className="shrink-0" />
            {event.date} · {event.time || event.startTime}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-[var(--muted-color)]">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{event.venue}</span>
          </span>

        </div>

        {/* Capacity Information */}
        <div className="mt-4">

          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs text-[var(--muted-color)]">
              Capacity Status
            </span>

            <span className="text-xs font-semibold text-[var(--text-color)]">
              {event.registrations || 0}/{event.capacity || 0} ({percentage}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-[var(--hover-bg)] overflow-hidden">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

        </div>
      </div>

      {/* Menu Button */}
      {/* <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted-color)] hover:bg-[var(--elevated-bg)] hover:text-[var(--text-color)] transition"
        title="More options"
      >
        <MoreVertical size={18} />
      </button> */}

    </div>
  );
};

export default UpcomingEvent;
