import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registrations } from "../data/dashboardData";

import {
  Search,
  Plus,
  Download,
  CalendarDays,
  Users,
  CheckCircle2,
  Radio,
  ChevronDown,
  MapPin,
  Eye,
  Pencil,
  Trash2,
  X,
  QrCode,
  Bell,
  SlidersHorizontal,
} from "lucide-react";

import { deleteEvent } from "../features/events/eventsSlice";

// Normalize owner values so email/name comparisons are consistent.
const normalizeOwner = (value) =>
  String(value || "").trim().toLowerCase();

// Helper functions
const getDate = (event) =>
  event?.date ? new Date(event.date) : null;

const getStatus = (event) => {
  const value = String(event?.status || "Published").toLowerCase();

  if (value.includes("cancel")) return "Cancelled";
  if (value.includes("draft")) return "Draft";

  const eventDate = getDate(event);

  if (
    value.includes("complete") ||
    (eventDate &&
      !Number.isNaN(eventDate.getTime()) &&
      eventDate < new Date())
  ) {
    return "Completed";
  }

  return "Published";
};

const getCapacity = (event) =>
  Math.max(0, Number(event?.capacity) || 0);

const getRegistrations = (event) =>
  Math.max(0, Number(event?.registrations) || 0);

const formatDate = (date) => {
  if (!date) return "Date not set";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? String(date)
    : parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
};

const formatTime = (time) => time || "Time not set";

const ManageEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get events and the currently logged-in user from Redux.
  const eventsFromStore = useSelector(
    (state) => state.events?.events
  );

  const user = useSelector((state) => state.auth?.user);

  const userEmail = normalizeOwner(user?.email);
  const userName = normalizeOwner(user?.fullName || user?.name);

  const events = Array.isArray(eventsFromStore)
    ? eventsFromStore
    : [];

  // Local states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [selectedId, setSelectedId] = useState(null);
  const [attendeeSearch, setAttendeeSearch] = useState("");
  const [showAttendees, setShowAttendees] = useState(true);

  // Show events owned by the logged-in user.
  // createdBy should contain the user's email; organizer is kept as a
  // fallback for older events that only saved the organizer's name.
  const managedEvents = useMemo(() => {
    if (!userEmail && !userName) return [];

    return events.filter((event) => {
      const createdBy = normalizeOwner(event?.createdBy);
      const createdByEmail = normalizeOwner(event?.createdByEmail);
      const organizerEmail = normalizeOwner(event?.organizerEmail);
      const organizer = normalizeOwner(event?.organizer);

      return (
        (userEmail &&
          (createdBy === userEmail ||
            createdByEmail === userEmail ||
            organizerEmail === userEmail)) ||
        (userName &&
          (createdBy === userName || organizer === userName))
      );
    });
  }, [events, userEmail, userName]);

  // Categories belonging to your events
  const categories = useMemo(() => {
    return [
      ...new Set(
        managedEvents
          .map((event) => event.category)
          .filter(Boolean)
      ),
    ];
  }, [managedEvents]);

  // Search, filter and sort events
  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = managedEvents.filter((event) => {
      const status = getStatus(event);

      const matchesSearch =
        !query ||
        [
          event.title,
          event.venue,
          event.city,
          event.id,
          event.category,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        );

      const matchesStatus =
        statusFilter === "All" || status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        event.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "registrations") {
        return getRegistrations(b) - getRegistrations(a);
      }

      if (sortBy === "capacity") {
        return getCapacity(b) - getCapacity(a);
      }

      const aDate = getDate(a)?.getTime() || 0;
      const bDate = getDate(b)?.getTime() || 0;

      return sortBy === "oldest"
        ? aDate - bDate
        : bDate - aDate;
    });
  }, [
    managedEvents,
    search,
    statusFilter,
    categoryFilter,
    sortBy,
  ]);

  // Keep selected event valid after deletion
  const selectedEvent =
    managedEvents.find(
      (event) => String(event.id) === String(selectedId)
    ) ||
    filteredEvents[0] ||
    managedEvents[0] ||
    null;

  // Statistics
  const totalRegistrations = managedEvents.reduce(
    (sum, event) => sum + getRegistrations(event),
    0
  );

  const publishedCount = managedEvents.filter(
    (event) => getStatus(event) === "Published"
  ).length;

  const completedCount = managedEvents.filter(
    (event) => getStatus(event) === "Completed"
  ).length;

  // Delete event
  const handleDeleteEvent = (event) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${event.title}"? This action cannot be undone.`
    );

    if (!confirmDelete) return;

    dispatch(deleteEvent(event.id));

    const remainingEvents = managedEvents.filter(
      (item) => String(item.id) !== String(event.id)
    );

    setSelectedId(remainingEvents[0]?.id ?? null);

    window.alert("Event deleted successfully!");
  };

  // Demo attendee data
  const attendees = registrations.filter((person) =>
    `${person.name} ${person.email}`
      .toLowerCase()
      .includes(attendeeSearch.toLowerCase())
  );

  // Export CSV
  const exportCSV = () => {
    if (!filteredEvents.length) {
      window.alert("There are no events to export.");
      return;
    }

    const headers = [
      "Event ID",
      "Title",
      "Category",
      "Date",
      "Venue",
      "Registrations",
      "Capacity",
      "Status",
    ];

    const rows = filteredEvents.map((event) => [
      event.id,
      event.title,
      event.category,
      event.date,
      event.venue,
      getRegistrations(event),
      getCapacity(event),
      getStatus(event),
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (cell) =>
              `"${String(cell ?? "").replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "eventflow-event-roster.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // Common styles
  const selectClass =
    "w-full appearance-none rounded-xl border border-[#302c3a] bg-[#18161f] px-4 py-3 pr-10 text-sm text-gray-300 outline-none transition focus:border-purple-500";

  const actionButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-[#302c3a] bg-[#211e2b] text-gray-400 transition hover:border-purple-500 hover:text-white";

  const secondaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-[#393344] bg-[#211e2b] px-4 py-3 text-sm font-semibold text-gray-300 transition hover:border-purple-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40";

  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700";

  return (
    <div className="w-full min-h-screen text-[#f5f3fa]">

      {/* PAGE HEADING */}
      <section className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Manage Events
            </h1>

            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold tracking-wider">
              WORKSPACE HUB
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-3 max-w-2xl leading-relaxed">
            Manage your events, track ticketing, monitor check-ins
            and coordinate attendees.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          <button
            className={secondaryButtonClass}
            onClick={exportCSV}
            disabled={!filteredEvents.length}
          >
            <Download size={17} />
            Export Roster / CSV
          </button>

          <button
            className={primaryButtonClass}
            onClick={() => navigate("/main/create")}
          >
            <Plus size={18} />
            Create New Event
          </button>

        </div>
      </section>

      {/* STATISTICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 mb-8">

        {/* Total Events */}
        <article className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-400">
              Total Created Events
            </span>

            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <CalendarDays size={19} />
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 mt-5">
            <strong className="text-3xl font-bold">
              {managedEvents.length}
            </strong>

            <span className="text-[11px] text-purple-400">
              Your workspace
            </span>
          </div>
        </article>

        {/* Published Events */}
        <article className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-400">
              Published Events
            </span>

            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <Radio size={19} />
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 mt-5">
            <strong className="text-3xl font-bold">
              {publishedCount}
            </strong>

            <span className="text-[11px] text-green-400">
              Active pipeline
            </span>
          </div>
        </article>

        {/* Total Registrations */}
        <article className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-400">
              Total Registrations
            </span>

            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Users size={19} />
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 mt-5">
            <strong className="text-3xl font-bold">
              {totalRegistrations.toLocaleString()}
            </strong>

            <span className="text-[11px] text-purple-400">
              Across your events
            </span>
          </div>
        </article>

        {/* Completed Events */}
        <article className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-400">
              Completed Events
            </span>

            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <CheckCircle2 size={19} />
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 mt-5">
            <strong className="text-3xl font-bold">
              {completedCount}
            </strong>

            <span className="text-[11px] text-gray-400">
              Archived events
            </span>
          </div>
        </article>

      </section>

      {/* SEARCH AND FILTERS */}
      <section className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.6fr)_minmax(140px,1fr)_minmax(160px,1fr)_minmax(190px,1.2fr)] gap-3">

          {/* Search */}
          <label className="flex items-center gap-3 rounded-xl border border-[#302c3a] bg-[#211e2b] px-4 py-3 focus-within:border-purple-500 transition">
            <Search size={18} className="text-gray-400 shrink-0" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event name, venue, or ID..."
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-500 hover:text-white"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </label>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={selectClass}
            >
              {[
                "All",
                "Published",
                "Draft",
                "Completed",
                "Cancelled",
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={selectClass}
            >
              <option value="All">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Sorting */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={selectClass}
            >
              <option value="newest">Date: Newest First</option>
              <option value="oldest">Date: Oldest First</option>
              <option value="capacity">Capacity: Highest</option>
              <option value="registrations">
                Registrations: Highest
              </option>
            </select>

            <SlidersHorizontal
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-[#302c3a]">
          <span className="text-xs text-gray-400">
            Showing{" "}
            <strong className="text-white">
              {filteredEvents.length}
            </strong>{" "}
            of{" "}
            <strong className="text-white">
              {managedEvents.length}
            </strong>{" "}
            events
          </span>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setCategoryFilter("All");
              setSortBy("newest");
            }}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition"
          >
            Reset Filters
          </button>
        </div>

      </section>

      {/* MAIN WORKSPACE */}
      <section className="grid grid-cols-1 2xl:grid-cols-[minmax(0,1.8fr)_minmax(300px,0.85fr)] gap-6 items-start">

        {/* EVENT TABLE */}
        <div className="min-w-0 bg-[#18161f] border border-[#302c3a] rounded-2xl overflow-hidden">

          {managedEvents.length > 0 ? (
            <>
              {/* Desktop Table Header */}
              <div className="hidden xl:grid grid-cols-[minmax(190px,1.5fr)_minmax(130px,1fr)_minmax(120px,1fr)_minmax(100px,0.9fr)_minmax(100px,0.8fr)_110px] gap-3 px-5 py-4 bg-[#211e2b] border-b border-[#302c3a] text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                <span>Event</span>
                <span>Date &amp; Schedule</span>
                <span>Venue</span>
                <span>Registrations</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {/* Event Rows */}
              {filteredEvents.length > 0 ? (
                <div className="divide-y divide-[#302c3a]">

                  {filteredEvents.map((event) => {
                    const capacity = getCapacity(event);
                    const registrationCount =
                      getRegistrations(event);

                    const fill = capacity
                      ? Math.min(
                          100,
                          (registrationCount / capacity) * 100
                        )
                      : 0;

                    const status = getStatus(event);

                    const isSelected =
                      String(selectedEvent?.id) ===
                      String(event.id);

                    const statusStyles = {
                      published:
                        "bg-green-500/10 text-green-400 border-green-500/20",
                      draft:
                        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                      completed:
                        "bg-blue-500/10 text-blue-400 border-blue-500/20",
                      cancelled:
                        "bg-red-500/10 text-red-400 border-red-500/20",
                    };

                    return (
                      <article
                        key={event.id}
                        onClick={() => setSelectedId(event.id)}
                        className={`grid grid-cols-1 xl:grid-cols-[minmax(190px,1.5fr)_minmax(130px,1fr)_minmax(120px,1fr)_minmax(100px,0.9fr)_minmax(100px,0.8fr)_110px] gap-4 xl:gap-3 items-center p-5 cursor-pointer transition ${
                          isSelected
                            ? "bg-purple-500/[0.06] border-l-2 border-l-purple-500"
                            : "hover:bg-[#211e2b]/70 border-l-2 border-l-transparent"
                        }`}
                      >

                        {/* Event Info */}
                        <div className="flex items-center gap-3 min-w-0">

                          <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden bg-[#25212f] border border-[#393344] flex items-center justify-center text-purple-400">
                            {event.cover ? (
                              <img
                                src={event.cover}
                                alt={event.title || "Event cover"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <CalendarDays size={21} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <strong className="block text-sm font-semibold text-white truncate">
                              {event.title || "Untitled event"}
                            </strong>

                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="px-2 py-1 rounded-md bg-[#25212f] text-[10px] text-purple-300">
                                {event.category || "General"}
                              </span>

                              <small className="text-[10px] text-gray-500">
                                #{event.id ?? "—"}
                              </small>
                            </div>
                          </div>

                        </div>

                        {/* Date */}
                        <div>
                          <strong className="block text-xs font-medium text-gray-200">
                            {formatDate(event.date)}
                          </strong>

                          <small className="block text-[11px] text-gray-500 mt-1">
                            {formatTime(event.startTime)}
                            {event.endTime
                              ? ` – ${event.endTime}`
                              : ""}
                          </small>
                        </div>

                        {/* Venue */}
                        <div className="min-w-0">
                          <strong className="block text-xs font-medium text-gray-200 truncate">
                            {event.venue || "Venue not set"}
                          </strong>

                          <small className="block text-[11px] text-gray-500 mt-1 truncate">
                            {[
                              event.city,
                              event.format,
                            ]
                              .filter(Boolean)
                              .join(" / ") || "Location pending"}
                          </small>
                        </div>

                        {/* Registrations */}
                        <div>
                          <div className="flex items-center justify-between gap-2 text-[11px] mb-2">
                            <span className="text-gray-300">
                              {registrationCount} / {capacity || "—"}
                            </span>

                            <span className="text-gray-500">
                              {capacity ? `${fill.toFixed(0)}%` : "—"}
                            </span>
                          </div>

                          <div className="w-full h-1.5 rounded-full bg-[#302c3a] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-purple-500"
                              style={{ width: `${fill}%` }}
                            />
                          </div>
                        </div>

                        {/* Status */}
                        <div>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-semibold ${
                              statusStyles[status.toLowerCase()]
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {status}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">

                          <button
                            title="View event"
                            aria-label="View event"
                            className={actionButtonClass}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/main/events/${event.id}`);
                            }}
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            title="Edit event"
                            aria-label="Edit event"
                            className={actionButtonClass}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/main/edit-event/${event.id}`);
                            }}
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            title="Delete event"
                            aria-label="Delete event"
                            className={`${actionButtonClass} hover:border-red-500/50 hover:text-red-400`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(event);
                            }}
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>

                        {/* Mobile Information */}
                        <div className="xl:hidden col-span-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#302c3a]">

                          <span className="flex items-center gap-2 text-xs text-gray-400">
                            <CalendarDays size={14} className="text-purple-400" />
                            {formatDate(event.date)}
                          </span>

                          <span className="flex items-center gap-2 text-xs text-gray-400 min-w-0">
                            <MapPin size={14} className="text-purple-400 shrink-0" />
                            <span className="truncate">
                              {event.venue || "Venue not set"}
                            </span>
                          </span>

                          <span className="flex items-center gap-2 text-xs text-gray-400">
                            <Users size={14} className="text-purple-400" />
                            {registrationCount} / {capacity || "—"} registrations
                          </span>

                        </div>

                      </article>
                    );
                  })}

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 px-5">
                  <Search size={30} className="text-gray-500 mb-4" />

                  <strong className="text-white font-semibold">
                    No matching events found
                  </strong>

                  <p className="text-sm text-gray-400 mt-2">
                    Try changing your search or filters.
                  </p>

                  <button
                    className={`${secondaryButtonClass} mt-5`}
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All");
                      setCategoryFilter("All");
                      setSortBy("newest");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              <div className="px-5 py-4 border-t border-[#302c3a] text-xs text-gray-500">
                Displaying {filteredEvents.length} event
                {filteredEvents.length === 1 ? "" : "s"}
              </div>
            </>
          ) : (
            /* No Events Empty State */
            <div className="flex flex-col items-center justify-center text-center px-5 py-16">

              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 mb-5">
                <CalendarDays size={32} />
              </div>

              <strong className="text-lg font-semibold text-white">
                You haven't created any events yet!
              </strong>

              <p className="text-sm text-gray-400 mt-2 max-w-sm leading-relaxed">
                Your created events will appear here. Start by
                creating your first event.
              </p>

              <button
                className={`${primaryButtonClass} mt-6`}
                onClick={() => navigate("/main/create-event")}
              >
                <Plus size={17} />
                Create Your First Event
              </button>

            </div>
          )}

        </div>

        {/* ATTENDEE PANEL */}
        <aside className="min-w-0 bg-[#18161f] border border-[#302c3a] rounded-2xl overflow-hidden">

          {/* Panel Header */}
          <div className="flex items-start justify-between gap-3 p-5 border-b border-[#302c3a]">

            <div className="min-w-0">
              <span className="text-[9px] font-bold tracking-[1.5px] text-purple-400">
                ACTIVE MANAGEMENT CONTEXT
              </span>

              <h2 className="text-base font-semibold text-white mt-2 break-words">
                {selectedEvent?.title || "No event selected"}
              </h2>
            </div>

            <button
              className={actionButtonClass}
              aria-label="Toggle attendee panel"
              onClick={() => setShowAttendees(!showAttendees)}
            >
              {showAttendees ? (
                <X size={17} />
              ) : (
                <Users size={17} />
              )}
            </button>

          </div>

          {showAttendees && (
            selectedEvent ? (
              <div className="p-5">

                {/* Attendee Summary */}
                <div className="flex flex-wrap items-center gap-2 mb-4">

                  <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-semibold">
                    {getRegistrations(selectedEvent)} Total
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px] font-semibold">
                    18 VIP Pass
                  </span>

                  <span className="px-3 py-1.5 rounded-full bg-[#25212f] text-gray-400 text-[10px] font-semibold">
                    General
                  </span>

                </div>

                {/* Scan Count */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                  <QrCode size={15} className="text-purple-400" />
                  142 Scanned
                </div>

                {/* Attendee Search */}
                <label className="flex items-center gap-2 rounded-xl bg-[#211e2b] border border-[#302c3a] px-3 py-3 focus-within:border-purple-500 transition">
                  <Search size={16} className="text-gray-500 shrink-0" />

                  <input
                    value={attendeeSearch}
                    onChange={(e) => setAttendeeSearch(e.target.value)}
                    placeholder="Search attendees by name or email..."
                    className="w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-gray-500"
                  />

                  {attendeeSearch && (
                    <button
                      onClick={() => setAttendeeSearch("")}
                      aria-label="Clear attendee search"
                      className="text-gray-500 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>

                {/* Attendee List */}
                <div className="space-y-4 mt-5">

                  {attendees.map((person) => {
                    const initials = person.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("");

                    const attendeeStatus = person.status
                      .toLowerCase()
                      .replaceAll(" ", "-");

                    return (
                      <div
                        className="flex items-start gap-3"
                        key={person.email}
                      >

                        <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold">
                          {initials}
                        </div>

                        <div className="flex-1 min-w-0">
                          <strong className="block text-xs font-semibold text-white truncate">
                            {person.name}
                          </strong>

                          <small className="block text-[10px] text-gray-500 truncate mt-1">
                            {person.email}
                          </small>

                          <small className="block text-[10px] text-gray-500 mt-1">
                            {person.time}
                          </small>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className={`px-2 py-1 rounded-md text-[9px] font-semibold bg-green-500/10 text-green-400 ${attendeeStatus === "pending" ? "bg-yellow-500/10 text-yellow-400" : ""} ${attendeeStatus === "cancelled" ? "bg-red-500/10 text-red-400" : ""}`}>
                            {person.status}
                          </span>

                          <small className="text-[9px] text-gray-500">
                            {person.action}
                          </small>
                        </div>

                      </div>
                    );
                  })}

                  {!attendees.length && (
                    <p className="text-center text-xs text-gray-500 py-8">
                      No matching attendees.
                    </p>
                  )}

                </div>

                {/* Attendee Actions */}
                <div className="flex flex-col gap-3 mt-6 pt-5 border-t border-[#302c3a]">

                  <button
                    className={secondaryButtonClass}
                    onClick={exportCSV}
                  >
                    <Download size={16} />
                    Export Roster
                  </button>

                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/10 px-4 py-3 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
                    onClick={() =>
                      window.alert(
                        "Broadcast notice UI can be connected to your backend later."
                      )
                    }
                  >
                    <Bell size={16} />
                    Broadcast Notice
                  </button>

                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center text-center px-5 py-12">
                <Users size={30} className="text-gray-500 mb-3" />

                <strong className="text-sm text-white">
                  No event selected
                </strong>

                <p className="text-xs text-gray-500 mt-2">
                  Create an event to start managing attendees.
                </p>
              </div>
            )
          )}

        </aside>

      </section>
    </div>
  );
};

export default ManageEvents;