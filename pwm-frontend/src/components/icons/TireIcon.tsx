import React from "react";
const TireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 text-slate-500 ${props.className ?? ""}`} {...props}>
    <circle cx="12" cy="12" r="9" fill="currentColor" opacity=".1"/>
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
export default TireIcon;