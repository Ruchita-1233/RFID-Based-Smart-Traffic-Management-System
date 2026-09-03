import React, { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import TopBar from "../components/TopBar.jsx";
import { getRecentEvents } from "../api/api.js";

const chartTooltipStyle = {
  contentStyle: { background: "#17213A", border: "1px solid #243252", borderRadius: 6, fontSize: 12 },
  labelStyle: { color: "#EDF1F7" },
};

export default function Analytics({ onMenuClick }) {
  const [events, setEvents] = useState([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    getRecentEvents(50).then((res) => {
      setEvents(res.data);
      setIsLive(res.isLive);
    });
  }, []);

  const rfidFrequency = useMemo(() => {
    const counts = {};
    events.forEach((e) => {
      counts[e.rfid_id] = (counts[e.rfid_id] || 0) + 1;
    });
    return Object.entries(counts).map(([rfid_id, count]) => ({ rfid_id, count }));
  }, [events]);

  const durationTrend = useMemo(
    () =>
      events
        .filter((e) => e.duration != null)
        .slice(0, 10)
        .reverse()
        .map((e, i) => ({ n: String(i + 1), sec: e.duration })),
    [events]
  );

  return (
    <div>
      <TopBar
        title="Analytics"
        subtitle="Emergency-event patterns at this junction"
        onMenuClick={onMenuClick}
        isLive={isLive}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-panel border border-border rounded-xl p-5">
          <p className="font-display font-semibold text-sm tracking-wide mb-4">Events by RFID tag</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={rfidFrequency}>
              <CartesianGrid stroke="#243252" vertical={false} />
              <XAxis dataKey="rfid_id" tick={{ fill: "#8792AC", fontSize: 10 }} axisLine={{ stroke: "#243252" }} tickLine={false} />
              <YAxis tick={{ fill: "#8792AC", fontSize: 11 }} axisLine={{ stroke: "#243252" }} tickLine={false} allowDecimals={false} />
              <Tooltip {...chartTooltipStyle} />
              <Bar dataKey="count" fill="#3EC9DC" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-panel border border-border rounded-xl p-5">
          <p className="font-display font-semibold text-sm tracking-wide mb-4">Clearance duration trend (sec)</p>
          {durationTrend.length === 0 ? (
            <p className="text-sm text-muted py-16 text-center">No duration data available yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={durationTrend}>
                <CartesianGrid stroke="#243252" vertical={false} />
                <XAxis dataKey="n" tick={{ fill: "#8792AC", fontSize: 11 }} axisLine={{ stroke: "#243252" }} tickLine={false} />
                <YAxis tick={{ fill: "#8792AC", fontSize: 11 }} axisLine={{ stroke: "#243252" }} tickLine={false} />
                <Tooltip {...chartTooltipStyle} />
                <Line type="monotone" dataKey="sec" stroke="#2ECC71" strokeWidth={2} dot={{ r: 3, fill: "#2ECC71" }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
