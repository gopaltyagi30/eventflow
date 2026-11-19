
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Radio,
} from "lucide-react";

import { useSelector } from "react-redux";

import EventCard from "../components/events/EventCard";
import FeaturedEvent from "../components/events/FeaturedEvent";

const categories = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Music",
  "Sports",
  "Workshops",
];

const DiscoverEvents = () => {
  const navigate = useNavigate();

  // Get events from Redux
  const eventsFromStore = useSelector(
    (state) => state.events?.events
  );

  const events = Array.isArray(eventsFromStore)
    ? eventsFromStore
    : [];

  // Total events
  const totalEvents = events.length;

  // Select an existing event for the spotlight
  const featuredEvent =
    events.find(
      (event) =>
        String(event.status || "").toLowerCase() === "published"
    ) || events[0];

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Open event details using actual Redux event ID
  const openEvent = (event) => {
    if (!event?.id) {
      console.error("Event ID is missing:", event);
      return;
    }

    navigate(`/main/events/${event.id}`);
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((event) =>
        [
          event.title,
          event.category,
          event.venue,
          event.location,
          event.organizer,
          event.description,
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        )
      );
    }

    // Category
    if (category !== "All") {
      result = result.filter(
        (event) =>
          String(event.category || "").toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Date: Current month
    if (dateFilter === "this-month") {
      const today = new Date();

      result = result.filter((event) => {
        const date = new Date(event.date);

        return (
          !isNaN(date.getTime()) &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      });
    }

    // Date: Next month
    if (dateFilter === "next-month") {
      const today = new Date();
      const nextMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        1
      );

      result = result.filter((event) => {
        const date = new Date(event.date);

        return (
          !isNaN(date.getTime()) &&
          date.getMonth() === nextMonth.getMonth() &&
          date.getFullYear() === nextMonth.getFullYear()
        );
      });
    }

    // Location
    if (locationFilter !== "all") {
      result = result.filter(
        (event) =>
          String(event.format || "").toLowerCase() ===
          locationFilter.toLowerCase()
      );
    }

    // Availability
    if (availability === "open") {
      result = result.filter((event) => {
        const capacity = Number(event.capacity) || 0;
        const registrations = Number(event.registrations) || 0;

        return capacity > registrations;
      });
    }

    if (availability === "available") {
      result = result.filter((event) => {
        const capacity = Number(event.capacity) || 0;
        const registrations = Number(event.registrations) || 0;
        const remaining = capacity - registrations;

        return remaining > 0 && remaining <= 20;
      });
    }

    // Sorting
    if (sortBy === "date") {
      result.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    if (sortBy === "popular") {
      result.sort(
        (a, b) =>
          (Number(b.registrations) || 0) -
          (Number(a.registrations) || 0)
      );
    }

    return result;
  }, [
    events,
    search,
    category,
    dateFilter,
    locationFilter,
    availability,
    sortBy,
  ]);

  // Clear filters
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setDateFilter("all");
    setLocationFilter("all");
    setAvailability("all");
    setSortBy("recommended");
  };

  const selectClass =
    "w-full sm:w-auto px-3 py-2.5 rounded-xl bg-[#18161f] border border-[#302c3a] text-sm text-gray-300 outline-none focus:border-purple-500 transition cursor-pointer";

  return (
    <div className="w-full min-h-screen text-[#f5f3fa]">

      {/* Page Heading */}
      <section className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] text-purple-400 mb-3">
            <Radio size={13} />
            DISCOVERY MATRIX
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Discover Events
          </h1>

          <p className="text-sm text-gray-400 mt-3 max-w-xl leading-relaxed">
            Find experiences, connect with people, and explore
            high-impact gatherings worldwide.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400 bg-[#18161f] border border-[#302c3a] rounded-xl px-4 py-3 w-fit">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

          Live Pipeline:

          <strong className="text-white">
            {totalEvents} Active Events
          </strong>
        </div>

      </section>

      {/* Search and Filters */}
      <section className="bg-[#18161f] border border-[#302c3a] rounded-2xl p-4 sm:p-5 mb-8">

        {/* Search */}
        <div className="flex items-center gap-3 bg-[#211e2b] border border-[#302c3a] rounded-xl px-4 py-3">

          <Search size={18} className="text-gray-400 shrink-0" />

          <input
            type="text"
            placeholder="Search events, topics or venues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-white transition"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

        </div>

        {/* Filters */}
        <div className="flex flex-col gap-5 mt-5">

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">

            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition ${
                  category === item
                    ? "bg-purple-600 text-white"
                    : "bg-[#211e2b] border border-[#302c3a] text-gray-400 hover:text-white hover:border-purple-500"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          {/* Select Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={selectClass}
            >
              <option value="all">Date: All Dates</option>
              <option value="this-month">Date: This Month</option>
              <option value="next-month">Date: Next Month</option>
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className={selectClass}
            >
              <option value="all">Location: All</option>
              <option value="In-Person">In-Person</option>
              <option value="Virtual">Virtual</option>
            </select>

            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className={selectClass}
            >
              <option value="all">Status: All Events</option>
              <option value="open">Open Seats Only</option>
              <option value="available">20 Seats or Less</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={selectClass}
            >
              <option value="recommended">Recommended</option>
              <option value="date">Sort: Date</option>
              <option value="popular">Most Popular</option>
            </select>

          </div>

        </div>
      </section>

      {/* Featured Spotlight */}
      {featuredEvent && (
        <>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[2px] text-gray-500 mb-4">
            <span>CURATED FOR YOU</span>
            <span className="text-purple-500">•</span>
            <span>FEATURED SPOTLIGHT</span>
          </div>

          <div className="mb-10">
            <FeaturedEvent
              event={featuredEvent}
              onExplore={openEvent}
            />
          </div>
        </>
      )}

      {/* All Events Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">

        <div>
          <h2 className="text-xl font-bold">
            Explore All Events
          </h2>

          <span className="text-xs text-gray-400 mt-1 block">
            {filteredEvents.length} events found
          </span>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#18161f] border border-[#302c3a] text-sm text-gray-300 hover:text-white hover:border-purple-500 transition w-fit"
        >
          <SlidersHorizontal size={14} />
          Clear Filters
        </button>

      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={openEvent}
            />
          ))
        ) : (
          <div className="col-span-full bg-[#18161f] border border-[#302c3a] rounded-2xl p-10 text-center">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#211e2b] flex items-center justify-center text-gray-400 mb-4">
              <Search size={26} />
            </div>

            <h3 className="text-lg font-semibold text-white">
              No events found
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              Try changing your search or filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-sm font-semibold text-white transition"
            >
              Clear all filters
            </button>

          </div>
        )}

      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#302c3a] mt-10 pt-5 pb-3 text-[10px] font-semibold tracking-wider text-gray-500">

        <span>EVENTFLOW · DISCOVERY NETWORK</span>

        <span className="flex items-center gap-2">
          <ArrowUpDown size={12} />
          Explore your next experience
        </span>

      </div>

    </div>
  );
};

export default DiscoverEvents;
