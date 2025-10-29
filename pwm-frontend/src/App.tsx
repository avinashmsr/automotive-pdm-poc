import { NavLink, Routes, Route } from "react-router-dom";
import Dashboard from "@/views/Dashboard";          // new page
import Vehicles from "@/views/Vehicles";            // wrapper using VehicleList + VehiclePanel

export default function App() {
  const baseLink = "px-3 py-1.5 rounded-md hover:bg-slate-100";
  const active = "bg-[#800000] text-white hover:bg-[#800000]"; // maroon

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Predictive Warranty (Maintenance) PoC</h1>
          <nav className="flex gap-2">
            <NavLink to="/" end className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>
              Dashboard
            </NavLink>
            <NavLink to="/vehicles" className={({isActive}) => `${baseLink} ${isActive ? active : ""}`}>
              Vehicles
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicles" element={<Vehicles />} />
        </Routes>
      </main>
    </div>
  );
}