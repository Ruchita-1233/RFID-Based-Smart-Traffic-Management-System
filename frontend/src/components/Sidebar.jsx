import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Siren, TrafficCone, BarChart3, Settings, Activity } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/emergency-events", label: "Emergency Events", icon: Siren },
  { to: "/traffic-status", label: "Traffic Status", icon: TrafficCone },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-panel border-r border-border
        transform transition-transform duration-200 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center gap-2 px-5 py-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-panel2 border border-border flex items-center justify-center">
            <Activity size={16} className="text-accent" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm tracking-wide leading-tight">
              JUNCTION CONTROL
            </p>
            <p className="text-[11px] text-muted leading-tight">JN-04 · MG Road</p>
          </div>
        </div>

        <nav className="px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/30"
                    : "text-muted hover:text-white hover:bg-panel2 border border-transparent"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-border">
          <p className="text-[11px] text-muted">Dept. of CSE</p>
          <p className="text-[11px] text-muted">Basaveshwar Engineering College</p>
        </div>
      </aside>
    </>
  );
}
