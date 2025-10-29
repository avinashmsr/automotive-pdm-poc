import React, { useMemo } from "react";

type Props = {
  value: number | string;
  digits?: number;   // min width with leading zeros
  speedMs?: number;  // animation duration
};

const Odometer: React.FC<Props> = ({ value, digits = 6, speedMs = 350 }) => {
  const str = useMemo(() => {
    const clean = String(value ?? "").replace(/[^\d]/g, "");
    return clean.padStart(digits, "0");
  }, [value, digits]);

  return (
    <div className="inline-flex overflow-hidden rounded-md bg-slate-900 text-white px-3 py-1.5 shadow-inner">
      {Array.from(str).map((ch, idx) => (
        <span key={idx} className="relative w-[0.9ch] h-6 overflow-hidden mx-[1px] text-center">
          <span
            className="absolute inset-0 will-change-transform"
            style={{
              transform: `translateY(-${Number(ch) * 100}%)`,
              transition: `transform ${speedMs}ms ease`,
            }}
          >
            {Array.from({ length: 10 }).map((_, d) => (
              <span key={d} className="block leading-6">
                {d}
              </span>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Odometer;