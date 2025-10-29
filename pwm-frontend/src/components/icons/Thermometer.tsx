import React from "react";
const ThermometerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 text-slate-500 ${props.className ?? ""}`} {...props}>
    <path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z" fill="currentColor" opacity=".2" />
    <path d="M12 2a3 3 0 0 0-3 3v7.76a5 5 0 1 0 6 0V5a3 3 0 0 0-3-3Zm0 19a3 3 0 0 1-3-3c0-1.12.62-2.15 1.62-2.68.23-.12.38-.36.38-.62V5a1 1 0 1 1 2 0v9.7c0 .26.15.5.38.62A3 3 0 0 1 15 18a3 3 0 0 1-3 3Z" fill="currentColor"/>
  </svg>
);
export default ThermometerIcon;