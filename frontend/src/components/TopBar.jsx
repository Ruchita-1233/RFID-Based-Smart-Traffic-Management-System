import React from "react";
import { Menu, Wifi, WifiOff } from "lucide-react";

export default function TopBar({ title, subtitle, onMenuClick, isLive }) {
  return (
    <div className="flex items-center justify-between mb-6 gap-3">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg border border-border text-muted hover:text-white"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1 className="font-display font-semibold text-xl md:text-2xl tracking-wide">{title}</h1>
          {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono ${
          isLive
            ? "border-signalgreen/40 text-signalgreen bg-signalgreen/10"
            : "border-signalamber/40 text-signalamber bg-signalamber/10"
        }`}
      >
        {isLive ? <Wifi size={13} /> : <WifiOff size={13} />}
        {isLive ? "LIVE BACKEND" : "MOCK DATA"}
      </div>
    </div>
  );
}
