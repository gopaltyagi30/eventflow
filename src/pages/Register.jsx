
import React from "react";
import {
  Activity,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  CalendarDays,
} from "lucide-react";

import { useRegisterAuth } from "../hooks/authHooks";

const Register = () => {
  const {
    register,
    handleSubmit,
    errors,
    password,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    message,
    onSubmit,
    navigate,
  } = useRegisterAuth();

  const inputClass =
    "w-full bg-transparent py-3 pl-10 pr-10 text-sm text-[var(--text-color)] outline-none placeholder:text-[var(--muted-color)]";

  const inputWrapperClass =
    "flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] px-3 transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20";

  return (
    <div className="flex min-h-screen bg-[var(--page-bg)] text-[var(--text-color)]">

      {/* LEFT SIDE */}
      <section className="flex min-h-screen w-full flex-col px-5 py-6 sm:px-10 lg:w-1/2 lg:px-12 xl:px-20">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Activity size={22} />
            </div>

            <div>
              <strong className="block text-lg font-bold">
                EventFlow
              </strong>
              <span className="text-[9px] font-semibold tracking-[2px] text-[var(--muted-color)]">
                OPERATIONAL CONSOLE
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 rounded-full border border-[var(--border-color)] px-3 py-1.5 text-xs text-[var(--muted-color)]">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            v2.4 LTS
          </div>
        </header>

        {/* FORM CONTENT */}
        <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-center py-10">

          <div className="mb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-violet-400">
              <UserRound size={14} />
              NEW ACCOUNT
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-[var(--muted-color)]">
              Join EventFlow and start managing experiences
              that bring people together.
            </p>
          </div>

          {/* REGISTER FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* FULL NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Full name
              </label>

              <div className={inputWrapperClass}>
                <UserRound size={17} className="shrink-0 text-[var(--muted-color)]" />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={inputClass}
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
              </div>

              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email address
              </label>

              <div className={inputWrapperClass}>
                <Mail size={17} className="shrink-0 text-[var(--muted-color)]" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* ACCOUNT TYPE */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Account type
              </label>

              <div className="grid grid-cols-2 gap-3">

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="organizer"
                    className="peer sr-only"
                    {...register("role")}
                  />

                  <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-sm text-[var(--muted-color)] transition peer-checked:border-violet-500 peer-checked:bg-violet-500/10 peer-checked:text-violet-400">
                    <CalendarDays size={17} />
                    <span className="font-medium">Organizer</span>
                    <CheckCircle2 size={15} className="ml-auto opacity-0 peer-checked:opacity-100" />
                  </div>
                </label>

                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value="attendee"
                    className="peer sr-only"
                    {...register("role")}
                  />

                  <div className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-sm text-[var(--muted-color)] transition peer-checked:border-violet-500 peer-checked:bg-violet-500/10 peer-checked:text-violet-400">
                    <Users size={17} />
                    <span className="font-medium">Attendee</span>
                  </div>
                </label>

              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className={inputWrapperClass}>
                <LockKeyhole size={17} className="shrink-0 text-[var(--muted-color)]" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className={inputClass}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must contain at least 8 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-[var(--muted-color)] hover:text-[var(--text-color)]"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}

              <p className="mt-2 text-xs text-[var(--muted-color)]">
                Use at least 8 characters.
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm password
              </label>

              <div className={inputWrapperClass}>
                <LockKeyhole size={17} className="shrink-0 text-[var(--muted-color)]" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className={inputClass}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="shrink-0 text-[var(--muted-color)] hover:text-[var(--text-color)]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* TERMS */}
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[var(--muted-color)]">

                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 accent-violet-600"
                  {...register("agreeTerms", {
                    required: "Please accept Terms & Conditions",
                  })}
                />

                <span>
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="font-medium text-violet-400 hover:text-violet-300"
                  >
                    Terms & Conditions
                  </a>
                  {" "}and{" "}
                  <a
                    href="/privacy"
                    className="font-medium text-violet-400 hover:text-violet-300"
                  >
                    Privacy Policy
                  </a>.
                </span>

              </label>

              {errors.agreeTerms && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            {/* MESSAGE */}
            {message && (
              <div
                role="status"
                className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
              >
                {message}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-[0.99]"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="mt-7 text-center text-sm text-[var(--muted-color)]">
            Already have an account?

            <button
              type="button"
              onClick={() => navigate("/")}
              className="ml-2 font-semibold text-violet-400 hover:text-violet-300"
            >
              Sign in
            </button>
          </div>

        </main>

        {/* FOOTER */}
        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border-color)] pt-5 text-[10px] text-[var(--muted-color)] sm:flex-row">

          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            Secure registration interface
          </div>

          <span>EVENTFLOW · EVENT OPERATIONS PLATFORM</span>

        </footer>

      </section>

      {/* RIGHT SIDE - SHOWCASE */}
      <section className="relative hidden min-h-screen w-1/2 overflow-hidden bg-[#171220] text-white lg:flex lg:flex-col lg:justify-between">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(139,92,246,0.35),transparent_45%),radial-gradient(ellipse_at_10%_90%,rgba(91,33,182,0.25),transparent_40%),linear-gradient(145deg,#171220,#0d0c10)]" />

        <div className="absolute -right-32 top-1/4 h-96 w-96 rounded-full border border-violet-400/10" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full border border-violet-400/10" />

        <div className="relative z-10 flex items-center justify-between p-10">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[2px] text-violet-300">
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            THE EVENTFLOW EXPERIENCE
          </span>

          <span className="text-xs text-white/50">01 / 03</span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-xl px-10 py-10 xl:px-16">

          <div className="mb-6 inline-block rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-[10px] font-semibold tracking-[2px] text-violet-300">
            BUILT FOR EXPERIENCES
          </div>

          <h2 className="text-5xl font-bold leading-[1.15] xl:text-6xl">
            Great events
            <br />
            start with
            <br />
            <span className="text-violet-400">
              great planning.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
            One platform to create, manage and discover
            unforgettable experiences. Bring your ideas
            to life with EventFlow.
          </p>

          <div className="mt-10 space-y-6">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                <CalendarDays size={19} />
              </div>

              <div>
                <strong className="text-sm">
                  Smart Event Management
                </strong>
                <p className="mt-1 text-xs text-white/50">
                  Plan and manage events effortlessly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                <Users size={19} />
              </div>

              <div>
                <strong className="text-sm">
                  Community & Connections
                </strong>
                <p className="mt-1 text-xs text-white/50">
                  Bring organizers and attendees together.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                <Activity size={19} />
              </div>

              <div>
                <strong className="text-sm">
                  Real-time Insights
                </strong>
                <p className="mt-1 text-xs text-white/50">
                  Keep track of your event activity.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-10 py-6 text-[10px] font-semibold tracking-[2px] text-white/40">
          <span>CREATE. CONNECT. EXPERIENCE.</span>
          <span>POWERED BY EVENTFLOW</span>
        </div>

      </section>

    </div>
  );
};

export default Register;
