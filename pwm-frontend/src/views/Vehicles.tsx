import { useState } from "react";
import VehicleList from "@/components/VehicleList";
import VehiclePanel from "@/components/VehiclePanel";

export default function Vehicles() {
  // Adjust types/prop names to your components
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-[360px,1fr]">
      <section className="rounded-xl border p-4">
        <h2 className="text-base font-semibold mb-3">Vehicles</h2>
        <VehicleList onSelect={(id: string) => setSelectedId(id)} />
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="text-base font-semibold mb-3">Details</h2>
        <VehiclePanel vehicleId={selectedId} />
      </section>
    </div>
  );
}