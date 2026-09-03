import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar.jsx";
import EventsTable from "../components/EventsTable.jsx";
import { getRecentEvents } from "../api/api.js";

export default function EmergencyEvents({ onMenuClick }) {
  const [events, setEvents] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    getRecentEvents(limit).then((res) => {
      setEvents(res.data);
      setIsLive(res.isLive);
    });
  }, [limit]);

  return (
    <div>
      <TopBar
        title="Emergency Events"
        subtitle="Full log of ambulance detections at this junction"
        onMenuClick={onMenuClick}
        isLive={isLive}
      />

      <div className="flex items-center gap-3 mb-4">
        <label className="text-xs text-muted font-mono">SHOW</label>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="bg-panel border border-border rounded-lg px-2 py-1.5 text-sm text-white"
        >
          <option value={10}>10 events</option>
          <option value={20}>20 events</option>
          <option value={50}>50 events</option>
        </select>
      </div>

      <EventsTable events={events} />
    </div>
  );
}
