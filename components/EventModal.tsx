"use client";

import { useEffect } from "react";
import type { DagEvent } from "@/types";
import { getEventColors } from "@/lib/eventColors";
import { TURKISH_MONTHS } from "@/lib/calendar";
import { codeToName } from "@/data/events";

interface EventModalProps {
  event: DagEvent;
  onClose: () => void;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${TURKISH_MONTHS[m - 1]} ${y}`;
}

function formatDateRange(event: DagEvent): string {
  if (!event.startDate) return "Tarih Belirsiz (TBD)";
  const start = formatDate(event.startDate);
  if (!event.endDate || event.startDate === event.endDate) return start;
  const end = formatDate(event.endDate);
  return `${start} – ${end}`;
}

export function EventModal({ event, onClose }: EventModalProps) {
  const colors = getEventColors(event.type);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="animate-sheetUp sm:animate-slideUp relative max-w-md w-full max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-xl shadow-2xl pb-[env(safe-area-inset-bottom)]"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color accent bar */}
        <div className="h-1 w-full" style={{ background: colors.dot }} />
        {/* Grab handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-2">
          <span
            className="w-10 h-1 rounded-full"
            style={{ background: "var(--border)" }}
          />
        </div>

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`${colors.className} text-[10px] font-medium px-2 py-0.5 rounded-full font-mono`}
                >
                  {colors.label}
                </span>
                {event.educationYear && (
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full font-mono"
                    style={{
                      color: "var(--accent)",
                      background: "var(--accent-dim)",
                      border: "1px solid var(--accent-glow)",
                    }}
                  >
                    {event.educationYear === "I" ? "1. Yıl" : "2. Yıl"}
                  </span>
                )}
                {event.isMandatory && (
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: "#e8a040",
                      background: "rgba(232,160,64,0.12)",
                      border: "1px solid rgba(232,160,64,0.25)",
                    }}
                  >
                    ★ Zorunlu
                  </span>
                )}
              </div>
              <h2
                className="font-display text-xl font-bold leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {event.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Kapat"
              className="shrink-0 w-10 h-10 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
              style={{
                background: "var(--bg-cell)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              ✕
            </button>
          </div>

          {/* Details */}
          <div
            className="rounded-lg overflow-hidden divide-y divide-[#f0ede6]"
            style={{
              background: "var(--bg-cell)",
              border: "1px solid var(--border-dim)",
              borderColor: "var(--border-dim)",
            }}
          >
            {/* Code */}
            {event.code && (
              <Row label="Kod">
                <span
                  className="font-mono text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  {event.code}
                </span>
              </Row>
            )}

            {/* Date */}
            <Row label="Tarih">
              <span
                className="text-sm"
                style={{
                  color: event.startDate
                    ? "var(--text-primary)"
                    : "var(--text-muted)",
                  fontStyle: event.startDate ? "normal" : "italic",
                }}
              >
                {formatDateRange(event)}
              </span>
            </Row>

            {/* Prerequisites */}
            {event.prerequisites.length > 0 && (
              <Row label="Ön Koşul">
                <div className="flex flex-col gap-1.5">
                  {event.prerequisites.map((prereq) => (
                    <div key={prereq} className="flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          color: "var(--accent)",
                          background: "var(--accent-dim)",
                          border: "1px solid var(--accent-glow)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {prereq}
                      </span>
                      {codeToName[prereq] && (
                        <span
                          className="text-xs leading-tight"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {codeToName[prereq]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </Row>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <span
        className="text-xs font-medium w-20 shrink-0 pt-0.5 font-display tracking-wide uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
