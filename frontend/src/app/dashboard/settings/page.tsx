"use client";

import { SaveIcon, ShieldIcon, UserIcon, PaletteIcon, BellIcon, MailIcon, CheckCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("dark");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [inAppSound, setInAppSound] = useState(true);
  const [marketingComms, setMarketingComms] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("fixly-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);

    // Load notification prefs
    const prefs = JSON.parse(localStorage.getItem("fixly-notif-prefs") || '{}');
    if (prefs.emailAlerts !== undefined) setEmailAlerts(prefs.emailAlerts);
    if (prefs.inAppSound !== undefined) setInAppSound(prefs.inAppSound);
    if (prefs.marketingComms !== undefined) setMarketingComms(prefs.marketingComms);
  }, []);

  // Apply theme when changed
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("fixly-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const togglePref = (key: string, current: boolean, setter: (v: boolean) => void) => {
    const newVal = !current;
    setter(newVal);
    const prefs = JSON.parse(localStorage.getItem("fixly-notif-prefs") || '{}');
    prefs[key] = newVal;
    localStorage.setItem("fixly-notif-prefs", JSON.stringify(prefs));
  };

  const showSaved = (msg: string) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-zinc-400 mt-1 text-sm">Configure your personal profile and helpdesk preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm border ${
              activeTab === "profile" 
                ? "bg-brand-500/10 text-brand-400 border-brand-500/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
            }`}
          >
            <UserIcon size={18} /> Profile Details
          </button>

          <button 
            onClick={() => setActiveTab("password")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm border ${
              activeTab === "password" 
                ? "bg-brand-500/10 text-brand-400 border-brand-500/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
            }`}
          >
            <ShieldIcon size={18} /> Password & Security
          </button>

          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm border ${
              activeTab === "notifications" 
                ? "bg-brand-500/10 text-brand-400 border-brand-500/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
            }`}
          >
            <BellIcon size={18} /> Notifications
          </button>

          <button 
            onClick={() => setActiveTab("appearance")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors text-sm border ${
              activeTab === "appearance" 
                ? "bg-brand-500/10 text-brand-400 border-brand-500/20" 
                : "text-zinc-400 hover:text-white hover:bg-white/5 border-transparent"
            }`}
          >
            <PaletteIcon size={18} /> Appearance
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 glass rounded-2xl border border-dark-border p-6 sm:p-8">
          
          {/* PROFILE DETAILS TAB */}
          {activeTab === "profile" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white">Profile Details</h2>
                <p className="text-sm text-zinc-400 mt-1">Update your personal information and how others see you on Fixly.</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start gap-8 mb-8 pb-8 border-b border-dark-border">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-cyan-400 shrink-0 border-4 border-dark-surface relative group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-medium text-white">Edit</span>
                  </div>
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-white font-medium">Profile Picture</h3>
                  <p className="text-sm text-zinc-400 max-w-sm mb-4">PNG, JPG or GIF up to 5MB. A square image is recommended.</p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-dark-border">
                      Change
                    </button>
                    <button className="px-4 py-2 text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">First Name</label>
                    <input 
                      type="text" 
                      defaultValue="Super"
                      className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue="Admin"
                      className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Email Address</label>
                  <div className="relative">
                    <MailIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      type="email" 
                      defaultValue="admin@fixly.io"
                      className="w-full bg-dark-bg/50 border border-dark-border rounded-lg pl-10 pr-4 py-2.5 text-zinc-400 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-zinc-500">To change your email address, please contact system administrator.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Bio</label>
                  <textarea 
                    rows={4}
                    placeholder="Write a few sentences about yourself..."
                    className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-dark-border mt-8">
                  <button type="button" className="px-5 py-2.5 text-zinc-300 hover:text-white font-medium text-sm transition-colors">
                    Cancel
                  </button>
                  <button type="button" className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium text-sm shadow-lg shadow-brand-500/20 transition-all active:scale-95">
                    <SaveIcon size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PASSWORD TAB */}
          {activeTab === "password" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8 border-b border-dark-border pb-8">
                <h2 className="text-xl font-bold text-white">Password & Security</h2>
                <p className="text-sm text-zinc-400 mt-1">Manage your password settings and secure your account.</p>
              </div>

              <form className="space-y-6">
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-medium text-zinc-300">Current Password</label>
                  <input type="password" placeholder="Enter current password" className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                </div>
                
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-medium text-zinc-300">New Password</label>
                  <input type="password" placeholder="Create new password" className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                  <p className="text-xs text-zinc-500 mt-1">Must be at least 8 characters long and include a number and symbol.</p>
                </div>

                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-medium text-zinc-300">Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                </div>

                <div className="pt-4 flex justify-start gap-3 mt-8">
                  <button type="button" className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium text-sm transition-all active:scale-95">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === "notifications" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8 border-b border-dark-border pb-8">
                <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
                <p className="text-sm text-zinc-400 mt-1">Choose how and when you want to be notified about activity.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl border border-dark-border bg-white/[0.02]">
                  <div>
                    <h3 className="text-white font-medium">Email Alerts</h3>
                    <p className="text-sm text-zinc-400">Receive daily summary emails about your assigned tickets.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('emailAlerts', emailAlerts, setEmailAlerts)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${emailAlerts ? 'bg-brand-500' : 'bg-dark-bg border border-dark-border'}`}
                  >
                    <div className={`w-4 h-4 rounded-full absolute top-1 shadow-sm transition-all ${emailAlerts ? 'right-1 bg-white' : 'left-1 bg-zinc-400'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-dark-border bg-white/[0.02]">
                  <div>
                    <h3 className="text-white font-medium">In-App Sound</h3>
                    <p className="text-sm text-zinc-400">Play a sound when a high priority ticket is submitted.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('inAppSound', inAppSound, setInAppSound)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${inAppSound ? 'bg-brand-500' : 'bg-dark-bg border border-dark-border'}`}
                  >
                    <div className={`w-4 h-4 rounded-full absolute top-1 shadow-sm transition-all ${inAppSound ? 'right-1 bg-white' : 'left-1 bg-zinc-400'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-dark-border bg-white/[0.02]">
                  <div>
                    <h3 className="text-white font-medium">Marketing Communications</h3>
                    <p className="text-sm text-zinc-400">Receive news and platform update announcements.</p>
                  </div>
                  <button 
                    onClick={() => togglePref('marketingComms', marketingComms, setMarketingComms)}
                    className={`w-11 h-6 rounded-full relative transition-colors ${marketingComms ? 'bg-brand-500' : 'bg-dark-bg border border-dark-border'}`}
                  >
                    <div className={`w-4 h-4 rounded-full absolute top-1 shadow-sm transition-all ${marketingComms ? 'right-1 bg-white' : 'left-1 bg-zinc-400'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === "appearance" && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8 border-b border-dark-border pb-8">
                <h2 className="text-xl font-bold text-white">Appearance</h2>
                <p className="text-sm text-zinc-400 mt-1">Customize the look and feel of your workspace.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-300">Interface Theme</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Dark Mode */}
                  <div 
                    onClick={() => changeTheme("dark")}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                      theme === "dark" 
                        ? "border-2 border-brand-500 bg-dark-bg shadow-lg shadow-brand-500/10" 
                        : "border border-dark-border bg-dark-bg hover:border-zinc-500"
                    }`}
                  >
                    {theme === "dark" && (
                      <div className="absolute top-3 right-3">
                        <CheckCircleIcon size={18} className="text-brand-500" />
                      </div>
                    )}
                    <div className="h-20 w-full bg-[#0c0c0e] rounded-lg border border-zinc-800 mb-3 flex items-center justify-center overflow-hidden">
                      <div className="w-4/5 flex gap-1.5 h-14">
                        <div className="w-1/4 bg-zinc-900 rounded border border-zinc-800"></div>
                        <div className="flex-1 bg-zinc-950 rounded border border-zinc-800 p-1.5">
                          <div className="w-full h-2 bg-zinc-800 rounded mb-1"></div>
                          <div className="w-2/3 h-2 bg-zinc-800 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-white font-medium text-center text-sm">Dark Mode</p>
                  </div>
                  
                  {/* Light Mode */}
                  <div 
                    onClick={() => changeTheme("light")}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                      theme === "light" 
                        ? "border-2 border-brand-500 bg-dark-bg shadow-lg shadow-brand-500/10" 
                        : "border border-dark-border bg-dark-bg hover:border-zinc-500"
                    }`}
                  >
                    {theme === "light" && (
                      <div className="absolute top-3 right-3">
                        <CheckCircleIcon size={18} className="text-brand-500" />
                      </div>
                    )}
                    <div className="h-20 w-full bg-white rounded-lg border border-zinc-200 mb-3 flex items-center justify-center overflow-hidden">
                      <div className="w-4/5 flex gap-1.5 h-14">
                        <div className="w-1/4 bg-zinc-100 rounded border border-zinc-200"></div>
                        <div className="flex-1 bg-zinc-50 rounded border border-zinc-200 p-1.5">
                          <div className="w-full h-2 bg-zinc-200 rounded mb-1"></div>
                          <div className="w-2/3 h-2 bg-zinc-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-white font-medium text-center text-sm">Light Mode</p>
                  </div>

                  {/* System Default */}
                  <div 
                    onClick={() => changeTheme("system")}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                      theme === "system" 
                        ? "border-2 border-brand-500 bg-dark-bg shadow-lg shadow-brand-500/10" 
                        : "border border-dark-border bg-dark-bg hover:border-zinc-500"
                    }`}
                  >
                    {theme === "system" && (
                      <div className="absolute top-3 right-3">
                        <CheckCircleIcon size={18} className="text-brand-500" />
                      </div>
                    )}
                    <div className="h-20 w-full bg-gradient-to-r from-[#0c0c0e] to-white rounded-lg border border-zinc-800 mb-3 overflow-hidden flex">
                      <div className="w-1/2 bg-[#0c0c0e] flex items-center justify-center">
                        <div className="w-3/4 h-8 bg-zinc-900 rounded border border-zinc-800"></div>
                      </div>
                      <div className="w-1/2 bg-white flex items-center justify-center">
                        <div className="w-3/4 h-8 bg-zinc-100 rounded border border-zinc-200"></div>
                      </div>
                    </div>
                    <p className="text-white font-medium text-center text-sm">System Default</p>
                  </div>
                </div>

                <p className="text-xs text-zinc-500 mt-4">
                  {theme === "dark" && "Dark mode is active. Easy on the eyes in low-light environments."}
                  {theme === "light" && "Light mode is active. Ideal for bright workspaces."}
                  {theme === "system" && "Following your operating system's appearance setting."}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
