import React from "react";
const PressureIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 text-slate-500 ${props.className ?? ""}`} {...props}>
    <path d="M12 3a9 9 0 1 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);
export default PressureIcon;