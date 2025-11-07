import React from "react";
import { VehicleSummary } from "../types";

type Props = { items: VehicleSummary[] };

export default function VehiclesTable({ items }: Props) {
  const openDetails = (id: number) => {
    window.open(`/vehicle/${id}`, "_blank", "noopener,noreferrer");
  };

  const fmtDate = (s?: string | null) => s ? new Date(s).toLocaleDateString() : "—";

  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Vehicles at this Dealership</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Model</th>
            <th>VIN</th>
            <th>Odometer</th>
            <th>Date of Purchase</th>
            <th>Last Service</th>
          </tr>
        </thead>
        <tbody>
          {items.map(v => (
            <tr key={v.id} onClick={() => openDetails(v.id)}>
              <td>{v.year} {v.make} {v.model}</td>
              <td><span className="badge">{v.vin}</span></td>
              <td>{v.mileage.toLocaleString()} mi</td>
              <td>{fmtDate(v.in_service_date)}</td>
              <td>{fmtDate(v.last_service_date ?? undefined)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:10}} className="label">
        Click any row to open the vehicle details in a new tab.
      </div>
    </div>
  );
}