import React, { useEffect, useState } from "react";
import { listVehicles } from "./api";
//import { Vehicle } from "./types";
//import VehicleList from "./components/VehicleList";
//import VehiclePanel from "./components/VehiclePanel";
import ThemeToggle from "./components/ThemeToggle";  // <-- added ThemeToggle component dependency for dark/light mode
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VehicleDetails from "./pages/VehicleDetails";

export default function App() {
  //const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  //const [active, setActive] = useState<Vehicle | null>(null);
  //useEffect(()=>{ listVehicles().then((v)=>{ setVehicles(v); setActive(v[0] ?? null); }); }, []);

   return (
    <BrowserRouter>
      <div className="app">
        <div className="header">
          <h2 style={{margin:0}}>Predictive Warranty (Maintenance) PoC</h2>
          <div style={{display:"flex", gap:8, alignItems:"center"}}>
            <span className="badge">Demo • SDV + OBD + History</span>
            <ThemeToggle />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}