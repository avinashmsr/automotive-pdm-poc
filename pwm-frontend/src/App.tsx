import React, { useEffect, useState } from "react";
import { listVehicles } from "./api";
import { Vehicle } from "./types";
import VehicleList from "./components/VehicleList";
import VehiclePanel from "./components/VehiclePanel";

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [active, setActive] = useState<Vehicle | null>(null);
  useEffect(()=>{ listVehicles().then((v)=>{ setVehicles(v); setActive(v[0] ?? null); }); }, []);
  return (
    <div className="app">
      <div className="header">
        <h2 style={{margin:0}}>Predictive Warranty (Maintenance) PoC</h2>
        <span className="badge">Demo • SDV + OBD + History</span>
      </div>
      <div className="row">
        <div className="col" style={{maxWidth:420}}><VehicleList items={vehicles} onPick={setActive}/></div>
        <div className="col">{active && <VehiclePanel vehicle={active}/>}</div>
      </div>
    </div>
  );
}