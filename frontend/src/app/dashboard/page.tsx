import { ArrowUpRightIcon, ArrowDownRightIcon, TicketIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-zinc-400 mt-1 text-sm">Monitor your helpdesk performance and ticket statuses in real-time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1 */}
        <div className="glass p-5 rounded-2xl border border-dark-border relative overflow-hidden group hover:border-brand-500/50 transition-colors cursor-pointer">
          <div className="absolute -bottom-2 -right-2 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity pointer-events-none">
            <TicketIcon size={48} className="text-brand-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-zinc-400">Total Unresolved</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
              <ArrowDownRightIcon size={12} />
              12%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white">42</h3>
          <p className="text-xs text-zinc-500 mt-2">vs last week</p>
        </div>

        {/* Stat Card 2 */}
        <div className="glass p-5 rounded-2xl border border-dark-border relative overflow-hidden group hover:border-orange-500/50 transition-colors cursor-pointer">
          <div className="absolute -bottom-2 -right-2 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity pointer-events-none">
            <ClockIcon size={48} className="text-orange-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-zinc-400">Avg. Response Time</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-400/10 px-2 py-1 rounded-md">
              <ArrowUpRightIcon size={12} />
              2.4h
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white">1h 45m</h3>
          <p className="text-xs text-zinc-500 mt-2">vs last week</p>
        </div>

        {/* Stat Card 3 */}
        <div className="glass p-5 rounded-2xl border border-dark-border relative overflow-hidden group hover:border-emerald-500/50 transition-colors cursor-pointer">
          <div className="absolute -bottom-2 -right-2 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity pointer-events-none">
            <CheckCircleIcon size={48} className="text-emerald-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-zinc-400">Resolution Rate</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
              <ArrowUpRightIcon size={12} />
              4.1%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white">92.4%</h3>
          <p className="text-xs text-zinc-500 mt-2">vs last week</p>
        </div>

        {/* Stat Card 4 */}
        <div className="glass p-5 rounded-2xl border border-dark-border relative overflow-hidden group hover:border-rose-500/50 transition-colors cursor-pointer">
          <div className="absolute -bottom-2 -right-2 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity pointer-events-none">
            <AlertCircleIcon size={48} className="text-rose-500" />
          </div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-zinc-400">SLA Breaches</p>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">
              <ArrowDownRightIcon size={12} />
              1
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white">3</h3>
          <p className="text-xs text-zinc-500 mt-2">vs last week</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ticket Queue */}
        <div className="lg:col-span-2 glass rounded-2xl border border-dark-border overflow-hidden">
          <div className="px-6 py-5 border-b border-dark-border flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Recent Tickets</h2>
            <button className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors bg-brand-500/10 px-3 py-1.5 rounded-md">
              View All
            </button>
          </div>
          
          <div className="divide-y divide-dark-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-6 py-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-4 items-start">
                <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${i === 1 || i === 4 ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' : i === 2 ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-brand-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]'}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-white truncate">
                      {i === 1 ? "Database connection timeout in production" : i === 2 ? "Error 500 on checkout page" : "Update billing information"}
                    </p>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">#TKT-{1042 + i}</span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1 mb-2">
                    Customer is reporting that they cannot access the production database due to a timeout error ...
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-medium">
                    <span className="text-zinc-500 flex items-center gap-1">
                      <ClockIcon size={12} /> 2 hours ago
                    </span>
                    <span className="px-2 py-0.5 rounded bg-dark-surface border border-dark-border text-zinc-300">
                      Engineering
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass rounded-2xl border border-dark-border overflow-hidden">
          <div className="px-6 py-5 border-b border-dark-border">
            <h2 className="text-lg font-semibold text-white">Activity Feed</h2>
          </div>
          <div className="p-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-6 bottom-6 w-px bg-dark-border"></div>
            
            <div className="space-y-6 relative">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-dark-surface border-2 border-brand-500 z-10 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">Alice Chen</span> {i === 1 ? 'resolved' : i === 2 ? 'commented on' : 'assigned'} ticket <span className="text-brand-400">#TKT-1042</span>
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{i * 15} mins ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
