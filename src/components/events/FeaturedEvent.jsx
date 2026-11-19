
import {
  CalendarDays,
  MapPin,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";

const FeaturedEvent = ({ event, onExplore }) => {
  if (!event) return null;

  // Support different event property names
  const eventImage = event.image || event.cover || event.banner;

  const eventLocation =
    event.venue ||
    event.location ||
    event.city ||
    "Location to be announced";

  const eventTime =
    event.time ||
    event.startTime ||
    "Time to be announced";

  const eventPrice =
    event.price ||
    event.ticketPrice ||
    "Free";

  const eventOrganizer =
    event.organizer ||
    event.createdByName ||
    "Event Organizer";

  const eventCategory =
    event.category || "Featured Event";

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]">

      {/* Left Content */}
      <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-8">

        {/* Featured Label */}
        <div className="flex flex-wrap items-center gap-2 mb-5">

          <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold tracking-wider">
            ✦ {String(eventCategory).toUpperCase()}
          </span>

          <span className="flex items-center gap-1 text-xs font-semibold text-yellow-400">
            <Star size={13} fill="currentColor" />
            SPOTLIGHT
          </span>

        </div>

        {/* Event Title */}
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-[var(--text-color)]">
          {event.title || "Untitled Event"}
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm leading-7 text-[var(--muted-color)] line-clamp-3">
          {event.description || "Explore this exciting event and discover a new experience."}
        </p>

        {/* Event Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-7">

          {/* Date */}
          <div className="flex items-start gap-3">

            <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <CalendarDays size={17} />
            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-bold tracking-wider text-[var(--muted-color)]">
                DATE & TIME
              </p>

              <strong className="block mt-1 text-sm font-semibold text-[var(--text-color)]">
                {event.date || "Date to be announced"}
              </strong>

              <span className="text-xs text-[var(--muted-color)]">
                {eventTime}
              </span>

            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">

            <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <MapPin size={17} />
            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-bold tracking-wider text-[var(--muted-color)]">
                LOCATION
              </p>

              <strong className="block mt-1 text-sm font-semibold text-[var(--text-color)] break-words">
                {eventLocation}
              </strong>

            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-start gap-3">

            <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Users size={17} />
            </div>

            <div className="min-w-0">

              <p className="text-[10px] font-bold tracking-wider text-[var(--muted-color)]">
                ORGANIZER
              </p>

              <strong className="block mt-1 text-sm font-semibold text-[var(--text-color)] break-words">
                {eventOrganizer}
              </strong>

            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 mt-8">

          <button
            type="button"
            onClick={() => onExplore(event)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-900/20 transition-all duration-200"
          >
            Explore Event
            <ArrowRight size={16} />
          </button>

          <span className="text-sm text-[var(--muted-color)]">
            Pass Tier:{" "}
            <strong className="text-[var(--text-color)]">
              {eventPrice}
            </strong>
          </span>

        </div>
      </div>

      {/* Right Image */}
      <div className="relative min-h-[230px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-[var(--hover-bg)]">

        {eventImage ? (
          <img
            src={eventImage}
            alt={event.title || "Featured event"}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--muted-color)]">
            No Event Image Available
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Spotlight Badge */}
        <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold tracking-wider">
          ✦ SPOTLIGHT EVENT
        </span>

      </div>

    </section>
  );
};

export default FeaturedEvent;
