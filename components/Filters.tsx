"use client";

import type { EducationYearFilter } from "@/types";
import { colorMap } from "@/lib/eventColors";

interface FiltersProps {
  active: EducationYearFilter;
  onChange: (filter: EducationYearFilter) => void;
}

const FILTER_OPTIONS: { value: EducationYearFilter; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "I", label: "1. Yıl" },
  { value: "II", label: "2. Yıl" },
  { value: "other", label: "Diğer" },
];

export function Filters({ active, onChange }: FiltersProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs font-display tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Filtre
      </span>
      <div
        className="flex items-center gap-1 p-1 rounded-lg"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className="px-3 py-1.5 rounded-md text-xs font-medium font-display tracking-wide transition-all cursor-pointer"
            style={
              active === value
                ? {
                    background: "var(--accent)",
                    color: "#ffffff",
                    fontWeight: 700,
                  }
                : {
                    color: "var(--text-muted)",
                  }
            }
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Legend() {
  return (
    <div className="flex items-center gap-4 flex-wrap py-3 px-1">
      {Object.entries(colorMap).map(([type, config]) => (
        <div key={type} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ background: config.dot }}
          />
          <span
            className="text-[11px] font-display tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            {config.label}
          </span>
        </div>
      ))}
    </div>
  );
}
