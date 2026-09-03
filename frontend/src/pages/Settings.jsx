import React from "react";
import TopBar from "../components/TopBar.jsx";

export default function Settings({ onMenuClick }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  return (
    <div>
      <TopBar title="Settings" subtitle="Backend connection details" onMenuClick={onMenuClick} isLive={false} />

      <div className="bg-panel border border-border rounded-xl p-5 max-w-xl">
        <p className="text-[11px] uppercase tracking-wider text-muted font-mono mb-2">Backend API base URL</p>
        <p className="font-mono text-sm bg-base border border-border rounded-lg px-3 py-2">{baseUrl}</p>
        <p className="text-xs text-muted mt-3">
          Set <code className="font-mono">VITE_API_BASE_URL</code> in a <code className="font-mono">.env</code> file
          at the project root, then restart <code className="font-mono">npm run dev</code> for it to take effect. If
          the backend at this address doesn't respond, every page automatically falls back to mock data so the
          dashboard still works for demonstration.
        </p>
      </div>

      <div className="bg-panel border border-border rounded-xl p-5 max-w-xl mt-5">
        <p className="text-[11px] uppercase tracking-wider text-muted font-mono mb-2">Poll interval</p>
        <p className="text-sm text-muted">
          The dashboard refreshes status and events every 5 seconds. Change{" "}
          <code className="font-mono">POLL_INTERVAL_MS</code> in{" "}
          <code className="font-mono">src/pages/Dashboard.jsx</code> to adjust it.
        </p>
      </div>
    </div>
  );
}
