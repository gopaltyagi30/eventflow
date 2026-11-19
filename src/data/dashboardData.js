import {
  CalendarDays,
  Users,
  Ticket,
  UserRoundCheck,
 
} from "lucide-react";

const events = JSON.parse(localStorage.getItem("events"))
// Sample events
// export const events = [
//   {
//     id: 1,
//     title: "Tech Summit 2026: Silicon Horizon",
//     category: "CONFERENCE",
//     date: "Nov 12, 2026",
//     time: "09:00 AM",
//     venue: "Grand Pavilion",
//     registrations: 482,
//     capacity: 500,
//     status: "Registration Open",
//     image:
//       "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
//   },
//   {
//     id: 2,
//     title: "AI Innovation Workshop: Multimodal Systems",
//     category: "WORKSHOP · R&D",
//     date: "Nov 18, 2026",
//     time: "01:00 PM",
//     venue: "Building C, Auditorium 4",
//     registrations: 195,
//     capacity: 200,
//     status: "Almost Full",
//     image:
//       "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
//   },
//   {
//     id: 3,
//     title: "Design Meetup: Systems & Craft",
//     category: "PRODUCT · DESIGN",
//     date: "Nov 25, 2026",
//     time: "06:30 PM",
//     venue: "Soho Innovation Hub",
//     registrations: 140,
//     capacity: 150,
//     status: "10 Seats Remaining",
//     image:
//       "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500",
//   },
//   {
//     id: 4,
//     title: "Campus Fest: Autumn Gala 2026",
//     category: "SOCIAL · STUDENT LIFE",
//     date: "Dec 02, 2026",
//     time: "11:00 AM",
//     venue: "Central Quad Lawn",
//     registrations: 423,
//     capacity: 600,
//     status: "Early Bird Active",
//     image:
//       "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
//   },
// ];

// Dashboard statistics
export const stats = [
  {
    title: "TOTAL EVENTS",
    value: events?.length || 0,
    icon: CalendarDays,
    change: "+3",
    description: "vs. previous month",
  },
  {
    title: "UPCOMING EVENTS",
    value: "08",
    icon: Ticket,
    change: "48h",
    description: "Next event starts in 2 days",
  },
  {
    title: "TOTAL REGISTRATIONS",
    value: "1,240",
    icon: Users,
    change: "+14.4%",
    description: "cycle-over-cycle",
  },
  {
    title: "ACTIVE PARTICIPANTS",
    value: "856",
    icon: UserRoundCheck,
    change: "72%",
    description: "Check-in efficiency",
  },
];

// Recent registrations
 export const registrations = [
  {
    name: "Sarah Chen",
    email: "sarah@email.com",
    event: "Tech Summit...",
    ticket: "VIP Pass",
    time: "12 mins ago",
    status: "Confirmed",
    initials: "SC",
  },
  {
    name: "David Miller",
    email: "david@email.com",
    event: "AI Innovation...",
    ticket: "Early Bird",
    time: "45 mins ago",
    status: "Confirmed",
    initials: "DM",
  },
  {
    name: "Elena Rostova",
    email: "elena@email.com",
    event: "Design Meetup...",
    ticket: "General",
    time: "2 hours ago",
    status: "Checked In",
    initials: "ER",
  },
  {
    name: "Marcus Vance",
    email: "marcus@email.com",
    event: "Campus Fest...",
    ticket: "Student",
    time: "Yesterday",
    status: "Pending",
    initials: "MV",
  },
];

// weekly data
export const weeklyData = [
  { day: "M", value: 45 },
  { day: "T", value: 65 },
  { day: "W", value: 82 },
  { day: "T", value: 100 },
  { day: "F", value: 94 },
  { day: "S", value: 55 },
  { day: "S", value: 40 },
];
