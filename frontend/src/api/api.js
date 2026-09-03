import { mockEvents, mockStatus } from "../mock/mockData.js";

// Set VITE_API_BASE_URL in a .env file to point at your running FastAPI
// backend, e.g. VITE_API_BASE_URL=http://localhost:8000
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const REQUEST_TIMEOUT_MS = 3000;

async function fetchWithTimeout(path) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/**
 * Returns { data, isLive } where isLive tells the UI whether this is
 * real backend data or a mock fallback, so we can show a small badge.
 */
export async function getCurrentStatus() {
  try {
    const data = await fetchWithTimeout("/status");
    return { data, isLive: true };
  } catch {
    return { data: mockStatus, isLive: false };
  }
}

export async function getRecentEvents(limit = 20) {
  try {
    const data = await fetchWithTimeout(`/events/recent?limit=${limit}`);
    // backend doesn't return a "duration" field yet -- default to null
    // and let the UI show "--" until that's added.
    const normalized = data.map((e) => ({ ...e, duration: e.duration ?? null }));
    return { data: normalized, isLive: true };
  } catch {
    return { data: mockEvents, isLive: false };
  }
}

/**
 * Derives the 3-state emergency status the dashboard needs
 * (Normal / Ambulance Detected / Emergency Priority Active) from the
 * raw backend status, since the backend only tracks active vs. not.
 */
export function deriveEmergencyState(status) {
  if (!status || !status.emergency_active) return "Normal";
  if (status.signal_status === "green") return "Emergency Priority Active";
  return "Ambulance Detected";
}
