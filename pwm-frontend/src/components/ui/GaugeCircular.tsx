import React, { useMemo } from "react";

type ColorKey = "emerald" | "amber" | "rose" | "sky" | "indigo" | "violet" | "lime";
const strokeByColor: Record<ColorKey, string> = {
  emerald: "stroke-emerald-500",
  amber: "stroke-amber-500",
  rose: "stroke-rose-500",
  sky: "stroke-sky-500",
  indigo: "stroke-indigo-500",
  violet: "stroke-violet-500",
  lime: "stroke-lime-500",
};

export type GaugeRange = { to: number; color: ColorKey }; // 'to' is on 0..1 scale

type Props = {
  value: number;
  min?: number;
  max?: number;
  size?: number;   // px
  stroke?: number; // px
  label?: string;
  unit?: string;
  ranges?: GaugeRange[];
  decimal?: number;
  children?: React.ReactNode; // for an optional icon slot
};

const GaugeCircular: React.FC<Props> = ({
  value,
  min = 0,
  max = 100,
  size = 140,
  stroke = 12,
  label,
  unit,
  ranges,
  decimal = 0,
  children,
}) => {
  const { r, c, norm, dash, strokeClass, formatted } = useMemo(() => {
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const clamped = Math.min(max, Math.max(min, value));
    const norm = (clamped - min) / (max - min || 1);
    const dash = `${c * norm} ${c}`;
    const colorKey: ColorKey =
      ranges?.find((rg) => norm <= rg.to)?.color ?? "sky";
    const strokeClass = strokeByColor[colorKey];
    const formatted = value.toFixed(decimal);
    return { r, c, norm, dash, strokeClass, formatted };
  }, [value, min, max, size, stroke, ranges, decimal]);

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          <circle r={r} fill="none" className="stroke-slate-200" strokeWidth={stroke} />
          <circle
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={dash}
            className={strokeClass}
          />
        </g>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 text-slate-700">
          {children /* icon slot */}
          <span className="text-xl font-semibold tabular-nums">{formatted}</span>
          {unit ? <span className="text-xs text-slate-500">{unit}</span> : null}
        </div>
        {label ? <div className="text-xs text-slate-500 mt-1">{label}</div> : null}
      </div>
    </div>
  );
};

export default GaugeCircular;