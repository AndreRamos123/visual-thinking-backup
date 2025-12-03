import React from "react";
const OFFSET = 8;
interface ProductXAxisLabelProps {
  x?: number;
  y?: number;
  value?: string;
  payload?: { value?: string };
}

export default function GraphLable({
  x,
  y,
  value,
  payload,
}: ProductXAxisLabelProps) {
  const labelValue = value ?? payload?.value ?? "";

  return (
    <>
      {/* Mobile: rotated */}
      <text
        x={x ? x + OFFSET : x}
        y={y ? y + OFFSET : y}
        className="block md:hidden fill-slate-700 text-[10px]"
        transform={`rotate(-15, ${x}, ${y})`}
        textAnchor="end"
        alignmentBaseline="middle"
      >
        {labelValue}
      </text>
      {/* Desktop: normal */}
      <text
        x={x}
        y={y ? y + OFFSET : OFFSET}
        className="mt-2 hidden md:block fill-slate-700 text-[12px]"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {labelValue}
      </text>
    </>
  );
}
