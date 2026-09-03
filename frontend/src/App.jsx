import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmergencyEvents from "./pages/EmergencyEvents.jsx";
import TrafficStatus from "./pages/TrafficStatus.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <div className="min-h-screen bg-base text-white flex">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <main className="flex-1 min-w-0 px-4 py-5 md:px-8 md:py-8">
        <Routes>
          <Route path="/" element={<Dashboard onMenuClick={openSidebar} />} />
          <Route path="/emergency-events" element={<EmergencyEvents onMenuClick={openSidebar} />} />
          <Route path="/traffic-status" element={<TrafficStatus onMenuClick={openSidebar} />} />
          <Route path="/analytics" element={<Analytics onMenuClick={openSidebar} />} />
          <Route path="/settings" element={<Settings onMenuClick={openSidebar} />} />
        </Routes>
      </main>
    </div>
  );
}
