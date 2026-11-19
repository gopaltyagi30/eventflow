
import React from "react";
import { useNavigate } from "react-router";
import {
  Activity,
  ArrowLeft,
  FileText,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const Terms = () => {
  const navigate = useNavigate();

  const sections = [
    ["introduction", "Introduction"],
    ["accounts", "Account Registration"],
    ["responsibilities", "User Responsibilities"],
    ["events", "Events & Registrations"],
    ["content", "User Content"],
    ["availability", "Platform Availability"],
    ["liability", "Limitation of Liability"],
    ["updates", "Changes to Terms"],
  ];

  return (
    <div className="min-h-screen bg-[#0e0d12] text-[#f5f3fa]">
      <header className="sticky top-0 z-20 border-b border-[#302c3a] bg-[#141218]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500 text-white">
              <Activity size={21} />
            </div>
            <div className="text-left">
              <h1 className="font-bold">EventFlow</h1>
              <p className="text-[9px] tracking-[2px] text-[#938b9f]">
                OPERATIONAL CONSOLE
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 rounded-lg border border-[#393344] px-3 py-2 text-xs text-[#d5c8ed] transition hover:border-violet-500"
          >
            <ArrowLeft size={15} />
            Back to Register
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-bold tracking-widest text-violet-300">
            <FileText size={14} />
            LEGAL DOCUMENT
          </div>

          <h1 className="text-3xl font-bold sm:text-5xl">
            Terms & <span className="text-violet-400">Conditions</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#a49cac]">
            Please read these terms carefully before using EventFlow.
            They explain the guidelines and responsibilities associated
            with using our demonstration platform.
          </p>

          <p className="mt-4 text-xs text-[#777180]">
            Last updated: November 16, 2026
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
          <aside className="h-fit rounded-xl border border-[#302c3a] bg-[#18161f] p-5 lg:sticky lg:top-28">
            <p className="mb-4 text-[10px] font-bold tracking-widest text-[#898292]">
              CONTENTS
            </p>

            <nav className="space-y-1">
              {sections.map(([id, title], index) => (
                <button
                  key={id}
                  onClick={() =>
                    document.getElementById(id)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                  className="group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs text-[#a49cac] hover:bg-violet-500/10 hover:text-violet-300"
                >
                  <span>{String(index + 1).padStart(2, "0")}. {title}</span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </nav>

            <div className="mt-6 border-t border-[#302c3a] pt-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-violet-300">
                <ShieldCheck size={16} />
                Transparency matters
              </div>
              <p className="mt-2 text-[11px] leading-5 text-[#898292]">
                These terms help explain how the EventFlow demo is intended
                to be used.
              </p>
            </div>
          </aside>

          <article className="space-y-9 rounded-xl border border-[#302c3a] bg-[#18161f] p-6 sm:p-9">
            <div className="border-b border-[#302c3a] pb-7">
              <p className="mb-3 text-[10px] font-bold tracking-widest text-violet-400">
                EVENTFLOW · TERMS OF USE
              </p>
              <h2 className="text-xl font-semibold">Welcome to EventFlow</h2>
              <p className="mt-3 text-sm leading-7 text-[#a49cac]">
                EventFlow is a personal frontend development project
                created to demonstrate event management interfaces.
                It is not an official commercial event-management service.
                By accessing the platform, you agree to use it responsibly.
              </p>
            </div>

            <section id="introduction" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">01. Introduction</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                These Terms & Conditions describe the basic guidelines
                for accessing and using EventFlow. The platform provides
                demonstration interfaces for discovering, creating and
                managing events.
              </p>
            </section>

            <section id="accounts" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">02. Account Registration</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                Users should provide accurate information when interacting
                with registration forms. You are responsible for keeping
                your account credentials private and for activity carried
                out using your account.
              </p>
            </section>

            <section id="responsibilities" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">03. User Responsibilities</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                Users must not attempt unauthorized access, disrupt the
                platform, submit unlawful content or misuse any feature.
                You agree to use the demonstration platform respectfully
                and for lawful purposes.
              </p>
            </section>

            <section id="events" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">04. Events & Registrations</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                Event details, schedules, venues, attendee counts and
                registration information may be sample data. EventFlow
                does not confirm real-world bookings, ticket purchases
                or attendance.
              </p>
            </section>

            <section id="content" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">05. User Content</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                Users should only submit content they own or have
                permission to use. Submitted content must not violate
                another person's rights or applicable laws.
              </p>
            </section>

            <section id="availability" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">06. Platform Availability</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                EventFlow is a development demonstration. Features may
                change, become unavailable or be removed as the project
                evolves. Continuous availability is not guaranteed.
              </p>
            </section>

            <section id="liability" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">07. Limitation of Liability</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                To the extent permitted by applicable law, the platform
                is provided for demonstration purposes without guarantees
                of accuracy, availability or suitability for real-world
                event operations.
              </p>
            </section>

            <section id="updates" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">08. Changes to Terms</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                These terms may be updated as EventFlow develops.
                Any revised version will be published on this page
                with an updated revision date.
              </p>
            </section>

            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-5">
              <p className="text-sm font-semibold text-violet-300">
                Questions about these terms?
              </p>
              <p className="mt-2 text-xs leading-6 text-[#a49cac]">
                For questions about this project, contact the project
                creator through the contact details made available
                with the application.
              </p>
            </div>

            <div className="border-t border-[#302c3a] pt-5 text-center text-[10px] text-[#777180]">
              EVENTFLOW · TERMS & CONDITIONS
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-[#898292]">
          <button onClick={() => navigate("/privacy")} className="hover:text-violet-300">
            Privacy Policy →
          </button>
          <button onClick={() => navigate("/register")} className="hover:text-violet-300">
            Back to registration
          </button>
        </div>
      </main>
    </div>
  );
};

export default Terms;
