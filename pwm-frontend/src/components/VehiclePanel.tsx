import React, { useEffect, useState } from "react";
import { Vehicle, Telemetry, PredictOut } from "../types";
import { latestTelemetry, postPredict, ingestTelemetry, serviceHistory } from "../api";
import RiskBar from "./RiskBar";

export default function VehiclePanel({ vehicle }:{ vehicle:Vehicle }) {
  const [tel, setTel] = useState<Telemetry | null>(null);
  const [pred, setPred] = useState<PredictOut | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [form, setForm] = useState({
    mileage: vehicle.mileage,
    engine_temp_avg: 92, oil_level: 0.6, brake_pad_thickness: 7.5,
    tire_tread_depth: 6.5, battery_health: 0.85, harsh_braking_count: 2, dtc_count: 0
  });

  useEffect(()=>{ latestTelemetry(vehicle.id).then(setTel).catch(()=>{}); serviceHistory(vehicle.id).then(setServices); }, [vehicle.id]);

  const predict = async () => {
    const payload = { vehicle_id: vehicle.id, ...form };
    const r = await postPredict(payload); setPred(r);
  };
  const pushTelemetry = async () => {
    const payload = { vehicle_id: vehicle.id, ...form };
    const r = await ingestTelemetry(payload); setTel(r);
  };

  return (
    <div className="card">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h3 style={{marginTop:0}}>Vehicle • {vehicle.year} {vehicle.make} {vehicle.model}</h3>
        <span className="badge">{vehicle.vin}</span>
      </div>

      {pred && <RiskBar score={pred.risk_score} />}

      <div className="row" style={{marginTop:16}}>
        <div className="col">
          <h4>Telemetry (simulate)</h4>
          <div className="kv">
            {Object.entries(form).map(([k,v])=>(
              <React.Fragment key={k}>
                <span>{k}</span>
                <input className="input" value={v as any}
                  onChange={e=>setForm(f=>({...f, [k]: Number(e.target.value)}))} />
              </React.Fragment>
            ))}
          </div>
          <div style={{display:"flex", gap:8, marginTop:12}}>
            <button className="button" onClick={predict}>Predict Risk</button>
            <button className="button" onClick={pushTelemetry}>Ingest Telemetry</button>
          </div>
        </div>
        <div className="col">
          <h4>Latest Telemetry</h4>
          {tel ? (
            <div className="kv">
              {Object.entries(tel).filter(([k])=>!["id","vehicle_id","ts"].includes(k)).map(([k,v])=>(
                <React.Fragment key={k}><span>{k}</span><div>{String(v)}</div></React.Fragment>
              ))}
            </div>
          ) : <div className="label">No telemetry yet.</div>}

          <hr />
          <h4>Service History</h4>
          {services.length ? services.map(s=>(
            <div key={s.id} style={{marginBottom:10}}>
              <div style={{fontWeight:600}}>{new Date(s.date).toLocaleDateString()} • {s.event_type}</div>
              <div className="label">{s.odometer.toLocaleString()} mi — {s.description}</div>
            </div>
          )) : <div className="label">No service records.</div>}
        </div>
      </div>

      {pred && (
        <>
          <hr/>
          <h4>Top Factors</h4>
          <div className="kv">
            {pred.top_factors.map((f,i)=>(
              <React.Fragment key={i}><span>{f.name}</span><div>{f.contribution.toFixed(3)}</div></React.Fragment>
            ))}
          </div>
          <div style={{marginTop:12}} className="badge">
            Suggested next service in ≈ {pred.next_service_eta_days} days
          </div>
        </>
      )}
    </div>
  );
}