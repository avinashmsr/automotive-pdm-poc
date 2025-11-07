import React, { useEffect, useState } from "react";
import { listVehicleSummary } from "../api";
import { VehicleSummary } from "../types";
import VehiclesTable from "../components/VehiclesTable";

export default function Home() {
  const [rows, setRows] = useState<VehicleSummary[]>([]);
  useEffect(() => { listVehicleSummary().then(setRows); }, []);
  return <VehiclesTable items={rows} />;
}