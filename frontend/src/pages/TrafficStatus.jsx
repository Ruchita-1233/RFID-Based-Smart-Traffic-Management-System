import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar.jsx";
import SignalIndicator from "../components/SignalIndicator.jsx";
import EmergencyStatusBanner from "../components/EmergencyStatusBanner.jsx";
import { getCurrentStatus, deriveEmergencyState } from "../api/api.js";

const DIRECTIONS = ["North", "East", "South", "West"];

export default function TrafficStatus({ onMenuClick }) {
  const [status, setStatus] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await getCurrentStatus();
      setStatus(res.data);
      setIsLive(res.isLive);
    }
    load();
    const t = setInterval(load, 5000);
    return () => clearInterval(t);
  }, []);

  if (!status) return <div className="text-muted text-sm">Loading...</div>;

  const emergencyState = deriveEmergencyState(status);
  const priorityDirection = "East"; // demo placeholder -- backend doesn't send direction yet

  return (
    <div>
      <TopBar
        title="Traffic Status"
        subtitle="Per-direction signal state at JN-04"
        onMenuClick={onMenuClick}
        isLive={isLive}
      />

      <div className="mb-6">
        <EmergencyStatusBanner status={emergencyState} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {DIRECTIONS.map((dir) => {
          const isGreen = status.emergency_active ? dir === priorityDirection : false;
          return (
            <div key={dir} className="bg-panel border border-border rounded-xl p-5 flex flex-col items-center gap-3">
              <p className="text-[11px] uppercase tracking-wider text-muted font-mono">{dir} approach</p>
              <SignalIndicator active={isGreen ? "green" : "red"} />
              <p className={`font-mono text-xs ${isGreen ? "text-signalgreen" : "text-muted"}`}>
                {isGreen ? "CLEAR" : "STOP"}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted mt-5">
        Note: the current backend does not report which approach direction is cleared, so this view
        highlights a fixed direction whenever emergency priority is active. Extend the{" "}
        <code className="font-mono">/status</code> endpoint with a <code className="font-mono">direction</code>{" "}
        field to make this live.
      </p>
    </div>
  );
}
