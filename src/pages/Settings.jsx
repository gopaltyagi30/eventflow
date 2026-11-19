
import React, { useEffect, useState } from "react";
import {
  UserRound,
  Palette,
  Bell,
  ShieldCheck,
  Info,
  Save,
  Sun,
  Moon,
  LockKeyhole,
  Mail,
  CalendarDays,
  Megaphone,
  Check,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("eventflow-profile");

    return saved
      ? JSON.parse(saved)
      : {
          name: "Alex Morgan",
          email: "alex@example.com",
          role: "Organizer",
        };
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("eventflow-theme") || "dark";
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("eventflow-notifications");

    return saved
      ? JSON.parse(saved)
      : {
          eventUpdates: true,
          registrations: true,
          reminders: true,
          announcements: false,
        };
  });

  const [savedMessage, setSavedMessage] = useState("");

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("eventflow-theme", theme);

    window.dispatchEvent(new Event("eventflow-theme-change"));
  }, [theme]);

  // Update profile fields
  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Show success message
  const showSavedMessage = (message) => {
    setSavedMessage(message);

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  // Save profile
  const saveProfile = () => {
    localStorage.setItem("eventflow-profile", JSON.stringify(profile));
    showSavedMessage("Profile updated successfully");
  };

  // Toggle notifications
  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Save notifications
  const saveNotifications = () => {
    localStorage.setItem(
      "eventflow-notifications",
      JSON.stringify(notifications)
    );

    showSavedMessage("Notification preferences saved");
  };

  // Settings tabs
  const tabs = [
    { id: "profile", label: "Profile", icon: UserRound },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "about", label: "About", icon: Info },
  ];

  // Notification options
  const notificationOptions = [
    {
      key: "eventUpdates",
      title: "Event updates",
      description: "Get notified when your event details change.",
      icon: CalendarDays,
    },
    {
      key: "registrations",
      title: "New registrations",
      description: "Receive updates when someone registers for your event.",
      icon: UserRound,
    },
    {
      key: "reminders",
      title: "Event reminders",
      description: "Get reminders about your upcoming events.",
      icon: Bell,
    },
    {
      key: "announcements",
      title: "Announcements",
      description: "Receive platform news and announcements.",
      icon: Megaphone,
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-[#302c3a] bg-[#211e2b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777181] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20";

  const sectionClass =
    "rounded-2xl border border-[#302c3a] bg-[#18161f] p-5 sm:p-7";

  return (
    <div className="min-h-screen bg-[#0d0c10] text-[#f5f3fa]">

      {/* Header */}
      <div className="mb-7">
        <span className="text-xs font-semibold tracking-[2px] text-violet-400">
          PREFERENCES
        </span>

        <h1 className="mt-2 text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-sm text-[#a09bae]">
          Manage your account and customize your EventFlow experience.
        </p>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">

        {/* Sidebar Navigation */}
        <aside className="h-fit rounded-2xl border border-[#302c3a] bg-[#18161f] p-3">
          <h3 className="mb-3 px-3 pt-2 text-xs font-semibold tracking-wider text-[#777181]">
            GENERAL
          </h3>

          <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition lg:w-full ${
                    isActive
                      ? "bg-violet-600/15 text-violet-400"
                      : "text-[#a09bae] hover:bg-[#25212f] hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0">

          {/* Success Message */}
          {savedMessage && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              <Check size={17} />
              {savedMessage}
            </div>
          )}

          {/* PROFILE */}
          {activeTab === "profile" && (
            <section className={sectionClass}>

              <div className="mb-7 flex items-center justify-between border-b border-[#302c3a] pb-5">
                <div>
                  <h2 className="text-xl font-semibold">Profile Settings</h2>
                  <p className="mt-1 text-sm text-[#a09bae]">
                    Update your personal information.
                  </p>
                </div>
                <UserRound size={22} className="text-violet-400" />
              </div>

              {/* Profile Preview */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">
                  {profile.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="font-semibold">{profile.name}</h3>
                  <p className="mt-1 text-sm text-[#a09bae]">
                    {profile.role}
                  </p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c7c2d1]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c7c2d1]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-[#c7c2d1]">
                    Account Role
                  </label>

                  <select
                    name="role"
                    value={profile.role}
                    onChange={handleProfileChange}
                    className={inputClass}
                  >
                    <option value="Organizer">Organizer</option>
                    <option value="Listener">Attendee</option>
                  </select>
                </div>

              </div>

              <button
                onClick={saveProfile}
                className="mt-7 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                <Save size={16} />
                Save Changes
              </button>
            </section>
          )}

          {/* APPEARANCE */}
          {activeTab === "appearance" && (
            <section className={sectionClass}>

              <div className="mb-7 flex items-center justify-between border-b border-[#302c3a] pb-5">
                <div>
                  <h2 className="text-xl font-semibold">Appearance</h2>
                  <p className="mt-1 text-sm text-[#a09bae]">
                    Choose how EventFlow looks on your device.
                  </p>
                </div>
                <Palette size={22} className="text-violet-400" />
              </div>

              <div>
                <h3 className="font-semibold">Theme Preference</h3>
                <p className="mt-1 text-sm text-[#a09bae]">
                  Select your preferred interface theme.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* Light Mode */}
                  <button
                    onClick={() => setTheme("light")}
                    className={`relative rounded-xl border p-4 text-left transition ${
                      theme === "light"
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-[#302c3a] bg-[#211e2b] hover:border-[#625b70]"
                    }`}
                  >
                    <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-gray-200 text-gray-700">
                      <Sun size={30} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Light Mode</span>
                      {theme === "light" && (
                        <Check size={18} className="text-violet-400" />
                      )}
                    </div>
                  </button>

                  {/* Dark Mode */}
                  <button
                    onClick={() => setTheme("dark")}
                    className={`relative rounded-xl border p-4 text-left transition ${
                      theme === "dark"
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-[#302c3a] bg-[#211e2b] hover:border-[#625b70]"
                    }`}
                  >
                    <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-[#0d0c10] text-white">
                      <Moon size={30} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Dark Mode</span>
                      {theme === "dark" && (
                        <Check size={18} className="text-violet-400" />
                      )}
                    </div>
                  </button>

                </div>
              </div>
            </section>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <section className={sectionClass}>

              <div className="mb-7 flex items-center justify-between border-b border-[#302c3a] pb-5">
                <div>
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <p className="mt-1 text-sm text-[#a09bae]">
                    Choose which updates you want to receive.
                  </p>
                </div>
                <Bell size={22} className="text-violet-400" />
              </div>

              <div className="divide-y divide-[#302c3a]">
                {notificationOptions.map((option) => {
                  const Icon = option.icon;

                  return (
                    <div
                      key={option.key}
                      className="flex items-center gap-4 py-5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold">
                          {option.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#a09bae]">
                          {option.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications[option.key]}
                        aria-label={option.title}
                        onClick={() => toggleNotification(option.key)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          notifications[option.key]
                            ? "bg-violet-600"
                            : "bg-[#45404f]"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                            notifications[option.key]
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={saveNotifications}
                className="mt-6 flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
              >
                <Save size={16} />
                Save Preferences
              </button>
            </section>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <section className={sectionClass}>

              <div className="mb-7 flex items-center justify-between border-b border-[#302c3a] pb-5">
                <div>
                  <h2 className="text-xl font-semibold">Privacy & Security</h2>
                  <p className="mt-1 text-sm text-[#a09bae]">
                    Manage your account security preferences.
                  </p>
                </div>
                <ShieldCheck size={22} className="text-violet-400" />
              </div>

              <div className="space-y-4">

                <div className="flex items-start gap-4 rounded-xl border border-[#302c3a] bg-[#211e2b] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <LockKeyhole size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Password & Authentication
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#a09bae]">
                      Account authentication is not connected in this frontend
                      demo yet.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-[#302c3a] bg-[#211e2b] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <Mail size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold">Email Verification</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#a09bae]">
                      Email verification will be available when backend
                      authentication is implemented.
                    </p>
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* ABOUT */}
          {activeTab === "about" && (
            <section className={sectionClass}>

              <div className="mb-7 flex items-center justify-between border-b border-[#302c3a] pb-5">
                <div>
                  <h2 className="text-xl font-semibold">About EventFlow</h2>
                  <p className="mt-1 text-sm text-[#a09bae]">
                    Learn more about this application.
                  </p>
                </div>
                <Info size={22} className="text-violet-400" />
              </div>

              {/* Brand */}
              <div className="flex flex-col items-center rounded-xl border border-[#302c3a] bg-[#211e2b] px-5 py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white">
                  <CalendarDays size={30} />
                </div>

                <h2 className="text-2xl font-bold">EventFlow</h2>

                <p className="mt-2 text-sm text-[#a09bae]">
                  Plan. Manage. Experience.
                </p>

                <span className="mt-4 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                  Version 1.0.0
                </span>
              </div>

              {/* App Details */}
              <div className="mt-6 divide-y divide-[#302c3a] rounded-xl border border-[#302c3a] bg-[#211e2b] px-5">

                <div className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-[#a09bae]">Application</span>
                  <strong>EventFlow</strong>
                </div>

                <div className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-[#a09bae]">Version</span>
                  <strong>1.0.0</strong>
                </div>

                <div className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-[#a09bae]">Platform</span>
                  <strong className="text-right">React Web Application</strong>
                </div>

                <div className="flex items-center justify-between gap-4 py-4 text-sm">
                  <span className="text-[#a09bae]">Developer</span>
                  <strong>Gopal Tyagi</strong>
                </div>

              </div>

              <p className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm leading-relaxed text-[#a09bae]">
                EventFlow is a personal frontend demonstration project.
                Some features currently use locally stored demo data.
              </p>
            </section>
          )}

        </main>
      </div>
    </div>
  );
};

export default Settings;
