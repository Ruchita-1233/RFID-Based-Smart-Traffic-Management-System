import React from "react";

export default function StatCard({ icon: Icon, label, value, accent = "text-white", mono = false }) {
  return (
    <div className="bg-panel border border-border rounded-xl p-4 flex items-center gap-3">
      {Icon && (
        <div className="w-9 h-9 rounded-lg bg-panel2 border border-border flex items-center justify-center shrink-0">
          <Icon size={16} className="text-accent" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted font-mono truncate">{label}</p>
        <p className={`font-display font-semibold text-lg truncate ${mono ? "font-mono text-base" : ""} ${accent}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
