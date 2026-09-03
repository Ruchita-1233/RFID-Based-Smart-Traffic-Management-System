import React from "react";

const LIGHTS = ["red", "amber", "green"];
const COLOR_MAP = { red: "#E4483A", amber: "#F2A93B", green: "#2ECC71" };

export default function SignalIndicator({ active = "red", size = 16 }) {
  return (
    <div className="flex flex-col gap-2 bg-base border border-border rounded-lg p-3 w-fit">
      {LIGHTS.map((l) => (
        <span
          key={l}
          className="rounded-full block"
          style={{
            width: size,
            height: size,
            background: active === l ? COLOR_MAP[l] : "#232c40",
            boxShadow: active === l ? `0 0 10px 2px ${COLOR_MAP[l]}99` : "none",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        />
      ))}
    </div>
  );
}
