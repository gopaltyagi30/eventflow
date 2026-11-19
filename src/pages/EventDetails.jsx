
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  UserRound,
  Building2,
  CheckCircle2,
  Ticket,
  Globe,
  Info,
} from "lucide-react";

import { toast } from "react-toastify";

const EventDetails = () => {
  const events = useSelector((state) => state.events.events);

  const { eventId } = useParams();
  const navigate = useNavigate();

  const [interested, setInterested] = useState(false);

  // Find event using URL ID
  const event = events.find(
    (item) => String(item.id) === eventId
  );

  // Handle invalid event ID
  if (!event) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center bg-[#18161f] border border-[#302c3a] rounded-2xl p-8">

          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-purple-500/10 text-purple-400 mb-5">
            <Ticket size={30} />
          </div>

          <h2 className="text-xl font-bold text-white">
            Event Not Found
          </h2>

          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            This event may have been deleted or does not exist.
          </p>

          <button
            onClick={() => navigate("/main/discover")}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition"
          >
            <ArrowLeft size={16} />
            Back to Discover
          </button>

        </div>
      </div>
    );
  }

  // Event registration information
  const capacity = Number(event.capacity) || 0;
  const registrations = Number(event.registrations) || 0;
  const seatsLeft = Math.max(0, capacity - registrations);

  const progress = capacity
    ? Math.min((registrations / capacity) * 100, 100)
    : 0;

  // Format event date
  const formattedDate = event.date
    ? new Date(`${event.date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Date not announced";

  // Format event time
  const formatTime = (time) => {
    if (!time) return "Not specified";

    const [hours, minutes] = time.split(":");
    const date = new Date();

    date.setHours(Number(hours), Number(minutes));

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const startTime = formatTime(event.startTime);
  const endTime = formatTime(event.endTime);

  // Registration demo
  const onRegister = () => {
    if (seatsLeft > 0) {
      setInterested(true);
      toast.success("Registration Successful");
    } else {
      toast.error("No seats available");
    }
  };

  return (
    <div className="w-full min-h-screen text-[#f5f3fa]">

      {/* Back Button */}
      <button
        onClick={() => navigate("/main/discover")}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-6"
      >
        <ArrowLeft size={17} />
        Back to Discover Events
      </button>

      {/* Hero Banner */}
      <section className="relative min-h-[320px] sm:min-h-[380px] overflow-hidden rounded-2xl border border-[#302c3a] bg-[#18161f]">

        {/* Cover Image */}
        {event.cover ? (
          <img
            src={event.cover}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-purple-400">
            <Ticket size={55} />
            <span className="text-xl font-bold tracking-widest">
              EventFlow
            </span>
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c10] via-black/60 to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-5 sm:p-8 lg:p-10">

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1.5 rounded-full bg-purple-600 text-white text-xs font-semibold">
              {event.category}
            </span>

            <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
              {event.status || "Published"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-3xl leading-tight">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 mt-3 max-w-2xl leading-relaxed line-clamp-3">
            {event.description || "Discover more about this event."}
          </p>

          {/* Hero Information */}
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-xs sm:text-sm text-gray-200">

            <span className="flex items-center gap-2">
              <CalendarDays size={17} className="text-purple-400" />
              {formattedDate}
            </span>

            <span className="flex items-center gap-2">
              <MapPin size={17} className="text-purple-400" />
              {event.city || "Location not specified"}
            </span>

            <span className="flex items-center gap-2">
              <Users size={17} className="text-purple-400" />
              {registrations} / {capacity} Registered
            </span>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)] gap-6 mt-7">

        {/* Left Column */}
        <div className="min-w-0 space-y-6">

          {/* About Event */}
          <section className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Info size={21} />
              </div>

              <h2 className="text-lg font-semibold">
                About This Event
              </h2>
            </div>

            <p className="text-sm text-gray-400 leading-7">
              {event.description ||
                "No description has been added for this event yet."}
            </p>

            {/* Event Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-7 pt-6 border-t border-[#302c3a]">

              <div>
                <span className="block text-xs text-gray-500 mb-2">
                  Category
                </span>
                <strong className="text-sm font-semibold text-white">
                  {event.category}
                </strong>
              </div>

              <div>
                <span className="block text-xs text-gray-500 mb-2">
                  Audience
                </span>
                <strong className="text-sm font-semibold text-white">
                  {event.audience || "Public Listed"}
                </strong>
              </div>

              <div>
                <span className="block text-xs text-gray-500 mb-2">
                  Event Format
                </span>
                <strong className="text-sm font-semibold text-white">
                  {event.format || "Not specified"}
                </strong>
              </div>

            </div>
          </section>

          {/* Event Schedule */}
          <section className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <CalendarDays size={21} />
              </div>

              <h2 className="text-lg font-semibold">
                Event Schedule
              </h2>
            </div>

            <div className="flex gap-4">

              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 ring-4 ring-purple-500/10" />
                <div className="w-px flex-1 min-h-12 bg-[#393344] mt-2" />
              </div>

              <div className="pb-5">
                <span className="text-sm font-semibold text-purple-400">
                  {startTime} – {endTime}
                </span>

                <h3 className="text-base font-semibold text-white mt-2">
                  {event.title}
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  {event.multiDay ? "Multi-day event" : "Event session"}
                </p>
              </div>

            </div>

            {/* Registration Deadline */}
            {event.deadline && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#211e2b] border border-[#302c3a]">

                <Clock size={18} className="text-purple-400 mt-0.5 shrink-0" />

                <div>
                  <span className="block text-xs text-gray-400">
                    Registration Deadline
                  </span>

                  <strong className="text-sm text-white block mt-1">
                    {new Date(event.deadline).toLocaleString("en-IN")}
                  </strong>
                </div>

              </div>
            )}

          </section>

          {/* Venue and Location */}
          <section className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5 sm:p-6">

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <MapPin size={21} />
              </div>

              <h2 className="text-lg font-semibold">
                Venue & Location
              </h2>
            </div>

            <h3 className="text-base font-semibold text-white">
              {event.venue || "Venue not specified"}
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              {event.address || event.city || "Address not available"}
            </p>

            {event.city && (
              <p className="flex items-center gap-2 text-xs text-gray-400 mt-3">
                <MapPin size={15} className="text-purple-400" />
                {event.city}
              </p>
            )}

            {event.location?.lat != null &&
              event.location?.lng != null && (
                <a
                  href={`https://www.google.com/maps?q=${event.location.lat},${event.location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-purple-400 hover:text-purple-300 transition"
                >
                  Open in Google Maps
                  <Globe size={15} />
                </a>
              )}

          </section>

          {/* Organizer */}
          <section className="flex items-center gap-4 bg-[#18161f] border border-[#302c3a] rounded-2xl p-5 sm:p-6">

            <div className="w-14 h-14 shrink-0 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <UserRound size={28} />
            </div>

            <div className="min-w-0">
              <span className="text-xs text-gray-500">
                Organized By
              </span>

              <h3 className="text-base font-semibold text-white mt-1">
                {event.organizer || "Event Organizer"}
              </h3>

              <p className="text-sm text-gray-400 mt-1 break-all">
                {event.email || "Contact information unavailable"}
              </p>
            </div>

          </section>

        </div>

        {/* Right Sidebar */}
        <aside className="min-w-0 space-y-5">

          {/* Registration Overview */}
          <section className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5 sm:p-6 xl:sticky xl:top-6">

            <span className="text-[10px] font-bold tracking-[2px] text-gray-500">
              REGISTRATION OVERVIEW
            </span>

            <h2 className="text-3xl font-bold text-white mt-4">
              {seatsLeft}
              <span className="text-sm font-medium text-gray-400 ml-2">
                seats left
              </span>
            </h2>

            {/* Capacity */}
            <div className="flex items-center justify-between gap-3 mt-6 text-xs">
              <span className="text-gray-400">
                Event Capacity
              </span>

              <strong className="text-white">
                {registrations} / {capacity}
              </strong>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#302c3a] overflow-hidden mt-3">
              <div
                className="h-full rounded-full bg-purple-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between gap-3 text-xs text-gray-500 mt-2">
              <span>{progress.toFixed(0)}% filled</span>
              <span>{seatsLeft} available</span>
            </div>

            {/* Registration Details */}
            <div className="space-y-4 border-t border-[#302c3a] mt-6 pt-6">

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <CalendarDays size={17} className="text-purple-400 shrink-0" />
                {formattedDate}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Clock size={17} className="text-purple-400 shrink-0" />
                {startTime} – {endTime}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Building2 size={17} className="text-purple-400 shrink-0" />
                {event.format || "Event"}
              </div>

            </div>

            {/* Register Button */}
            <button
              disabled={
                interested ||
                seatsLeft === 0 ||
                event.status === "Cancelled"
              }
              onClick={onRegister}
              className="w-full flex items-center justify-center gap-2 mt-7 px-5 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-[#302c3a] disabled:text-gray-500 disabled:cursor-not-allowed text-white text-sm font-semibold transition"
            >
              {interested
                ? "Interest Noted (Demo)"
                : seatsLeft === 0
                  ? "Event Full"
                  : event.status === "Cancelled"
                    ? "Event Cancelled"
                    : "Register Interest"}

              <ArrowLeft size={17} className="rotate-180" />
            </button>

            <p className="text-[11px] text-gray-500 text-center leading-relaxed mt-4">
              Registration is a demo interaction. Actual attendee
              registration will be connected later.
            </p>

            {/* Trust Information */}
            <div className="flex items-center justify-center gap-2 border-t border-[#302c3a] mt-5 pt-5 text-[11px] text-gray-400">
              <CheckCircle2 size={15} className="text-green-400" />
              Event information stored in EventFlow
            </div>

          </section>

          {/* Quick Help */}
          <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#211e2b] border border-[#302c3a] rounded-2xl p-5">

            <div>
              <h3 className="text-sm font-semibold text-white">
                Need Assistance?
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                Contact the event organizer.
              </p>
            </div>

            {event.email && (
              <a
                href={`mailto:${event.email}`}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold text-center transition"
              >
                Contact
              </a>
            )}

          </section>

        </aside>
      </div>

    </div>
  );
};

export default EventDetails;
