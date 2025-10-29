import React from "react";
const BrakeDiscIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 text-slate-500 ${props.className ?? ""}`} {...props}>
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".1"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M21 12A9 9 0 0 0 7 3.7V8h4.3A3.7 3.7 0 0 1 15 11.7V16h4.3A9 9 0 0 0 21 12Z" fill="currentColor" opacity=".45"/>
  </svg>
);
export default BrakeDiscIcon;