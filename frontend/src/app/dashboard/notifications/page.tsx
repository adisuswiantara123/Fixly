"use client";

import { BellIcon, TicketIcon, UserPlusIcon, AlertTriangleIcon, CheckCircleIcon, TrashIcon, XIcon } from "lucide-react";
import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "alert", title: "SLA Complete Failure Warning", desc: "Ticket #TKT-1045 is 30 minutes away from SLA breach.", time: "10 minutes ago", read: false },
    { id: 2, type: "ticket", title: "New Ticket Assigned", desc: "You have been assigned to #TKT-1044 by System Administrator.", time: "45 minutes ago", read: false },
    { id: 3, type: "success", title: "Bulk Update Successful", desc: "Successfully resolved 12 tickets from the marketing queue.", time: "2 hours ago", read: true },
    { id: 4, type: "user", title: "New Organization Registered", desc: "Themyscira Corp has been added to customers list.", time: "1 day ago", read: true },
    { id: 5, type: "ticket", title: "Customer Replied", desc: "Charlie Davis replied to #TKT-1043: 'Thank you for the update.'", time: "1 day ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangleIcon size={20} className="text-rose-500" />;
      case 'ticket': return <TicketIcon size={20} className="text-brand-500" />;
      case 'success': return <CheckCircleIcon size={20} className="text-emerald-500" />;
      case 'user': return <UserPlusIcon size={20} className="text-orange-500" />;
      default: return <BellIcon size={20} className="text-zinc-400" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-rose-500/10 border-rose-500/20';
      case 'ticket': return 'bg-brand-500/10 border-brand-500/20';
      case 'success': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'user': return 'bg-orange-500/10 border-orange-500/20';
      default: return 'bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Notifications</h1>
          <p className="text-zinc-400 mt-1 text-sm">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.`
              : "You're all caught up! No unread notifications."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-sm font-medium text-brand-400 hover:text-brand-300 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button 
              onClick={clearAll}
              className="text-sm font-medium text-zinc-500 hover:text-rose-400 px-3 py-2 hover:bg-rose-500/5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <TrashIcon size={14} /> Clear all
            </button>
          )}
        </div>
      </div>

      <div className="glass rounded-2xl border border-dark-border overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-dark-border">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                onClick={() => markAsRead(notif.id)}
                className={`p-5 flex gap-4 transition-all cursor-pointer group hover:bg-white/[0.02] ${!notif.read ? 'bg-brand-500/[0.03]' : ''}`}
              >
                <div className={`w-12 h-12 rounded-full border shrink-0 flex items-center justify-center ${getIconBg(notif.type)} transition-transform group-hover:scale-105`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex justify-between items-start gap-4 mb-1">
                    <h3 className={`font-semibold transition-colors ${!notif.read ? 'text-white' : 'text-zinc-300'}`}>
                      {notif.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {!notif.read && <span className="w-2.5 h-2.5 rounded-full bg-brand-500 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>}
                      <button 
                        onClick={(e) => { e.stopPropagation(); dismissNotification(notif.id); }}
                        className="p-1 text-zinc-600 hover:text-rose-400 rounded opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500/10"
                        title="Dismiss"
                      >
                        <XIcon size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-2 leading-relaxed">{notif.desc}</p>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-dark-bg/50 flex items-center justify-center mb-4 border border-dark-border">
              <BellIcon size={24} className="text-zinc-600" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">All Clear!</h3>
            <p className="text-sm text-zinc-400 max-w-xs">You have no notifications at the moment. We'll notify you when something happens.</p>
          </div>
        )}
      </div>
    </div>
  );
}
