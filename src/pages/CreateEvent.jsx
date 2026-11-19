
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { addEvent, updateEvent } from "../features/events/eventsSlice";
import LocationPicker from "../components/events/LocationPicker";

import {
  Eye,
  Bookmark,
  CalendarDays,
  MapPin,
  Users,
  ImagePlus,
  Trash2,
  Clock,
  Building2,
  MapPinned,
  Armchair,
  AlarmClock,
  UserRound,
  Mail,
  MessageCircle,
  CheckCircle2,
  Circle,
  Database,
  Smartphone,
  CloudUpload,
  ArrowRight,
  Save,
  LockKeyhole,
} from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-[#302c3a] bg-[#211e2b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10";

const labelClass = "mb-2 block text-sm font-medium text-gray-300";

const sectionClass =
  "rounded-2xl border border-[#302c3a] bg-[#18161f] p-5 sm:p-6";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#393247] bg-[#211e2b] px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-violet-500/40 hover:bg-[#292434] hover:text-white";

const CreateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Detect create or edit mode
  const isEditMode = Boolean(eventId);

  // Find existing event from Redux
  const eventToEdit = useSelector((state) =>
    state.events.events.find(
      (event) => String(event.id) === String(eventId)
    )
  );
  const user = useSelector((state) => state.auth?.user);

  // Location state
  const [eventLocation, setEventLocation] = useState({
    lat: null,
    lng: null,
  });

  // Form state
  const [form, setForm] = useState({
    title: "",
    category: "Technology",
    audience: "Public Listed",
    description: "",
    date: "",
    startTime: "09:00",
    endTime: "17:30",
    multiDay: false,
    format: "In-Person",
    venue: "",
    city: "",
    address: "",
    capacity: "500",
    deadline: "",
    waitlist: true,
    organizer: "Alex Morgan",
    email: "",
    support: "",
  });

  const [cover, setCover] = useState("");
  const [coverName, setCoverName] = useState("");

  // Prefill form when editing
  useEffect(() => {
    if (!isEditMode || !eventToEdit) return;

    setForm({
      title: eventToEdit.title || "",
      category: eventToEdit.category || "Technology",
      audience: eventToEdit.audience || "Public Listed",
      description: eventToEdit.description || "",
      date: eventToEdit.date || "",
      startTime: eventToEdit.startTime || "09:00",
      endTime: eventToEdit.endTime || "17:30",
      multiDay: eventToEdit.multiDay ?? false,
      format: eventToEdit.format || "In-Person",
      venue: eventToEdit.venue || "",
      city: eventToEdit.city || "",
      address: eventToEdit.address || "",
      capacity: String(eventToEdit.capacity ?? "500"),
      deadline: eventToEdit.deadline || "",
      waitlist: eventToEdit.waitlist ?? true,
      organizer: eventToEdit.organizer || "Alex Morgan",
      email: eventToEdit.email || "",
      support: eventToEdit.support || "",
    });

    setCover(eventToEdit.cover || "");
    setCoverName("");

    setEventLocation(
      eventToEdit.location || { lat: null, lng: null }
    );
  }, [isEditMode, eventToEdit]);

  // Update form fields
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Upload event cover
  const handleCover = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      alert("Image must be smaller than 1MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setCover(reader.result);
      setCoverName(file.name);
    };

    reader.onerror = () => {
      alert("Unable to read the image.");
    };

    reader.readAsDataURL(file);
  };

  // Remove event cover
  const removeCover = () => {
    setCover("");
    setCoverName("");
  };

  // Required section completion
  const completionItems = [
    Boolean(form.title.trim() && form.category),

    Boolean(
      form.date &&
      form.startTime &&
      form.endTime
    ),

    Boolean(
      form.format === "Simulcast" ||
      (form.venue.trim() && form.city.trim())
    ),

    Boolean(
      Number(form.capacity) > 0 &&
      form.deadline
    ),

    Boolean(
      form.organizer.trim() &&
      form.email.trim()
    ),
  ];

  const completedCount = completionItems.filter(Boolean).length;
  const readiness = Math.round((completedCount / 5) * 100);

  // Save local draft
  const handleSaveDraft = () => {
    localStorage.setItem(
      "eventflowDraft",
      JSON.stringify(form)
    );

    alert("Event draft saved locally!");
  };

  // Publish or update event

const handlePublish = (e) => {
  e.preventDefault();

  if (completedCount !== 5) {
    alert(
      "Please complete the five required sections before publishing."
    );
    return;
  }

  if (!isEditMode && !user) {
    alert("Please login before creating an event.");
    return;
  }

  if (isEditMode && !eventToEdit) {
    alert("Event not found. Please try again.");
    return;
  }

  const userEmail = String(user?.email || "")
    .trim()
    .toLowerCase();

  const userName = String(
    user?.fullName || user?.name || ""
  ).trim();

  const eventData = {
    ...form,

    id: isEditMode ? eventToEdit.id : Date.now(),

    capacity: Number(form.capacity),

    cover,

    location: eventLocation,

    status: isEditMode
      ? eventToEdit.status || "Published"
      : "Published",

    registrations: isEditMode
      ? eventToEdit.registrations ?? 0
      : 0,

    createdBy: isEditMode
      ? eventToEdit.createdBy || userEmail || userName
      : userEmail || userName,

    createdByEmail: isEditMode
      ? eventToEdit.createdByEmail || userEmail
      : userEmail,

    organizerEmail: isEditMode
      ? eventToEdit.organizerEmail || userEmail
      : userEmail,

    createdByName: isEditMode
      ? eventToEdit.createdByName || userName
      : userName,
  };

  try {
    // IMPORTANT: Dispatch the event to Redux
    if (isEditMode) {
      dispatch(updateEvent(eventData));
    } else {
      dispatch(addEvent(eventData));
    }

    // Verify that the event was saved
    const savedEvents = JSON.parse(
      localStorage.getItem("events") || "[]"
    );

    const eventExists = savedEvents.some(
      (event) => String(event.id) === String(eventData.id)
    );

    if (!eventExists) {
      throw new Error("Event could not be saved to localStorage.");
    }

    alert(
      isEditMode
        ? "Event updated successfully!"
        : "Event published successfully!"
    );

    navigate("/main/manage-events");

  } catch (error) {
    console.error("Event publishing error:", error);

    alert(
      "Unable to save event. Check the browser console for details."
    );
  }
};


  // Invalid event ID protection
  if (isEditMode && !eventToEdit) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <LockKeyhole size={28} />
        </div>

        <h2 className="text-2xl font-bold text-white">
          Event Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The event you're trying to edit does not exist.
        </p>

        <button
          type="button"
          onClick={() => navigate("/main/manage-events")}
          className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Back to Manage Events
        </button>
      </div>
    );
  }

  const formattedDate = form.date
    ? new Date(`${form.date}T00:00:00`).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    : "Event date";

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 text-white">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">

        <div>
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold tracking-[2px] text-violet-400">
              EVENT FORGE
            </span>

            <span className="text-gray-600">•</span>

            <span className="flex items-center gap-2 text-[10px] font-semibold tracking-wider text-green-400">
              <span className="h-2 w-2 rounded-full bg-green-400"></span>
              {isEditMode ? "EDITING EVENT" : "LOCAL DRAFT MODE"}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {isEditMode ? "Edit Event" : "Create New Event"}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            {isEditMode
              ? "Update your event details, schedule and logistics."
              : "Fill in structured metadata and logistics to bring your next event to life."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className={secondaryButton}
            onClick={() =>
              document
                .getElementById("event-preview")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Eye size={16} />
            Live Preview
          </button>

          <button
            type="button"
            className={secondaryButton}
            onClick={handleSaveDraft}
          >
            <Bookmark size={16} />
            Save Draft
          </button>
        </div>

      </div>

      {/* MAIN WORKSPACE */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

        {/* LEFT FORM */}
        <form
          className="min-w-0 space-y-6"
          onSubmit={handlePublish}
        >

          {/* SECTION A: BASIC INFORMATION */}
          <section className={sectionClass}>

            <div className="mb-7 flex flex-wrap items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-violet-400">
                A
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  Basic Information
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Core title, category and promotional cover
                </p>
              </div>

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold text-violet-400">
                REQUIRED
              </span>
            </div>

            {/* Event Title */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="event-title" className={labelClass}>
                  Event Title
                </label>

                <span className="text-xs text-gray-600">
                  {form.title.length} / 120
                </span>
              </div>

              <input
                id="event-title"
                maxLength={120}
                placeholder="e.g. Global AI & Next-Gen Systems Summit 2026"
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
                className={inputClass}
                required
              />
            </div>

            {/* Category and Audience */}
            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label className={labelClass}>
                  Event Category
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
                  className={inputClass}
                >
                  <option>Technology</option>
                  <option>Business</option>
                  <option>Design</option>
                  <option>Music</option>
                  <option>Workshops</option>
                  <option>Sports</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Audience Scope
                </label>

                <div className="flex rounded-xl border border-[#302c3a] bg-[#211e2b] p-1">
                  {["Public Listed", "Private Invite"].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => updateField("audience", item)}
                      className={`flex-1 rounded-lg px-2 py-3 text-xs font-medium transition ${
                        form.audience === item
                          ? "bg-violet-600 text-white shadow-lg"
                          : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Description */}
            <div className="mb-6">
              <label htmlFor="event-description" className={labelClass}>
                Event Description
              </label>

              <textarea
                id="event-description"
                rows={5}
                placeholder="Outline the event agenda, speakers, activities and attendance requirements..."
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Cover Upload */}
            <div>
              <label className={labelClass}>
                Event Cover Banner
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_180px]">

                <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#484052] bg-[#211e2b]/50 p-5 text-center transition hover:border-violet-500 hover:bg-violet-500/5">

                  <CloudUpload size={32} className="mb-3 text-violet-400" />

                  <strong className="text-sm text-gray-200">
                    Drag & drop event artwork
                  </strong>

                  <span className="mt-2 text-xs text-gray-500">
                    PNG, JPG or WebP up to 1MB
                  </span>

                  <span className="mt-4 rounded-lg bg-violet-600/15 px-4 py-2 text-xs font-semibold text-violet-400">
                    Browse Files
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleCover}
                    hidden
                  />
                </label>

                {/* Image Preview */}
                <div className="relative flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-[#302c3a] bg-[#211e2b]">

                  {cover ? (
                    <>
                      <img
                        src={cover}
                        alt="Event cover preview"
                        className="h-full min-h-48 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={removeCover}
                        aria-label="Remove cover"
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-black/70 text-white transition hover:bg-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-600">
                      <ImagePlus size={30} />
                      <span className="text-xs">
                        No cover selected
                      </span>
                    </div>
                  )}

                </div>

              </div>

              {coverName && (
                <p className="mt-2 truncate text-xs text-gray-500">
                  Selected: {coverName}
                </p>
              )}
            </div>

          </section>

          {/* SECTION B: SCHEDULE */}
          <section className={sectionClass}>

            <div className="mb-7 flex flex-wrap items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-violet-400">
                B
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  Schedule & Temporal Bounds
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Set the event date and session timings
                </p>
              </div>

              <span className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold text-blue-400">
                <Clock size={13} />
                LOCAL TIME
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              <div>
                <label htmlFor="event-date" className={labelClass}>
                  Event Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="event-date"
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      updateField("date", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="start-time" className={labelClass}>
                  Start Time
                </label>

                <input
                  id="start-time"
                  type="time"
                  value={form.startTime}
                  onChange={(e) =>
                    updateField("startTime", e.target.value)
                  }
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label htmlFor="end-time" className={labelClass}>
                  End Time
                </label>

                <input
                  id="end-time"
                  type="time"
                  value={form.endTime}
                  onChange={(e) =>
                    updateField("endTime", e.target.value)
                  }
                  className={inputClass}
                  required
                />
              </div>

            </div>

            {/* Multi-day Toggle */}
            <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#302c3a] bg-[#211e2b]/60 p-4">

              <div className="flex items-center gap-3">
                <CalendarDays size={20} className="text-violet-400" />

                <div>
                  <strong className="block text-sm font-medium">
                    Multi-day Track Schedule
                  </strong>
                  <span className="mt-1 block text-xs text-gray-500">
                    Allow sessions to span multiple days
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={form.multiDay}
                onChange={(e) =>
                  updateField("multiDay", e.target.checked)
                }
                className="h-5 w-5 accent-violet-600"
              />

            </label>

          </section>

          {/* SECTION C: LOCATION */}
          <section className={sectionClass}>

            <div className="mb-7 flex flex-col gap-4">

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-violet-400">
                  C
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    Location & Delivery Vector
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Physical destination or virtual broadcast
                  </p>
                </div>
              </div>

              {/* Event Format */}
              <div className="flex flex-wrap gap-2">
                {["In-Person", "Simulcast", "Hybrid"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => updateField("format", item)}
                    className={`rounded-lg border px-4 py-2.5 text-xs font-medium transition ${
                      form.format === item
                        ? "border-violet-500 bg-violet-600/15 text-violet-400"
                        : "border-[#393247] bg-[#211e2b] text-gray-500 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label htmlFor="venue" className={labelClass}>
                  Venue Name
                </label>

                <div className="relative">
                  <Building2
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="venue"
                    placeholder="e.g. Moscone Center West"
                    value={form.venue}
                    onChange={(e) =>
                      updateField("venue", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="city" className={labelClass}>
                  City & Region
                </label>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="city"
                    placeholder="e.g. San Francisco, CA"
                    value={form.city}
                    onChange={(e) =>
                      updateField("city", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

            </div>

            <div className="mt-5">
              <label htmlFor="address" className={labelClass}>
                Street Address
              </label>

              <div className="relative">
                <MapPinned
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="address"
                  placeholder="Enter complete street address"
                  value={form.address}
                  onChange={(e) =>
                    updateField("address", e.target.value)
                  }
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            {/* Location Picker */}
            <div className="mt-6">
              <LocationPicker
                onLocationSelect={(coordinates) => {
                  setEventLocation(coordinates);
                }}
              />
            </div>

          </section>

          {/* SECTION D: REGISTRATION */}
          <section className={sectionClass}>

            <div className="mb-7 flex flex-wrap items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-violet-400">
                D
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  Registration Dynamics & Quotas
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Capacity limits, registration deadline and waitlist
                </p>
              </div>

              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[10px] font-semibold text-green-400">
                AUTOMATED QUEUING
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label htmlFor="capacity" className={labelClass}>
                  Maximum Attendee Capacity
                </label>

                <div className="relative">
                  <Armchair
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="capacity"
                    type="number"
                    min="1"
                    value={form.capacity}
                    onChange={(e) =>
                      updateField("capacity", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className={labelClass}>
                  Registration Deadline
                </label>

                <div className="relative">
                  <AlarmClock
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="deadline"
                    type="datetime-local"
                    value={form.deadline}
                    onChange={(e) =>
                      updateField("deadline", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

            </div>

            {/* Waitlist Toggle */}
            <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-[#302c3a] bg-[#211e2b]/60 p-4">

              <div className="flex items-center gap-3">
                <Users size={20} className="text-violet-400" />

                <div>
                  <strong className="block text-sm font-medium">
                    Autonomous Waitlist Queue
                  </strong>
                  <span className="mt-1 block text-xs text-gray-500">
                    Allow attendees to join a waitlist when capacity is full
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                checked={form.waitlist}
                onChange={(e) =>
                  updateField("waitlist", e.target.checked)
                }
                className="h-5 w-5 accent-violet-600"
              />

            </label>

          </section>

          {/* SECTION E: ORGANIZER */}
          <section className={sectionClass}>

            <div className="mb-7 flex flex-wrap items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-violet-400">
                E
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold">
                  Organizer Authority & Escalation
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Designated operational point of contact
                </p>
              </div>

              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1.5 text-[10px] font-semibold text-green-400">
                VERIFIED HOST
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <div>
                <label htmlFor="organizer" className={labelClass}>
                  Lead Organizer
                </label>

                <div className="relative">
                  <UserRound
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="organizer"
                    value={form.organizer}
                    onChange={(e) =>
                      updateField("organizer", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Escalation Email
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="organizer@example.com"
                    value={form.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

            </div>

            <div className="mt-5">
              <label htmlFor="support" className={labelClass}>
                Support Slack / Discord / Hotline
                <span className="ml-1 text-xs text-gray-600">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <MessageCircle
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  id="support"
                  placeholder="https://discord.gg/your-event"
                  value={form.support}
                  onChange={(e) =>
                    updateField("support", e.target.value)
                  }
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

          </section>

          {/* BOTTOM ACTION BAR */}
          <div className="flex flex-col gap-5 rounded-2xl border border-[#302c3a] bg-[#18161f] p-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Readiness */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <strong className="text-sm font-semibold">
                  {readiness}% Ready for Publishing
                </strong>

                <span className="mt-1 block text-xs text-gray-500">
                  {completedCount} of 5 required sections completed
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">

              <button
                type="button"
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                onClick={() => {
                  if (window.confirm("Discard all changes?")) {
                    navigate("/main/manage-events");
                  }
                }}
              >
                Discard
              </button>

              <button
                type="button"
                className={secondaryButton}
                onClick={handleSaveDraft}
              >
                <Save size={15} />
                Save Draft
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
              >
                {isEditMode ? "Save Changes" : "Publish Event"}
                <ArrowRight size={16} />
              </button>

            </div>
          </div>

        </form>

        {/* RIGHT INSPECTOR */}
        <aside className="space-y-6 xl:sticky xl:top-24">

          {/* READINESS INDEX */}
          <div className="rounded-2xl border border-[#302c3a] bg-[#18161f] p-5">

            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                Readiness Index
              </h3>

              <span className="text-xs font-semibold text-violet-400">
                {readiness}% Valid
              </span>
            </div>

            {/* Progress */}
            <div className="mt-5 flex items-center gap-4">

              <div
                className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#8b5cf6 ${readiness}%, #302c3a ${readiness}% 100%)`,
                }}
              >
                <div className="absolute inset-2 flex items-center justify-center rounded-full bg-[#18161f]">
                  <strong className="text-xl">
                    {completedCount}/5
                  </strong>
                </div>
              </div>

              <div>
                <strong className="text-sm font-semibold">
                  Event Clearance
                </strong>
                <span className="mt-2 block text-xs leading-5 text-gray-500">
                  Required fields completed
                </span>
              </div>

            </div>

            {/* Checklist */}
            <div className="mt-6 space-y-4 border-t border-[#302c3a] pt-5">

              {[
                "Section A: Basic Information",
                "Section B: Schedule",
                "Section C: Location",
                "Section D: Registration",
                "Section E: Organizer",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="flex items-center gap-2 text-xs text-gray-400">
                    {completionItems[index] ? (
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-green-400"
                      />
                    ) : (
                      <Circle
                        size={16}
                        className="shrink-0 text-gray-600"
                      />
                    )}

                    {item}
                  </span>

                  <small
                    className={`text-[10px] font-semibold ${
                      completionItems[index]
                        ? "text-green-400"
                        : "text-gray-600"
                    }`}
                  >
                    {completionItems[index] ? "Done" : "Pending"}
                  </small>
                </div>
              ))}

            </div>
          </div>

          {/* LIVE PREVIEW */}
          <div
            className="overflow-hidden rounded-2xl border border-[#302c3a] bg-[#18161f]"
            id="event-preview"
          >

            <div className="flex items-center justify-between border-b border-[#302c3a] p-4">
              <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                ATTENDEE DISCOVERY CARD PREVIEW
              </span>

              <Smartphone size={17} className="text-gray-500" />
            </div>

            {/* Cover */}
            <div className="relative h-44 overflow-hidden bg-[#211e2b]">

              {cover ? (
                <img
                  src={cover}
                  alt="Selected event cover"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-600">
                  <ImagePlus size={30} />
                  <span className="text-xs">
                    Event cover preview
                  </span>
                </div>
              )}

              <span className="absolute bottom-3 left-3 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                {form.category}
              </span>

            </div>

            {/* Event Details */}
            <div className="p-5">

              <h3 className="break-words text-lg font-semibold">
                {form.title || "Untitled Event"}
              </h3>

              <div className="mt-5 space-y-3">

                <p className="flex items-center gap-3 text-xs text-gray-400">
                  <CalendarDays size={15} className="shrink-0 text-violet-400" />
                  {formattedDate} · {form.startTime}
                </p>

                <p className="flex items-center gap-3 text-xs text-gray-400">
                  <MapPin size={15} className="shrink-0 text-violet-400" />
                  {form.venue || "TBD Venue"}
                </p>

                <p className="flex items-center gap-3 text-xs text-gray-400">
                  <Users size={15} className="shrink-0 text-violet-400" />
                  {form.capacity || 0} Seats
                </p>

              </div>

              {/* Organizer */}
              <div className="mt-5 flex items-center gap-3 border-t border-[#302c3a] pt-5">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-bold text-violet-400">
                  {form.organizer.charAt(0).toUpperCase() || "A"}
                </div>

                <div className="min-w-0">
                  <strong className="block truncate text-xs font-semibold">
                    {form.organizer || "Organizer Name"}
                  </strong>

                  <span className="mt-1 block text-[10px] text-green-400">
                    Verified Host
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* STORAGE STATUS */}
          <div className="flex items-center gap-3 rounded-xl border border-[#302c3a] bg-[#18161f] p-4">

            <Database size={17} className="text-green-400" />

            <span className="flex-1 text-xs text-gray-400">
              Local Storage
            </span>

            <span className="text-[10px] font-bold tracking-wider text-green-400">
              ACTIVE
            </span>

          </div>

        </aside>

      </div>
    </div>
  );
};

export default CreateEvent;
