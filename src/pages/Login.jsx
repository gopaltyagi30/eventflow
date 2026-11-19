
import React from "react";
import {
  Activity,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  Users,
} from "lucide-react";

import { useLoginAuth } from "../hooks/authHooks";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    message,
    isSubmitting,
    onSubmit,
    navigate,
  } = useLoginAuth();

  const inputClass =
    "w-full bg-transparent text-sm text-white outline-none placeholder:text-[#777180]";

  const wrapperClass =
    "flex h-12 items-center gap-3 rounded-lg border border-[#302c3a] bg-[#211e2b] px-4 transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/10";

  return (
    <div className="flex min-h-screen bg-[#141218] text-white">

      {/* LEFT SIDE */}
      <section className="flex w-full flex-col justify-between px-6 py-6 sm:px-12 lg:w-1/2 lg:px-16">

        {/* BRAND */}
        <header className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500">
            <Activity size={21} />
          </div>

          <div>
            <h2 className="font-bold">EventFlow</h2>
            <p className="text-[9px] tracking-[2px] text-[#938b9f]">
              OPERATIONAL CONSOLE
            </p>
          </div>
        </header>

        {/* LOGIN FORM */}
        <main className="mx-auto w-full max-w-md py-12">

          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold tracking-widest text-violet-400">
              WELCOME BACK
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Sign in to EventFlow
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#a09bae]">
              Enter your account details to continue managing
              your events and experiences.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-xs font-medium text-[#ded9e5]">
                Email address
              </label>

              <div className={wrapperClass}>
                <Mail size={17} className="shrink-0 text-[#958ea0]" />

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
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-[#ded9e5]">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-violet-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className={wrapperClass}>
                <LockKeyhole size={17} className="shrink-0 text-[#958ea0]" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={inputClass}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#958ea0] hover:text-white"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* REMEMBER ME */}
            <label className="flex cursor-pointer items-center gap-2 text-xs text-[#a09bae]">
              <input
                type="checkbox"
                className="accent-violet-500"
                {...register("rememberMe")}
              />
              Remember me
            </label>

            {/* MESSAGE */}
            {message && (
              <p className="rounded-lg border border-violet-500/30 bg-violet-500/10 p-3 text-xs leading-5 text-violet-300">
                {message}
              </p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-violet-500 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-600 disabled:opacity-50"
            >
              Sign In
              <ArrowRight size={17} />
            </button>

          </form>

          <p className="mt-7 text-center text-xs text-[#a09bae]">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold text-violet-400 hover:underline"
            >
              Create account
            </button>
          </p>
        </main>

        {/* FOOTER */}
        <footer className="flex items-center justify-center gap-2 border-t border-[#302c3a] pt-5 text-[10px] text-[#777180]">
          <ShieldCheck size={14} className="text-green-500" />
          Secure login interface
        </footer>
      </section>

      {/* RIGHT SIDE IMAGE */}
      <section className="relative hidden w-1/2 overflow-hidden lg:block">

        <img
          src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600"
          alt="Concert audience enjoying a live event"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.4]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d12] via-[#0e0d12]/40 to-black/20" />

        <div className="absolute bottom-16 left-12 right-12 z-10 max-w-xl">

          <p className="mb-4 text-xs font-bold tracking-[3px] text-violet-300">
            YOUR EVENTS. ONE PLATFORM.
          </p>

          <h2 className="text-5xl font-bold leading-tight">
            Plan better.
            <br />
            Connect more.
            <br />
            <span className="text-violet-400">
              Experience more.
            </span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-gray-300">
            Welcome back to a smarter way of organizing
            events. Everything you need, all in one place.
          </p>

          <div className="mt-9 space-y-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-violet-400" size={20} />
              <span className="text-sm text-gray-200">
                Manage your events
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Users className="text-violet-400" size={20} />
              <span className="text-sm text-gray-200">
                Connect with your community
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Login;
