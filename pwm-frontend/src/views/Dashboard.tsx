import React, { useState } from "react";
import GaugeCircular, { GaugeRange } from "@/components/ui/GaugeCircular";
import Odometer from "@/components/ui/Odometer";
import ThermometerIcon from "@/components/icons/ThermometerIcon";
import PressureIcon from "@/components/icons/PressureIcon";
import BrakeDiscIcon from "@/components/icons/BrakeDiscIcon";
import TireIcon from "@/components/icons/TireIcon";

const riskRanges: GaugeRange[] = [
  { to: 0.4, color: "emerald" },
  { to: 0.7, color: "amber" },
  { to: 1.0, color: "rose" },
];

const Dashboard: React.FC = () => {
  // Wire these to your API data (e.g., /stats/lines, /telemetry/latest)
  const [mixTempC] = useState(165);
  const [pressMPa] = useState(34);
  const [cureSec]  = useState(1200);
  const [moisture] = useState(0.6);   // %
  const [riskPct]  = useState(18);    // %
  const [totalPads] = useState(45217);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <Odometer value={totalPads} digits={6} />
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border p-4 flex flex-col items-center">
          <GaugeCircular value={riskPct} min={0} max={100} ranges={riskRanges} unit="%" label="Overall Risk" size={150}>
            <BrakeDiscIcon />
          </GaugeCircular>
          <p className="mt-2 text-xs text-slate-500">P(FAIL) across latest batch</p>
        </div>

        <div className="rounded-xl border p-4 flex flex-col items-center">
          <GaugeCircular
            value={mixTempC}
            min={100}
            max={200}
            unit="°C"
            label="Mix Temp"
            size={140}
            ranges={[{ to: 0.6, color: "emerald" }, { to: 0.85, color: "amber" }, { to: 1, color: "rose" }]}
          >
            <ThermometerIcon />
          </GaugeCircular>
        </div>

        <div className="rounded-xl border p-4 flex flex-col items-center">
          <GaugeCircular
            value={pressMPa}
            min={20}
            max={60}
            unit="MPa"
            label="Press"
            size={140}
            ranges={[{ to: 0.5, color: "emerald" }, { to: 0.8, color: "amber" }, { to: 1, color: "rose" }]}
          >
            <PressureIcon />
          </GaugeCircular>
        </div>

        <div className="rounded-xl border p-4 flex flex-col items-center">
          <GaugeCircular
            value={cureSec}
            min={600}
            max={1800}
            unit="s"
            label="Cure Time"
            size={140}
            ranges={[{ to: 0.33, color: "amber" }, { to: 0.8, color: "emerald" }, { to: 1, color: "amber" }]}
          />
        </div>

        <div className="rounded-xl border p-4 flex flex-col items-center">
          <GaugeCircular
            value={moisture}
            min={0}
            max={2}
            unit="%"
            label="Moisture"
            size={140}
            ranges={[{ to: 0.5, color: "emerald" }, { to: 1.2, color: "amber" }, { to: 2, color: "rose" }]}
          >
            <TireIcon />
          </GaugeCircular>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;