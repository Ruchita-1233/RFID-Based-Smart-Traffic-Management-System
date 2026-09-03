import React from "react";

function formatDateTime(ts) {
  if (!ts) return "--";
  const d = new Date(ts);
  if (isNaN(d.getTime())) return ts;
  return d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "medium" });
}

function StatusPill({ status }) {
  const isActive = status === "active";
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-mono border ${
        isActive
          ? "border-signalred/40 text-signalred bg-signalred/10"
          : "border-signalgreen/40 text-signalgreen bg-signalgreen/10"
      }`}
    >
      {isActive ? "ACTIVE" : "CLEARED"}
    </span>
  );
}

export default function EventsTable({ events }) {
  return (
    <div className="bg-panel border border-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {["Event ID", "RFID ID", "Date & Time", "Signal Status", "Emergency Status", "Duration"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-muted font-mono whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted text-sm">
                  No emergency events recorded yet.
                </td>
              </tr>
            )}
            {events.map((e) => (
              <tr key={e.event_id} className="border-b border-border/60 last:border-0 hover:bg-panel2/60">
                <td className="px-4 py-3 font-mono text-muted">#{e.event_id}</td>
                <td className="px-4 py-3 font-mono">{e.rfid_id}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(e.timestamp)}</td>
                <td className="px-4 py-3 capitalize">{e.signal_status}</td>
                <td className="px-4 py-3">
                  <StatusPill status={e.status} />
                </td>
                <td className="px-4 py-3 font-mono">{e.duration != null ? `${e.duration}s` : "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
