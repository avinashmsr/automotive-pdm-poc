import React from "react";
import { Vehicle } from "../types";

export default function VehicleList({ items, onPick }:{ items:Vehicle[]; onPick:(v:Vehicle)=>void }) {
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Vehicles</h3>
      <div className="list">
        {items.map(v => (
          <div key={v.id} className="item">
            <div>
              <div style={{fontWeight:600}}>{v.year} {v.make} {v.model}</div>
              <div className="label">{v.vin} • {v.mileage.toLocaleString()} mi</div>
            </div>
            <button className="button" onClick={()=>onPick(v)}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}