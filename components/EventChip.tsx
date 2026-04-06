"use client";

import type { DagEvent } from "@/types";
import { getEventColors } from "@/lib/eventColors";

interface EventChipProps {
  event: DagEvent;
  onClick: (event: DagEvent) => void;
  compact?: boolean;
  /** Whether this chip starts in this cell */
  isStart?: boolean;
  /** Whether this chip ends in this cell */
  isEnd?: boolean;
  /** For multi-day spanning bars */
  isBar?: boolean;
}

export function EventChip({
  event,
  onClick,
  compact = false,
  isStart = true,
  isEnd = true,
  isBar = false,
}: EventChipProps) {
  const colors = getEventColors(event.type);

  if (isBar) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick(event);
        }}
        title={event.name}
        className={`
          ${colors.className}
          w-full h-5 text-left px-1.5 text-[10px] font-medium leading-5
          overflow-hidden whitespace-nowrap
          border-l-2 ${colors.borderClass}
          transition-opacity hover:opacity-80 cursor-pointer
          ${isStart ? "rounded-l-sm" : "border-l-0"}
          ${isEnd ? "rounded-r-sm" : ""}
        `}
        style={{ minWidth: 0 }}
      >
        {isStart && (
          <span className="truncate">
            {event.isMandatory && <span className="mr-0.5">★</span>}
            {compact ? (event.code ?? event.name) : event.name}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      title={event.name}
      className={`
        ${colors.className}
        w-full text-left px-2 py-1 text-[11px] font-medium leading-tight
        rounded-sm border-l-2 ${colors.borderClass}
        transition-all hover:brightness-125 cursor-pointer
        overflow-hidden
      `}
    >
      <span className="flex items-center gap-0.5 min-w-0">
        {event.isMandatory && (
          <span style={{ color: "var(--accent)" }} className="shrink-0 text-[9px]">★</span>
        )}
        <span className="truncate">
          {compact && event.code ? event.code : event.name}
        </span>
      </span>
    </button>
  );
}
