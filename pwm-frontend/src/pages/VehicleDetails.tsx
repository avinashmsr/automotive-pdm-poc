import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getVehicle } from "../api";
import { Vehicle } from "../types";
import VehiclePanel from "../components/VehiclePanel";

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    if (id) getVehicle(Number(id)).then(setVehicle);
  }, [id]);

  return (
    <div>
      <div style={{marginBottom:12}}>
        <Link to="/" className="button">← Back to list</Link>
      </div>
      {vehicle ? <VehiclePanel vehicle={vehicle} /> : <div className="label">Loading…</div>}
    </div>
  );
}