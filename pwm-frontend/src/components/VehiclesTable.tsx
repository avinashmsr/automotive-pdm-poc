import React from "react";
import { VehicleSummary } from "../types";
import { useNavigate } from "react-router-dom";

type Props = { items: VehicleSummary[] };

export default function VehiclesTable({ items }: Props) {
  const navigate = useNavigate();

  const openDetails = (id: number) => navigate(`/vehicle/${id}`);

  const fmtDate = (s?: string | null) => (s ? new Date(s).toLocaleDateString() : "—");

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Vehicles at this Dealership</h3>
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
          {items.map((v) => (
            <tr
              key={v.id}
              onClick={() => openDetails(v.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openDetails(v.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open details for ${v.year} ${v.make} ${v.model}`}
              style={{ outline: "none" }}
            >
              <td>{v.year} {v.make} {v.model}</td>
              <td><span className="badge">{v.vin}</span></td>
              <td>{v.mileage.toLocaleString()} mi</td>
              <td>{fmtDate(v.in_service_date)}</td>
              <td>{fmtDate(v.last_service_date ?? undefined)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 10 }} className="label">
        Click a row (or press Enter/Space) to view vehicle details.
      </div>
    </div>
  );
}