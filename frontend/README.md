# Smart Traffic Signal — Frontend Dashboard

A React + Tailwind CSS dashboard for monitoring the RFID-based ambulance
clearance system. Connects to the FastAPI backend over REST; falls back to
mock data automatically if the backend isn't running, so it can always be
demoed on its own.

## Folder structure

```
smart-traffic-frontend/
├── src/
│   ├── api/
│   │   └── api.js                # backend calls + mock fallback
│   ├── mock/
│   │   └── mockData.js           # dummy events/status for offline demo
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── TopBar.jsx
│   │   ├── SignalIndicator.jsx
│   │   ├── EmergencyStatusBanner.jsx
│   │   ├── StatCard.jsx
│   │   ├── CountdownTimer.jsx
│   │   └── EventsTable.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── EmergencyEvents.jsx
│   │   ├── TrafficStatus.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── .env.example
└── README.md
```

## 1. Installation

Requires Node.js 18+.

```bash
cd smart-traffic-frontend
npm install
```

## 2. Connect to your backend (optional)

```bash
cp .env.example .env
```

Edit `.env` and set the backend URL:
```
VITE_API_BASE_URL=http://localhost:8000
```

If you skip this step, or the backend isn't running, the dashboard
automatically shows mock/dummy data instead — every page displays a
`LIVE BACKEND` / `MOCK DATA` badge in the top-right so it's always clear
which one you're looking at.

## 3. Run locally

```bash
npm run dev
```

Open **http://localhost:5173**.

## 4. Build for production

```bash
npm run build
npm run preview   # serve the production build locally
```

## Pages

| Page              | Route               | What it shows                                              |
|-------------------|----------------------|-------------------------------------------------------------|
| Dashboard         | `/`                  | Signal status, emergency banner, detected RFID, countdown, event count, latest event, recent events table |
| Emergency Events  | `/emergency-events`  | Full event log with adjustable row count                     |
| Traffic Status    | `/traffic-status`    | Per-direction signal state (N/E/S/W)                          |
| Analytics         | `/analytics`         | Events-by-RFID-tag chart, clearance-duration trend chart       |
| Settings          | `/settings`          | Shows the configured backend URL and polling interval          |

## How the backend connection works

`src/api/api.js` calls two endpoints from your FastAPI backend:

- `GET /status` → current traffic/emergency status, detected RFID ID
- `GET /events/recent?limit=N` → recent emergency events

Each call has a 3-second timeout. If it fails (backend down, wrong URL,
CORS issue), the app quietly falls back to the mock data in
`src/mock/mockData.js` instead of crashing — this is what makes the
dashboard "backend-optional" for demo day.

**Note on emergency state:** the current backend tracks only
`active`/`cleared`, so the frontend derives the three states you asked for
(Normal / Ambulance Detected / Emergency Priority Active) from
`emergency_active` + `signal_status` in `deriveEmergencyState()` inside
`api.js`. The countdown timer is also simulated client-side for now, since
the backend doesn't send a clearance duration yet — both are clearly
marked in code comments as things to wire up to real values once the
backend exposes them.

## Enabling CORS on the FastAPI backend

If you run the frontend on a different port/host than the backend, add
this to `app/main.py` on the backend so the browser is allowed to call it:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```
