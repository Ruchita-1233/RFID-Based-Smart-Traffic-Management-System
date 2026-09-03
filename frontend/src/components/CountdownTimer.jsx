import React, { useEffect, useState } from "react";
import { Timer } from "lucide-react";

/**
 * Client-side countdown shown while emergency priority is active.
 * The backend doesn't send a clearance duration yet, so this
 * simulates one (resets whenever a new RFID ID is detected) --
 * swap `startSeconds` for a real value once the backend provides it.
 */
export default function CountdownTimer({ active, rfidId, startSeconds = 15 }) {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    setSeconds(startSeconds);
  }, [rfidId, active, startSeconds]);

  useEffect(() => {
    if (!active || seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [active, seconds]);

  return (
    <div className="bg-panel border border-border rounded-xl p-4 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-panel2 border border-border flex items-center justify-center shrink-0">
        <Timer size={16} className="text-accent" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted font-mono">Clearance countdown</p>
        <p className="font-mono font-semibold text-lg">
          {active ? `${seconds}s` : "--"}
        </p>
      </div>
    </div>
  );
}
