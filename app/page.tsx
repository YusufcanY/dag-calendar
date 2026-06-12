"use client";

import { useState, useMemo } from "react";
import type { DagEvent, EducationYearFilter } from "@/types";
import { events as allEvents } from "@/data/events";
import { filterEvents, addMonths } from "@/lib/calendar";
import { Calendar } from "@/components/Calendar";
import { Filters, Legend } from "@/components/Filters";
import { TbdEvents } from "@/components/TbdEvents";
import { EventModal } from "@/components/EventModal";
import { SearchInput } from "@/components/SearchInput";
import { TopographicBackground } from "@/components/TopographicBackground";

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState<EducationYearFilter>("all");
  const [selectedEvent, setSelectedEvent] = useState<DagEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const filteredEvents = useMemo(
    () => filterEvents(allEvents, filter),
    [filter]
  );

  const tbdEvents = useMemo(
    () => filteredEvents.filter((e) => !e.startDate),
    [filteredEvents]
  );

  const scheduledEvents = useMemo(
    () => filteredEvents.filter((e) => e.startDate !== null),
    [filteredEvents]
  );

  return (
    <div className="relative z-10 min-h-screen">
      <TopographicBackground />
      {/* Header */}
      <header
        className="sticky top-0 z-20 px-4 sm:px-6 py-3"
        style={{
          background: "rgba(245,243,239,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-display font-black text-base sm:text-lg shrink-0"
              style={{
                background: "var(--accent)",
                color: "#0c1410",
                letterSpacing: "0.05em",
              }}
            >
              DAG
            </div>
            <div className="hidden sm:block">
              <h1
                className="font-display font-black tracking-wide leading-none"
                style={{ color: "var(--text-primary)", fontSize: "18px" }}
              >
                2026 EĞİTİM TAKVİMİ
              </h1>
              <p
                className="font-mono text-[10px] tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                DOĞA AKTİVİTELERİ GRUBU
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-0 sm:flex-none sm:w-72 sm:ml-auto">
            <SearchInput events={allEvents} onSelect={setSelectedEvent} />
          </div>

          {/* Filters — desktop only */}
          <div className="hidden sm:block">
            <Filters active={filter} onChange={setFilter} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters — mobile only */}
        <div className="sm:hidden mb-4">
          <Filters active={filter} onChange={setFilter} />
        </div>
        <Legend />
        <Calendar
          year={year}
          month={month}
          events={scheduledEvents}
          onEventClick={setSelectedEvent}
          onPrevMonth={() => setCurrentDate((d) => addMonths(d, -1))}
          onNextMonth={() => setCurrentDate((d) => addMonths(d, 1))}
        />

        {/* TBD Events */}
        <TbdEvents events={tbdEvents} onEventClick={setSelectedEvent} />
      </main>

      {/* Event detail modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Footer */}
      <footer
        className="py-6 px-6 text-center"
        style={{
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
        }}
      >
        <span>Made in 2026 with ♥ by </span>
        <a
          href="https://www.linkedin.com/in/yusufcan-yilmaz"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}
        >
          Yusufcan Yılmaz
        </a>
      </footer>
    </div>
  );
}
