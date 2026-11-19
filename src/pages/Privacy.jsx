
import React from "react";
import { useNavigate } from "react-router";
import {
  Activity,
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  const sections = [
    ["overview", "Overview"],
    ["collection", "Information We Collect"],
    ["purpose", "How Information Is Used"],
    ["storage", "Data Storage"],
    ["sharing", "Information Sharing"],
    ["security", "Data Security"],
    ["choices", "Your Choices"],
    ["cookies", "Local Storage"],
    ["contact", "Contact"],
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
            <ShieldCheck size={14} />
            YOUR PRIVACY MATTERS
          </div>

          <h1 className="text-3xl font-bold sm:text-5xl">
            Privacy <span className="text-violet-400">Policy</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#a49cac]">
            This page explains what information may be handled when
            you interact with EventFlow, how it is used and the choices
            available to you.
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
                <LockKeyhole size={16} />
                Privacy awareness
              </div>
              <p className="mt-2 text-[11px] leading-5 text-[#898292]">
                Understand how this demonstration application handles
                information.
              </p>
            </div>
          </aside>

          <article className="space-y-9 rounded-xl border border-[#302c3a] bg-[#18161f] p-6 sm:p-9">
            <div className="border-b border-[#302c3a] pb-7">
              <p className="mb-3 text-[10px] font-bold tracking-widest text-violet-400">
                EVENTFLOW · PRIVACY DOCUMENT
              </p>
              <h2 className="text-xl font-semibold">
                Your information and privacy
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#a49cac]">
                EventFlow is a personal frontend development project.
                This policy describes the intended handling of information
                within the current demonstration application. Actual
                practices depend on the features and services connected
                to the deployed version.
              </p>
            </div>

            <section id="overview" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">01. Overview</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                EventFlow is a demonstration event management interface.
                Some information displayed in the application is sample
                data and does not represent real attendees or events.
              </p>
            </section>

            <section id="collection" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">02. Information We Collect</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                Depending on the features you use, information entered
                into forms may include your name, email address, account
                role, event details and other information you choose
                to provide. Do not enter sensitive personal information
                into this demonstration application.
              </p>
            </section>

            <section id="purpose" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">03. How Information Is Used</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                Information entered into the application may be used
                to demonstrate account interfaces, event creation,
                event management and other user-facing functionality.
                The exact use depends on the implementation of each feature.
              </p>
            </section>

            <section id="storage" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">04. Data Storage</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                The current frontend version may store application
                information in your browser's LocalStorage. This data
                remains in the browser until it is cleared or the
                application removes it. Clearing browser data may
                remove saved application information.
              </p>
            </section>

            <section id="sharing" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">05. Information Sharing</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                The frontend demonstration does not itself establish
                a promise that information is never transmitted or
                shared. If external services, analytics, hosting or
                backend integrations are added, their data handling
                practices should be documented here.
              </p>
            </section>

            <section id="security" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">06. Data Security</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                Browser-based storage is not a secure substitute for
                a production authentication system. Avoid using real
                passwords or sensitive information in this demo.
                A production application should use appropriate
                server-side security controls.
              </p>
            </section>

            <section id="choices" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">07. Your Choices</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                You can clear EventFlow's browser-stored data through
                your browser settings. Doing so may reset saved
                preferences, sample records or information entered
                during your session.
              </p>
            </section>

            <section id="cookies" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">08. Cookies & Local Storage</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                The application may use LocalStorage to remember
                preferences such as the selected theme and to
                demonstrate persistence of application data.
                LocalStorage is browser storage and is distinct
                from server-side account storage.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28">
              <h3 className="mb-3 font-semibold">09. Contact</h3>
              <p className="text-sm leading-7 text-[#a49cac]">
                For questions about this privacy policy or the
                EventFlow project, use the contact information
                provided by the project creator with the application.
              </p>
            </section>

            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-5">
              <p className="text-sm font-semibold text-violet-300">
                A note about this demonstration
              </p>
              <p className="mt-2 text-xs leading-6 text-[#a49cac]">
                This policy is a project template. It should be updated
                to reflect the actual data collection, storage,
                integrations and privacy practices before EventFlow
                is used as a public production service.
              </p>
            </div>

            <div className="border-t border-[#302c3a] pt-5 text-center text-[10px] text-[#777180]">
              EVENTFLOW · PRIVACY POLICY
            </div>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs text-[#898292]">
          <button onClick={() => navigate("/terms")} className="hover:text-violet-300">
            Terms & Conditions →
          </button>
          <button onClick={() => navigate("/register")} className="hover:text-violet-300">
            Back to registration
          </button>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
