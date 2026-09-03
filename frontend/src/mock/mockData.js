export const mockEvents = [
  { event_id: 1, rfid_id: "KA25-AMB-0417", timestamp: "2026-08-21T09:14:02", signal_status: "green", status: "active", duration: 14 },
  { event_id: 2, rfid_id: "KA25-AMB-0092", timestamp: "2026-08-21T08:47:31", signal_status: "green", status: "cleared", duration: 11 },
  { event_id: 3, rfid_id: "KA25-AMB-0417", timestamp: "2026-08-21T08:02:55", signal_status: "green", status: "cleared", duration: 16 },
  { event_id: 4, rfid_id: "KA25-AMB-0311", timestamp: "2026-08-21T07:26:10", signal_status: "green", status: "cleared", duration: 12 },
  { event_id: 5, rfid_id: "KA25-AMB-0092", timestamp: "2026-08-21T06:58:44", signal_status: "green", status: "cleared", duration: 9 },
  { event_id: 6, rfid_id: "KA25-AMB-0417", timestamp: "2026-08-21T06:10:19", signal_status: "green", status: "cleared", duration: 13 },
];

export const mockStatus = {
  emergency_active: true,
  rfid_id: "KA25-AMB-0417",
  signal_status: "green",
  last_updated: "2026-08-21T09:14:02",
  message: "Emergency priority active for KA25-AMB-0417.",
};
