"use client";

import { PlusIcon, FilterIcon, MoreHorizontalIcon, SearchIcon, TrashIcon, CheckIcon, Loader2Icon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";

export default function TicketsPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPriority, setNewPriority] = useState("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dropdown states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApi("/tickets");
      setTickets(data);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await fetchApi("/tickets", {
        method: "POST",
        body: { title: newTitle, description: newDesc, priority: newPriority, category: "General" }
      });
      setIsModalOpen(false);
      setNewTitle("");
      setNewDesc("");
      loadTickets(); // Reload
    } catch (err) {
      alert("Failed to create ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTicket = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ticket?")) return;
    try {
      await fetchApi(`/tickets/${id}`, { method: "DELETE" });
      setTickets(tickets.filter(t => t.id !== id));
      setActiveDropdown(null);
    } catch (err) {
      alert("Failed to delete ticket");
    }
  };

  const markResolved = async (id: string) => {
    try {
      await fetchApi(`/tickets/${id}`, { method: "PATCH", body: { status: "RESOLVED" } });
      loadTickets();
      setActiveDropdown(null);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.author?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CRITICAL': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      case 'IN_PROGRESS': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'RESOLVED': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'CLOSED': return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
      default: return 'bg-brand-500/10 text-brand-400 border-brand-500/20'; // OPEN
    }
  };

  function timeAgo(dateString: string) {
    const diff = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col relative w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Support Tickets</h1>
          <p className="text-zinc-400 mt-1 text-sm">Manage, assign, and resolve customer issues.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">
            <FilterIcon size={16} /> Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 rounded-lg text-sm font-medium text-white shadow-lg shadow-brand-500/20 transition-all active:scale-95"
          >
            <PlusIcon size={16} /> New Ticket
          </button>
        </div>
      </div>

      <div className="flex-1 glass rounded-2xl border border-dark-border flex flex-col relative min-h-[400px]">
        <div className="border-b border-dark-border p-4 flex gap-4">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search tickets by ID, title, or customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/20 border border-dark-border rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2Icon className="animate-spin text-brand-500" size={32} />
            </div>
          ) : (
            <table className="w-full text-left text-sm text-zinc-400">
              <thead className="text-xs uppercase bg-black/20 text-zinc-500 sticky top-0 backdrop-blur-md z-10">
                <tr>
                  <th className="px-6 py-4 font-medium">Ticket Details</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredTickets.length > 0 ? filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white mb-0.5 max-w-xs truncate">{ticket.title}</span>
                        <span className="text-xs text-zinc-500 flex items-center gap-2 uppercase">
                          {ticket.id.substring(0,8)} <span className="w-1 h-1 rounded-full bg-zinc-600"></span> {timeAgo(ticket.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-300 font-medium">
                      {ticket.author?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 flex items-center gap-1.5 w-fit rounded-full text-xs font-semibold border ${getStatusColor(ticket.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold uppercase ${ticket.priority === 'HIGH' ? 'text-rose-400' : ticket.priority === 'MEDIUM' ? 'text-orange-400' : 'text-zinc-400'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === ticket.id ? null : ticket.id)}
                        className="p-2 pt-2 text-zinc-500 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <MoreHorizontalIcon size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === ticket.id && (
                        <div className="absolute right-6 top-10 mt-2 w-48 bg-dark-surface border border-dark-border rounded-xl shadow-xl z-50 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-200">
                          <button 
                            onClick={() => markResolved(ticket.id)}
                            className="w-full px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-emerald-500/10 flex items-center gap-2 transition-colors"
                          >
                            <CheckIcon size={14} className="text-emerald-500" /> Mark Resolved
                          </button>
                          <button 
                            className="w-full px-4 py-2.5 text-sm text-zinc-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors border-b border-dark-border"
                          >
                            <SearchIcon size={14} className="text-zinc-500" /> View Details
                          </button>
                          <button 
                            onClick={() => deleteTicket(ticket.id)}
                            className="w-full px-4 py-2.5 text-sm font-medium text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors"
                          >
                            <TrashIcon size={14} /> Delete Ticket
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* CREATE TICKET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-surface border border-dark-border rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 fade-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-dark-border/50">
              <h2 className="text-xl font-bold text-white">Create New Ticket</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <XIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateTicket} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Ticket Subject</label>
                <input 
                  required
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="E.g., Cannot login to dashboard"
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Priority Level</label>
                <select 
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-dark-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
                >
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-dark-border/50">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-zinc-300 hover:text-white font-medium text-sm transition-colors">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium text-sm shadow-lg shadow-brand-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Submit Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
