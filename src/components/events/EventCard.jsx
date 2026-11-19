
import { CalendarDays, MapPin, Users } from "lucide-react";

const EventCard = ({ event, onViewDetails }) => {
  const registrations = Number(event.registrations) || 0;
  const capacity = Number(event.capacity) || 0;

  const percentage =
    capacity > 0
      ? Math.min(100, Math.round((registrations / capacity) * 100))
      : 0;

  const seatsLeft = Math.max(0, capacity - registrations);

  const formattedDate = new Date(
    `${event.date}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <article className="w-full min-w-0 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 group">

      {/* Event Image */}
      <div className="relative w-full h-48 overflow-hidden bg-[var(--hover-bg)]">

        {event.cover ? (
          <img
            src={event.cover}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-[var(--muted-color)]">
            No Image Available
          </div>
        )}

        {/* Category */}
        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-semibold">
          {event.category}
        </span>

        {/* Available Seats */}
        <span className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-green-400 text-xs font-semibold">
          {seatsLeft} seats left
        </span>

      </div>

      {/* Card Body */}
      <div className="p-5">

        {/* Date */}
        <div className="flex items-center gap-2 text-xs font-medium text-purple-400 mb-3">
          <CalendarDays size={15} />
          <span>
            {formattedDate} · {event.time || event.startTime}
          </span>
        </div>

        {/* Event Title */}
        <h3 className="text-lg font-bold text-[var(--text-color)] line-clamp-1">
          {event.title}
        </h3>

        {/* Event Information */}
        <div className="space-y-2 mt-4">

          <p className="flex items-center gap-2 text-sm text-[var(--muted-color)]">
            <MapPin size={15} className="shrink-0 text-purple-400" />
            <span className="truncate">
              {event.venue || "Venue not specified"}
            </span>
          </p>

          <p className="flex items-center gap-2 text-sm text-[var(--muted-color)]">
            <Users size={15} className="shrink-0 text-purple-400" />
            <span className="truncate">
              {event.organizer || "Organizer"}
            </span>
          </p>

        </div>

        {/* Capacity */}
        <div className="mt-5">

          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs text-[var(--muted-color)]">
              Capacity
            </span>

            <span className="text-xs font-semibold text-[var(--text-color)]">
              {registrations}/{capacity} booked
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

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-[var(--border-color)]">

          <span className="text-base font-bold text-[var(--text-color)]">
            {event.price || "Free"}
          </span>

          <button
            type="button"
            onClick={() => onViewDetails(event)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors duration-200"
          >
            View Details
          </button>

        </div>

      </div>
    </article>
  );
};

export default EventCard;
