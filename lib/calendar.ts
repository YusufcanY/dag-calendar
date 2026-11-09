import type { DagEvent, EducationYearFilter } from "@/types";

export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isoDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(1);
  d.setMonth(d.getMonth() + n);
  return d;
}

/** Returns a 2D array of weeks, each week is 7 Date objects (Mon–Sun). */
export function getCalendarWeeks(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Adjust to Monday-first week (0=Mon, 6=Sun)
  let startDow = firstDay.getDay(); // 0=Sun
  startDow = startDow === 0 ? 6 : startDow - 1; // convert to Mon=0

  const gridStart = new Date(firstDay);
  gridStart.setDate(gridStart.getDate() - startDow);

  const weeks: Date[][] = [];
  const cursor = new Date(gridStart);

  while (cursor <= lastDay || weeks.length === 0) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
    if (cursor > lastDay) break;
  }

  return weeks;
}

export function filterEvents(
  events: DagEvent[],
  filter: EducationYearFilter
): DagEvent[] {
  if (filter === "all") return events;
  if (filter === "I") return events.filter((e) => e.educationYear === "I");
  if (filter === "II") return events.filter((e) => e.educationYear === "II");
  // "other": bayram, etkinlik, kulüp faaliyeti (no education year)
  return events.filter((e) => e.educationYear === null);
}

/** Returns events that overlap a given date (inclusive). */
export function getEventsForDate(events: DagEvent[], date: Date): DagEvent[] {
  return events.filter((e) => {
    if (!e.startDate) return false;
    const start = parseDate(e.startDate);
    const end = e.endDate ? parseDate(e.endDate) : start;
    return date >= start && date <= end;
  });
}

/** Returns events that start on a given date. */
export function getEventsStartingOn(events: DagEvent[], date: Date): DagEvent[] {
  return events.filter((e) => {
    if (!e.startDate) return false;
    const start = parseDate(e.startDate);
    return isoDate(start) === isoDate(date);
  });
}

/** Checks if an event spans multiple days. */
export function isMultiDay(event: DagEvent): boolean {
  if (!event.startDate || !event.endDate) return false;
  return event.startDate !== event.endDate;
}

/**
 * For a given week row, return events visible in that week with their
 * column start/end (0-indexed, 0=Mon, 6=Sun).
 */
export interface WeekEventLayout {
  event: DagEvent;
  colStart: number; // 0–6
  colEnd: number;   // 0–6
  isStart: boolean; // event starts in this week
  isEnd: boolean;   // event ends in this week
}

export function getWeekEventLayouts(
  week: Date[],
  events: DagEvent[]
): WeekEventLayout[] {
  const weekStart = week[0];
  const weekEnd = week[6];
  const result: WeekEventLayout[] = [];

  for (const event of events) {
    if (!event.startDate) continue;
    const evStart = parseDate(event.startDate);
    const evEnd = event.endDate ? parseDate(event.endDate) : evStart;

    if (evStart > weekEnd || evEnd < weekStart) continue;

    const clampedStart = evStart < weekStart ? weekStart : evStart;
    const clampedEnd = evEnd > weekEnd ? weekEnd : evEnd;

    const colStart = week.findIndex(
      (d) => isoDate(d) === isoDate(clampedStart)
    );
    const colEnd = week.findIndex(
      (d) => isoDate(d) === isoDate(clampedEnd)
    );

    result.push({
      event,
      colStart: colStart === -1 ? 0 : colStart,
      colEnd: colEnd === -1 ? 6 : colEnd,
      isStart: isoDate(evStart) >= isoDate(weekStart),
      isEnd: isoDate(evEnd) <= isoDate(weekEnd),
    });
  }

  return result;
}

export const TURKISH_MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export const TURKISH_DAYS_SHORT = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export const TURKISH_DAYS_LONG = [
  "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar",
];

/** Weekday index with Monday = 0 … Sunday = 6. */
export function mondayIndex(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

export interface DateGroup {
  iso: string;
  date: Date;
  events: DagEvent[];
}

/** Groups scheduled events by start date, sorted ascending. */
export function groupEventsByStartDate(events: DagEvent[]): DateGroup[] {
  const map = new Map<string, DagEvent[]>();
  for (const e of events) {
    if (!e.startDate) continue;
    const list = map.get(e.startDate);
    if (list) list.push(e);
    else map.set(e.startDate, [e]);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([iso, evs]) => ({ iso, date: parseDate(iso), events: evs }));
}
