"use client";

import { LockIcon, MailIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@fixly.io");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-dark-bg text-foreground selection:bg-brand-500 selection:text-white">
      {/* Left side - Decorative/Branding */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-brand-950">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-500/30">
            F
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Fixly Enterprise</span>
        </div>

        <div className="z-10 max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Elevate your IT support natively.
          </h1>
          <p className="text-brand-100/80 text-lg leading-relaxed">
            Manage infrastructure, deliver lightning-fast support, and automate your workflow with our next-generation Helpdesk solution.
          </p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Glow effect for mobile */}
        <div className="lg:hidden absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full filter blur-[128px] opacity-20"></div>

        <div className="w-full max-w-md space-y-8 z-10 glass p-8 sm:p-10 rounded-2xl sm:border border-dark-border shadow-2xl relative">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <span className="text-xl font-bold text-white">Fixly</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back</h2>
            <p className="text-zinc-400">Please enter your credentials to sign in.</p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6 mt-8" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-brand-500 transition-colors">
                  <MailIcon size={18} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="block w-full pl-11 pr-4 py-3 bg-dark-surface border border-dark-border text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-zinc-600 outline-none"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-brand-500 transition-colors">
                  <LockIcon size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3 bg-dark-surface border border-dark-border text-white rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-zinc-600 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-dark-surface border-dark-border rounded text-brand-600 focus:ring-brand-500 focus:ring-offset-dark-bg cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-400 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-brand-500 hover:text-brand-400 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 focus:ring-offset-dark-bg transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRightIcon size={16} />}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-zinc-500">
            Use System Admin <span className="text-zinc-300 font-semibold">admin@fixly.io / admin123</span> to login
          </div>
        </div>
      </div>
    </div>
  );
}
