"use client";

import { UsersIcon, MailIcon, MapPinIcon, MoreHorizontalIcon, SearchIcon, UserPlusIcon } from "lucide-react";
import { useState } from "react";

export default function CustomersPage() {
  const dummyCustomers = [
    { id: "CUS-8921", name: "Alice Chen", company: "TechNova", email: "alice@technova.io", location: "San Francisco", status: "Active" },
    { id: "CUS-8922", name: "Bob Smith", company: "AeroDynamics", email: "bsmith@aero.com", location: "London", status: "Active" },
    { id: "CUS-8923", name: "Charlie Davis", company: "Lumina", email: "charlie.d@lumina.design", location: "Berlin", status: "Inactive" },
    { id: "CUS-8924", name: "Diana Prince", company: "Themyscira Corp", email: "ceo@themyscira.co", location: "New York", status: "Active" },
    { id: "CUS-8925", name: "Evan Wright", company: "Wright Systems", email: "evan@wrightsys.net", location: "Sydney", status: "Pending" }
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = dummyCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Customer Database</h1>
          <p className="text-zinc-400 mt-1 text-sm">Directory of clients and end-users requesting support.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 rounded-lg text-sm font-medium text-white shadow-lg shadow-brand-500/20 transition-all active:scale-95">
            <UserPlusIcon size={16} /> Add Customer
          </button>
        </div>
      </div>

      <div className="flex-1 glass rounded-2xl border border-dark-border overflow-hidden flex flex-col">
        <div className="border-b border-dark-border p-4 flex gap-4 bg-black/10">
          <div className="relative flex-1 max-w-md">
            <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search by name, company, or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-bg/50 border border-dark-border rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 overflow-auto bg-black/5">
          {filteredCustomers.length > 0 ? filteredCustomers.map((customer, i) => (
            <div key={i} className="group bg-dark-surface/80 border border-dark-border hover:border-brand-500/30 rounded-xl p-5 hover:bg-white/[0.02] transition-colors flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white bg-gradient-to-br from-brand-500 to-brand-700 shadow-md">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-brand-400 transition-colors">{customer.name}</h3>
                    <p className="text-xs text-zinc-500">{customer.company}</p>
                  </div>
                </div>
                <button className="text-zinc-500 hover:text-white p-1">
                  <MoreHorizontalIcon size={18} />
                </button>
              </div>

              <div className="space-y-3 mt-auto pt-4 border-t border-dark-border/50">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <MailIcon size={14} className="text-zinc-500" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <MapPinIcon size={14} className="text-zinc-500" />
                  <span className="truncate">{customer.location}</span>
                </div>
              </div>

              <div className="mt-5 flex justify-between items-center">
                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                  customer.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                  customer.status === 'Pending' ? 'bg-orange-500/10 text-orange-400' :
                  'bg-zinc-500/10 text-zinc-400'
                }`}>
                  {customer.status}
                </span>
                <button className="text-xs font-medium text-brand-500 hover:text-brand-400 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No customers found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
