import React, { useEffect, useState } from "react";
import { Radio, Clock, Siren, ListChecks } from "lucide-react";
import TopBar from "../components/TopBar.jsx";
import SignalIndicator from "../components/SignalIndicator.jsx";
import EmergencyStatusBanner from "../components/EmergencyStatusBanner.jsx";
import StatCard from "../components/StatCard.jsx";
import CountdownTimer from "../components/CountdownTimer.jsx";
import EventsTable from "../components/EventsTable.jsx";
import { getCurrentStatus, getRecentEvents, deriveEmergencyState } from "../api/api.js";

const POLL_INTERVAL_MS = 5000;

export default function Dashboard({ onMenuClick }) {
  const [status, setStatus] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLive, setIsLive] = useState(false);

  async function refresh() {
    const [statusRes, eventsRes] = await Promise.all([getCurrentStatus(), getRecentEvents(5)]);
    setStatus(statusRes.data);
    setEvents(eventsRes.data);
    setIsLive(statusRes.isLive && eventsRes.isLive);
  }

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  if (!status) {
    return <div className="text-muted text-sm">Loading dashboard...</div>;
  }

  const emergencyState = deriveEmergencyState(status);
  const emergencyActive = status.emergency_active;
  const activeSignal = emergencyActive ? "green" : "red";
  const latestEvent = events[0];

  return (
    <div>
      <TopBar
        title="Smart Traffic Signal — Ambulance Clearance Dashboard"
        subtitle="Final Year BE CSE Project · JN-04, MG Road × NH-4"
        onMenuClick={onMenuClick}
        isLive={isLive}
      />

      <div className="mb-6">
        <EmergencyStatusBanner status={emergencyState} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="bg-panel border border-border rounded-xl p-4">
          <p className="text-[11px] uppercase tracking-wider text-muted font-mono mb-3">Current signal</p>
          <div className="flex items-center gap-4">
            <SignalIndicator active={activeSignal} />
            <div>
              <p className="font-display font-semibold text-lg capitalize">{activeSignal}</p>
              <p className="text-xs text-muted">
                {emergencyActive ? "Priority clearance in progress" : "Normal automatic sequence"}
              </p>
            </div>
          </div>
        </div>

        <StatCard icon={Radio} label="Detected RFID ID" value={status.rfid_id || "--"} mono />
        <StatCard
          icon={Clock}
          label="Detection time"
          value={status.last_updated ? new Date(status.last_updated).toLocaleTimeString("en-IN") : "--"}
          mono
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <CountdownTimer active={emergencyActive} rfidId={status.rfid_id} />
        <StatCard icon={ListChecks} label="Total emergency events" value={events.length} />
        <StatCard
          icon={Siren}
          label="Latest event"
          value={latestEvent ? `${latestEvent.rfid_id} · ${latestEvent.status}` : "No events yet"}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-base tracking-wide">Recent emergency events</h2>
        </div>
        <EventsTable events={events} />
      </div>
    </div>
  );
}
