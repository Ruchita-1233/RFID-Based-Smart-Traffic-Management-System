import React from "react";
import { ShieldCheck, Siren, ShieldAlert } from "lucide-react";

const CONFIG = {
  Normal: {
    icon: ShieldCheck,
    color: "#2ECC71",
    bg: "bg-signalgreen/10",
    border: "border-signalgreen/40",
    text: "text-signalgreen",
  },
  "Ambulance Detected": {
    icon: Siren,
    color: "#F2A93B",
    bg: "bg-signalamber/10",
    border: "border-signalamber/40",
    text: "text-signalamber",
  },
  "Emergency Priority Active": {
    icon: ShieldAlert,
    color: "#E4483A",
    bg: "bg-signalred/10",
    border: "border-signalred/40",
    text: "text-signalred",
  },
};

export default function EmergencyStatusBanner({ status }) {
  const cfg = CONFIG[status] || CONFIG.Normal;
  const Icon = cfg.icon;
  const pulsing = status !== "Normal";

  return (
    <div className={`flex items-center gap-4 rounded-xl border ${cfg.border} ${cfg.bg} px-5 py-4`}>
      <div className={`relative w-11 h-11 rounded-full flex items-center justify-center ${cfg.bg} border ${cfg.border}`}>
        {pulsing && (
          <span
            className="absolute inset-0 rounded-full pulse-dot"
            style={{ background: cfg.color, opacity: 0.25 }}
          />
        )}
        <Icon size={20} className={cfg.text} />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted font-mono">Emergency status</p>
        <p className={`font-display font-semibold text-lg ${cfg.text}`}>{status}</p>
      </div>
    </div>
  );
}
