import React from "react";

export default function RiskBar({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const label = score >= 0.75 ? "HIGH" : score >= 0.5 ? "MEDIUM" : "LOW";
  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", marginBottom:6}}>
        <span className="label">Warranty Risk</span><span className="badge">{label} • {pct}%</span>
      </div>
      <div style={{height:12, background:"#0e1627", border:"1px solid #263150", borderRadius:999}}>
        <div style={{
          width:`${pct}%`, height:"100%", borderRadius:999,
          background: "linear-gradient(90deg, #22c55e, #eab308, #ef4444)"
        }} />
      </div>
    </div>
  );
} 