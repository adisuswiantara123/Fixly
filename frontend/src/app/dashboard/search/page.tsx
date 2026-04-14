"use client";

import { useSearchParams } from "next/navigation";
import { SearchIcon, TicketIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  // Combine our dummy data from both pages
  const dummyTickets = [
    { id: "TKT-1045", title: "Cannot access production database", type: "ticket" },
    { id: "TKT-1044", title: "Error 500 on checkout", type: "ticket" },
    { id: "TKT-1043", title: "Update billing information", type: "ticket" },
    { id: "TKT-1042", title: "Reset user password", type: "ticket" },
    { id: "TKT-1041", title: "API rate limit exceeded", type: "ticket" }
  ];

  const dummyCustomers = [
    { name: "Alice Chen", company: "TechNova", type: "customer" },
    { name: "Bob Smith", company: "AeroDynamics", type: "customer" },
    { name: "Charlie Davis", company: "Lumina", type: "customer" },
    { name: "Diana Prince", company: "Themyscira Corp", type: "customer" },
    { name: "Evan Wright", company: "Wright Systems", type: "customer" }
  ];

  const filteredTickets = dummyTickets.filter(ticket => 
    ticket.title.toLowerCase().includes(query.toLowerCase()) || 
    ticket.id.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCustomers = dummyCustomers.filter(customer => 
    customer.name.toLowerCase().includes(query.toLowerCase()) || 
    customer.company.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = filteredTickets.length + filteredCustomers.length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Search Results</h1>
        <p className="text-zinc-400 mt-1 text-sm">
          {query ? `Found ${totalResults} results for "${query}"` : "Please enter a search query"}
        </p>
      </div>

      <div className="flex-1 glass rounded-2xl border border-dark-border overflow-auto p-2 sm:p-6">
        
        {!query && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-dark-bg/50 flex items-center justify-center mb-4">
              <SearchIcon size={24} className="text-zinc-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Start Typing to Search</h3>
            <p className="text-sm text-zinc-400 max-w-sm">Use the search bar above to look up tickets by their ID or title, or customers by name or company.</p>
          </div>
        )}

        {query && totalResults === 0 && (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-dark-bg/50 flex items-center justify-center mb-4 border border-dark-border">
              <SearchIcon size={24} className="text-zinc-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Results Found</h3>
            <p className="text-sm text-zinc-400 max-w-sm">We couldn't find anything matching "{query}". Try adjusting your search terms.</p>
          </div>
        )}

        {/* Tickets Results */}
        {filteredTickets.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">Tickets ({filteredTickets.length})</h2>
            <div className="space-y-2">
              {filteredTickets.map((ticket, i) => (
                <Link href="/dashboard/tickets" key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-dark-border transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
                    <TicketIcon size={18} className="text-brand-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-brand-400 transition-colors">{ticket.title}</h3>
                    <p className="text-sm text-zinc-500">{ticket.id}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Customers Results */}
        {filteredCustomers.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">Customers ({filteredCustomers.length})</h2>
            <div className="space-y-2">
              {filteredCustomers.map((customer, i) => (
                <Link href="/dashboard/customers" key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 border border-transparent hover:border-dark-border transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <UserIcon size={18} className="text-orange-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">{customer.name}</h3>
                    <p className="text-sm text-zinc-500">{customer.company}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
