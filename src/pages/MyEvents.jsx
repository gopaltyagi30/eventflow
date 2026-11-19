
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Search,
  LayoutGrid,
  List,
  ArrowRight,
  Plus,
  Building2,
  Ticket,
  CheckCircle2,
  Pencil,
  Eye,
  XCircle,
} from "lucide-react";

// Normalize values for reliable comparison
const normalizeOwner = (value) =>
  String(value || "").trim().toLowerCase();

const MyEvents = () => {
  const navigate = useNavigate();

  // Redux data
  const eventsFromStore = useSelector(
    (state) => state.events?.events
  );

  const user = useSelector(
    (state) => state.auth?.user
  );

  const events = Array.isArray(eventsFromStore)
    ? eventsFromStore
    : [];

  const userEmail = normalizeOwner(user?.email);

  const userName = normalizeOwner(
    user?.fullName || user?.name
  );

  // UI states
  const [activeTab, setActiveTab] = useState("created");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("date");

  // Calculate event status
  const getStatus = (event) => {
    if (event?.status === "Cancelled") {
      return "Cancelled";
    }

    if (!event?.date) {
      return "Upcoming";
    }

    const start = new Date(
      `${event.date}T${event.startTime || "00:00"}`
    );

    const end = new Date(
      `${event.date}T${event.endTime || "23:59"}`
    );

    if (Number.isNaN(start.getTime())) {
      return "Upcoming";
    }

    const now = new Date();

    if (now < start) return "Upcoming";

    if (
      !Number.isNaN(end.getTime()) &&
      now <= end
    ) {
      return "Ongoing";
    }

    return "Completed";
  };

  // Check whether an event belongs to the logged-in user
  const isCreatedByUser = (event) => {
    const createdBy = normalizeOwner(event?.createdBy);
    const createdByEmail = normalizeOwner(
      event?.createdByEmail
    );
    const organizerEmail = normalizeOwner(
      event?.organizerEmail
    );
    const createdByName = normalizeOwner(
      event?.createdByName
    );
    const organizer = normalizeOwner(
      event?.organizer
    );

    const emailMatches =
      userEmail &&
      (
        createdBy === userEmail ||
        createdByEmail === userEmail ||
        organizerEmail === userEmail
      );

    const nameMatches =
      userName &&
      (
        createdBy === userName ||
        createdByName === userName ||
        organizer === userName
      );

    return Boolean(emailMatches || nameMatches);
  };

  // Events created by logged-in user
  const createdEvents = useMemo(() => {
    if (!userEmail && !userName) {
      return [];
    }

    return events.filter(isCreatedByUser);
  }, [events, userEmail, userName]);

  // Events registered by logged-in user
  const registeredEvents = useMemo(() => {
    return events.filter(
      (event) => event?.isRegistered === true
    );
  }, [events]);

  // Events displayed according to selected tab
  const displayedEvents =
    activeTab === "created"
      ? createdEvents
      : registeredEvents;

  // Status counts
  const counts = useMemo(() => {
    return {
      all: displayedEvents.length,

      upcoming: displayedEvents.filter(
        (event) => getStatus(event) === "Upcoming"
      ).length,

      ongoing: displayedEvents.filter(
        (event) => getStatus(event) === "Ongoing"
      ).length,

      completed: displayedEvents.filter(
        (event) => getStatus(event) === "Completed"
      ).length,

      cancelled: displayedEvents.filter(
        (event) => getStatus(event) === "Cancelled"
      ).length,
    };
  }, [displayedEvents]);

  // Featured upcoming registered event
  const featuredEvent = useMemo(() => {
    return [...registeredEvents]
      .filter(
        (event) => getStatus(event) === "Upcoming"
      )
      .sort(
        (a, b) =>
          new Date(a.date) - new Date(b.date)
      )[0];
  }, [registeredEvents]);

  // Search, filter and sorting
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = displayedEvents.filter((event) => {
      return (
        event.title?.toLowerCase().includes(query) ||
        event.category?.toLowerCase().includes(query) ||
        event.venue?.toLowerCase().includes(query) ||
        event.city?.toLowerCase().includes(query)
      );
    });

    if (status !== "All") {
      result = result.filter(
        (event) => getStatus(event) === status
      );
    }

    if (sortBy === "date") {
      result.sort((a, b) => {
        return (
          new Date(a.date || 0) -
          new Date(b.date || 0)
        );
      });
    }

    if (sortBy === "popular") {
      result.sort(
        (a, b) =>
          (Number(b.registrations) || 0) -
          (Number(a.registrations) || 0)
      );
    }

    return result;
  }, [displayedEvents, search, status, sortBy]);

  // Format date
  const formatDate = (date) => {
    if (!date) return "Date not set";

    const parsed = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
      return "Date not set";
    }

    return parsed.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Open event details
  const openDetails = (event) => {
    navigate(`/main/events/${event.id}`);
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setSortBy("date");
  };

  // Common styles
  const secondaryButton =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-[#393344] bg-[#211e2b] px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-purple-500 hover:text-white";

  const primaryButton =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-purple-700";

  const statusStyles = {
    upcoming:
      "bg-purple-500/10 border-purple-500/20 text-purple-400",

    ongoing:
      "bg-green-500/10 border-green-500/20 text-green-400",

    completed:
      "bg-blue-500/10 border-blue-500/20 text-blue-400",

    cancelled:
      "bg-red-500/10 border-red-500/20 text-red-400",
  };

  return (
    <div className="w-full min-h-screen text-[#f5f3fa]">

      {/* HEADER */}
      <header className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-bold tracking-[2px] text-purple-400">
              CONSOLE OVERVIEW
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />

            <span className="text-[10px] text-green-400">
              Real-time sync
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Events
          </h1>

          <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
            Keep track of your registered passes, ongoing
            sessions, and orchestrated productions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          <div className="flex items-center gap-6 rounded-xl border border-[#302c3a] bg-[#18161f] px-5 py-3">

            <div>
              <strong className="block text-lg text-white">
                {registeredEvents.length}
              </strong>

              <span className="text-[10px] text-gray-500">
                Registered
              </span>
            </div>

            <div className="w-px h-8 bg-[#302c3a]" />

            <div>
              <strong className="block text-lg text-white">
                {createdEvents.length}
              </strong>

              <span className="text-[10px] text-gray-500">
                Organized
              </span>
            </div>

          </div>

          <button
            className={primaryButton}
            onClick={() => navigate("/main/create-event")}
          >
            <Plus size={17} />
            Create Event
          </button>

        </div>
      </header>

      {/* FEATURED REGISTERED EVENT */}
      {featuredEvent && (
        <section className="relative flex flex-col lg:flex-row lg:items-center gap-5 p-5 sm:p-6 mb-8 overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-[#211a32] to-[#18161f]">

          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative w-full lg:w-36 h-36 shrink-0 rounded-xl overflow-hidden bg-[#25212f] border border-[#393344] flex items-center justify-center text-purple-400">
            {featuredEvent.cover ? (
              <img
                src={featuredEvent.cover}
                alt={featuredEvent.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Ticket size={35} />
            )}
          </div>

          <div className="relative flex-1 min-w-0">

            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[1.5px] text-purple-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              NEXT UPCOMING EVENT
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">
              {featuredEvent.title}
            </h2>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 mt-4 text-xs text-gray-400">

              <span className="flex items-center gap-2">
                <CalendarDays size={14} className="text-purple-400" />
                {formatDate(featuredEvent.date)}
              </span>

              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-purple-400" />
                {[featuredEvent.venue, featuredEvent.city]
                  .filter(Boolean)
                  .join(", ") || "Venue not set"}
              </span>

            </div>
          </div>

          <button
            className={`${primaryButton} relative shrink-0`}
            onClick={() => openDetails(featuredEvent)}
          >
            View Ticket / Details
            <ArrowRight size={16} />
          </button>

        </section>
      )}

      {/* TABS AND FILTERS */}
      <section className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-4 sm:p-5 mb-6">

        {/* Main Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#302c3a] pb-4">

          <button
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold transition ${
              activeTab === "registered"
                ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                : "text-gray-400 hover:bg-[#25212f] hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("registered");
              setStatus("All");
            }}
          >
            <Ticket size={15} />
            Registered Events

            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px]">
              {registeredEvents.length}
            </span>
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold transition ${
              activeTab === "created"
                ? "bg-purple-500/15 text-purple-300 border border-purple-500/20"
                : "text-gray-400 hover:bg-[#25212f] hover:text-white"
            }`}
            onClick={() => {
              setActiveTab("created");
              setStatus("All");
            }}
          >
            <Building2 size={15} />
            Created Events

            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px]">
              {createdEvents.length}
            </span>
          </button>

        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto py-4">

          {[
            "All",
            "Upcoming",
            "Ongoing",
            "Completed",
            "Cancelled",
          ].map((item) => (
            <button
              key={item}
              className={`flex items-center gap-2 shrink-0 px-3 py-2 rounded-lg text-[11px] font-semibold transition ${
                status === item
                  ? "bg-purple-600 text-white"
                  : "bg-[#211e2b] text-gray-400 hover:text-white hover:bg-[#25212f]"
              }`}
              onClick={() => setStatus(item)}
            >
              {item}

              <span className={`text-[10px] ${
                status === item
                  ? "text-purple-100"
                  : "text-gray-500"
              }`}>
                {item === "All"
                  ? counts.all
                  : counts[item.toLowerCase()]}
              </span>
            </button>
          ))}

        </div>

        {/* Search and View Controls */}
        <div className="flex flex-col lg:flex-row gap-3 pt-4 border-t border-[#302c3a]">

          <label className="flex flex-1 items-center gap-3 rounded-xl border border-[#302c3a] bg-[#211e2b] px-4 py-3 focus-within:border-purple-500 transition">
            <Search size={17} className="text-gray-500 shrink-0" />

            <input
              placeholder="Search your events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="text-gray-500 hover:text-white"
              >
                <XCircle size={15} />
              </button>
            )}
          </label>

          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-xl border border-[#302c3a] bg-[#211e2b] p-1">

            <button
              className={`flex-1 lg:flex-none flex items-center justify-center p-2.5 rounded-lg transition ${
                view === "grid"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setView("grid")}
              title="Grid view"
            >
              <LayoutGrid size={17} />
            </button>

            <button
              className={`flex-1 lg:flex-none flex items-center justify-center p-2.5 rounded-lg transition ${
                view === "list"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setView("list")}
              title="List view"
            >
              <List size={17} />
            </button>

          </div>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-[#302c3a] bg-[#211e2b] px-4 py-3 text-xs text-gray-300 outline-none focus:border-purple-500"
          >
            <option value="date">Date: Soonest First</option>
            <option value="popular">Most Popular</option>
          </select>

        </div>

      </section>

      {/* EVENTS */}
      {filteredEvents.length > 0 ? (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
              : "flex flex-col gap-4"
          }
        >

          {filteredEvents.map((event) => {
            const eventStatus = getStatus(event);
            const capacity = Number(event.capacity) || 0;
            const registrations =
              Number(event.registrations) || 0;

            const progress = capacity
              ? Math.min(
                  (registrations / capacity) * 100,
                  100
                )
              : 0;

            return (
              <article
                className={`group min-w-0 bg-[#18161f] border border-[#302c3a] rounded-2xl overflow-hidden transition hover:border-purple-500/40 hover:-translate-y-0.5 ${
                  view === "list"
                    ? "flex flex-col md:flex-row"
                    : "flex flex-col"
                }`}
                key={event.id}
              >

                {/* IMAGE */}
                <div
                  className={`relative shrink-0 overflow-hidden bg-[#25212f] ${
                    view === "list"
                      ? "w-full md:w-64 h-48 md:h-auto md:min-h-[270px]"
                      : "w-full h-48"
                  }`}
                >

                  {event.cover ? (
                    <img
                      src={event.cover}
                      alt={event.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-purple-400">
                      <Ticket size={32} />
                      <span className="text-xs font-bold mt-2 tracking-widest">
                        EVENTFLOW
                      </span>
                    </div>
                  )}

                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white">
                    {event.category || "General"}
                  </span>

                  <span
                    className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold backdrop-blur-md ${
                      statusStyles[eventStatus.toLowerCase()]
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {eventStatus}
                  </span>

                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 min-w-0 p-5">

                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                      {event.description || "No description available."}
                    </p>
                  </div>

                  {/* Event Meta */}
                  <div className="space-y-3 mt-5">

                    <span className="flex items-center gap-3 text-xs text-gray-400">
                      <CalendarDays size={15} className="text-purple-400 shrink-0" />
                      {formatDate(event.date)}
                    </span>

                    <span className="flex items-center gap-3 text-xs text-gray-400">
                      <Clock size={15} className="text-purple-400 shrink-0" />
                      {event.startTime || "Time TBD"}
                    </span>

                    <span className="flex items-center gap-3 text-xs text-gray-400">
                      <MapPin size={15} className="text-purple-400 shrink-0" />
                      <span className="truncate">
                        {[event.venue || "Venue TBD", event.city]
                          .filter(Boolean)
                          .join(", ")}
                      </span>
                    </span>

                  </div>

                  {/* Registration Progress */}
                  <div className="mt-6">

                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[10px] text-gray-500">
                        Registration Capacity
                      </span>

                      <strong className="text-[11px] text-gray-300">
                        {registrations}/{capacity || "—"}
                      </strong>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-[#302c3a] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-purple-500 transition-all"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                  </div>

                  {/* Pass Details */}
                  <div className="flex items-center gap-3 rounded-xl bg-[#211e2b] border border-[#302c3a] p-3 mt-5">

                    <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                      <Ticket size={17} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="block text-[9px] tracking-wider font-bold text-gray-500">
                        {activeTab === "created"
                          ? "ORGANIZER"
                          : "REGISTRATION"}
                      </span>

                      <strong className="block text-xs text-gray-200 truncate mt-1">
                        {activeTab === "created"
                          ? event.organizer || "Organizer"
                          : event.passType || "General Attendee Pass"}
                      </strong>
                    </div>

                    {activeTab === "registered" && (
                      <CheckCircle2
                        size={17}
                        className="text-green-400 shrink-0"
                      />
                    )}

                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-5 pt-4 border-t border-[#302c3a]">

                    {activeTab === "created" ? (
                      <>
                        <button
                          className={`${secondaryButton} flex-1`}
                          onClick={() =>
                            navigate("/main/manage-events")
                          }
                        >
                          <Pencil size={14} />
                          Manage
                        </button>

                        <button
                          className={`${primaryButton} flex-1`}
                          onClick={() => openDetails(event)}
                        >
                          View Details
                          <ArrowRight size={15} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={`${secondaryButton} flex-1`}
                          onClick={() => openDetails(event)}
                        >
                          View Details
                        </button>

                        <button
                          className={`${primaryButton} flex-1`}
                          onClick={() => openDetails(event)}
                        >
                          <Ticket size={15} />
                          View Pass
                        </button>
                      </>
                    )}

                  </div>

                </div>
              </article>
            );
          })}

        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center text-center bg-[#18161f] border border-[#302c3a] rounded-2xl px-5 py-16">

          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 mb-5">
            <CalendarDays size={30} />
          </div>

          <h3 className="text-lg font-bold text-white">
            {search || status !== "All"
              ? "No matching events"
              : activeTab === "created"
                ? "You haven't created any events yet"
                : "No registered events yet"}
          </h3>

          <p className="text-sm text-gray-400 mt-2 max-w-md leading-relaxed">
            {activeTab === "created"
              ? "Create your first event and start managing your audience."
              : "Explore events and register to see them here."}
          </p>

          <button
            className={`${primaryButton} mt-6`}
            onClick={() =>
              navigate(
                activeTab === "created"
                  ? "/main/create-event"
                  : "/main/discover"
              )
            }
          >
            {activeTab === "created"
              ? "Create Your First Event"
              : "Discover Events"}

            <ArrowRight size={16} />
          </button>

          {(search || status !== "All") && (
            <button
              className="text-xs text-purple-400 hover:text-purple-300 mt-4"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}

        </div>
      )}

      {/* ORGANIZER CONSOLE */}
      {activeTab === "created" &&
        createdEvents.length > 0 && (
          <section className="mt-8 bg-[#18161f] border border-[#302c3a] rounded-2xl p-5 sm:p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>
                <span className="text-[10px] font-bold tracking-[1.5px] text-purple-400">
                  ORGANIZER CONSOLE
                </span>

                <h2 className="text-xl font-bold text-white mt-2">
                  Production Overview
                </h2>
              </div>

              <button
                className={secondaryButton}
                onClick={() =>
                  navigate("/main/manage-events")
                }
              >
                Manage All Events
                <ArrowRight size={15} />
              </button>

            </div>

            {createdEvents.slice(0, 1).map((event) => {
              const capacity = Number(event.capacity) || 0;

              const registrations =
                Number(event.registrations) || 0;

              const progress = capacity
                ? Math.min(
                    (registrations / capacity) * 100,
                    100
                  )
                : 0;

              return (
                <div
                  className="flex flex-col md:flex-row gap-5 p-4 rounded-xl bg-[#211e2b] border border-[#302c3a]"
                  key={event.id}
                >

                  <div className="w-full md:w-44 h-40 shrink-0 rounded-xl overflow-hidden bg-[#25212f] flex items-center justify-center text-purple-400">
                    {event.cover ? (
                      <img
                        src={event.cover}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Ticket size={35} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">

                    <span className="inline-flex items-center gap-2 text-[10px] text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      {event.status || "Published"}
                    </span>

                    <h3 className="text-lg font-bold text-white mt-2">
                      {event.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {event.description || "Event production overview"}
                    </p>

                    <div className="mt-5">

                      <div className="flex items-center justify-between gap-3 mb-2">

                        <span className="flex items-center gap-2 text-[11px] text-gray-400">
                          <Users size={14} />
                          Registration Capacity
                        </span>

                        <strong className="text-xs text-gray-300">
                          {registrations} / {capacity || "—"}
                        </strong>

                      </div>

                      <div className="w-full h-1.5 rounded-full bg-[#393344] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-purple-500"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">

                      <button
                        className={secondaryButton}
                        onClick={() => openDetails(event)}
                      >
                        <Eye size={15} />
                        View Attendees / Details
                      </button>

                      <button
                        className={primaryButton}
                        onClick={() =>
                          navigate("/main/manage-events")
                        }
                      >
                        Manage Event
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </section>
        )}

      {/* STATISTICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 mt-8 mb-4">

        <div className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <span className="text-[10px] font-bold tracking-wider text-gray-500">
            TOTAL EVENTS
          </span>

          <strong className="block text-3xl font-bold text-white mt-3">
            {createdEvents.length}
          </strong>

          <small className="text-xs text-gray-500">
            Events organized by you
          </small>
        </div>

        <div className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <span className="text-[10px] font-bold tracking-wider text-gray-500">
            ACTIVE PASSES
          </span>

          <strong className="block text-3xl font-bold text-white mt-3">
            {registeredEvents.length}
          </strong>

          <small className="text-xs text-gray-500">
            Registered events
          </small>
        </div>

        <div className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <span className="text-[10px] font-bold tracking-wider text-gray-500">
            TOTAL REGISTRATIONS
          </span>

          <strong className="block text-3xl font-bold text-white mt-3">
            {createdEvents.reduce(
              (total, event) =>
                total +
                (Number(event.registrations) || 0),
              0
            )}
          </strong>

          <small className="text-xs text-gray-500">
            Across your created events
          </small>
        </div>

        <div className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <span className="text-[10px] font-bold tracking-wider text-gray-500">
            UPCOMING EVENTS
          </span>

          <strong className="block text-3xl font-bold text-white mt-3">
            {counts.upcoming}
          </strong>

          <small className="text-xs text-gray-500">
            In your selected tab
          </small>
        </div>

      </section>

    </div>
  );
};

export default MyEvents;
