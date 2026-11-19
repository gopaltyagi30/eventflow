
import React, { useMemo, useState } from "react";
import {
  Search,
  CalendarPlus,
  Settings,
  Users,
  ChartNoAxesCombined,
  ChevronDown,
  BookOpen,
  MessageCircle,
  Mail,
  ArrowUpRight,
  CircleHelp,
  Ticket,
  LayoutDashboard,
} from "lucide-react";

import { useNavigate } from "react-router";

const Help = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);

  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of EventFlow.",
      icon: CalendarPlus,
      articles: 5,
      path: "/main",
    },
    {
      title: "Event Management",
      description: "Create, edit and manage events.",
      icon: Ticket,
      articles: 8,
      path: "/main/manage-events",
    },
    {
      title: "Registrations",
      description: "Understand attendees and registrations.",
      icon: Users,
      articles: 4,
      path: "/main/my-events",
    },
    {
      title: "Analytics",
      description: "Explore your event performance.",
      icon: ChartNoAxesCombined,
      articles: 3,
      path: "/main/analytics",
    },
    {
      title: "Account & Settings",
      description: "Customize your EventFlow experience.",
      icon: Settings,
      articles: 4,
      path: "/main/settings",
    },
    {
      title: "Dashboard",
      description: "Understand your dashboard.",
      icon: LayoutDashboard,
      articles: 3,
      path: "/main",
    },
  ];

  const faqs = [
    {
      question: "How do I create a new event?",
      answer:
        "Open Create Event from the sidebar. Fill in the event details, choose its date, location, capacity and organizer information, then publish your event.",
    },
    {
      question: "Can I edit an already published event?",
      answer:
        "Yes. Open Manage Events, find the event you want to update and select Edit. Make your changes and save them.",
    },
    {
      question: "How do I manage my events?",
      answer:
        "Visit Manage Events to search, filter, sort, edit or delete your events. You can also explore attendee information where available.",
    },
    {
      question: "How can I discover events?",
      answer:
        "Open Discover Events from the sidebar. Browse available events and use the search and filters to find events by category or other details.",
    },
    {
      question: "Where can I change my theme?",
      answer:
        "Go to Settings, open Appearance, and select either Light Mode or Dark Mode. Your preference is saved in your browser.",
    },
    {
      question: "Are my settings saved automatically?",
      answer:
        "Some preferences are saved in your browser's LocalStorage. Profile details and notification preferences require you to select their respective Save buttons.",
    },
    {
      question: "Why is some event information only demo data?",
      answer:
        "EventFlow is currently a frontend demonstration project. Some information and features use sample data and are not connected to a production backend.",
    },
    {
      question: "Can I receive real email notifications?",
      answer:
        "Not currently. Notification preferences can be toggled and saved, but real email and push notifications require backend integration.",
    },
  ];

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [search]);

  // Filter Categories
  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter(
      (category) =>
        category.title.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <div className="w-full min-h-screen text-[#f5f3fa]">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#211934] via-[#181525] to-[#18161f] border border-[#302c3a] rounded-2xl p-6 sm:p-8 lg:p-10 mb-9">

        <div className="relative z-10 max-w-2xl">

          <span className="text-[10px] sm:text-xs font-bold tracking-[2px] text-purple-400">
            EVENTFLOW SUPPORT CENTER
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
            How can we help you?
          </h1>

          <p className="text-sm text-gray-400 mt-3 leading-relaxed">
            Find answers, explore guides and learn how to make the most of
            EventFlow.
          </p>

          {/* Search */}
          <div className="flex items-center gap-3 bg-[#0d0c10]/70 border border-[#393344] rounded-xl px-4 py-3.5 mt-7 max-w-xl">

            <Search size={19} className="text-gray-400 shrink-0" />

            <input
              type="text"
              placeholder="Search for articles, guides or questions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveFaq(null);
              }}
              className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFaq(null);
                }}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
              >
                Clear
              </button>
            )}

          </div>
        </div>

        {/* Decorative Icon */}
        <div className="hidden lg:flex absolute right-12 bottom-8 items-center justify-center w-48 h-48 rounded-full bg-purple-500/5 border border-purple-400/10 text-purple-400/20">
          <CircleHelp size={110} strokeWidth={1.2} />
        </div>

      </section>

      {/* Help Categories */}
      <section className="mb-10">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-bold">
              Explore Help Topics
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Browse guides by category.
            </p>
          </div>

          <BookOpen size={22} className="text-purple-400" />

        </div>

        {filteredCategories.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

            {filteredCategories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.title}
                  onClick={() => navigate(category.path)}
                  className="group flex items-start gap-4 text-left bg-[#18161f] border border-[#302c3a] rounded-2xl p-5 hover:border-purple-500/60 hover:bg-[#211e2b] transition"
                >

                  <div className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition">
                    <Icon size={22} />
                  </div>

                  <div className="flex-1 min-w-0">

                    <h3 className="text-sm font-semibold text-white">
                      {category.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {category.description}
                    </p>

                    <span className="inline-block text-[11px] font-semibold text-purple-400 mt-3">
                      {category.articles} guides
                    </span>

                  </div>

                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-gray-500 group-hover:text-purple-400 transition"
                  />

                </button>
              );
            })}

          </div>

        ) : (

          <div className="bg-[#18161f] border border-[#302c3a] rounded-xl p-8 text-center text-sm text-gray-400">
            No matching help categories found.
          </div>

        )}

      </section>

      {/* FAQ Section */}
      <section className="mb-10">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-bold">
              Frequently Asked Questions
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Quick answers to common questions.
            </p>
          </div>

          <MessageCircle size={22} className="text-purple-400" />

        </div>

        <div className="space-y-3">

          {filteredFaqs.length > 0 ? (

            filteredFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`bg-[#18161f] border rounded-xl overflow-hidden transition ${
                    isOpen
                      ? "border-purple-500/50"
                      : "border-[#302c3a]"
                  }`}
                >

                  <button
                    onClick={() =>
                      setActiveFaq(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >

                    <span className="text-sm sm:text-base font-medium text-white">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-gray-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-purple-400" : ""
                      }`}
                    />

                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-sm text-gray-400 leading-7 border-t border-[#302c3a]/70">
                      {faq.answer}
                    </div>
                  )}

                </div>
              );
            })

          ) : (

            <div className="bg-[#18161f] border border-[#302c3a] rounded-xl p-8 text-center text-sm text-gray-400">
              No matching questions found.
            </div>

          )}

        </div>

      </section>

      {/* Contact Support */}
      <section className="flex flex-col lg:flex-row lg:items-center gap-5 bg-gradient-to-r from-[#211934] to-[#18161f] border border-[#393044] rounded-2xl p-6 sm:p-8">

        <div className="w-14 h-14 shrink-0 flex items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
          <MessageCircle size={27} />
        </div>

        <div className="flex-1">

          <h2 className="text-lg font-bold text-white">
            Still need help?
          </h2>

          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Have a question or facing an issue? Reach out to the EventFlow
            support team.
          </p>

        </div>

        <a
          href="mailto:support@eventflow.demo"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition shrink-0"
        >
          <Mail size={17} />
          Contact Support
          <ArrowUpRight size={16} />
        </a>

      </section>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-[#302c3a] mt-8 pt-5 pb-3 text-xs text-gray-500">
        <span>EventFlow Help Center</span>
        <span>Made for a better event experience.</span>
      </footer>

    </div>
  );
};

export default Help;
