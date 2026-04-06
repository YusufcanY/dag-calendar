export type EventType =
  | "Seminer"
  | "Uygulama"
  | "Eğitim Faaliyeti"
  | "Etkinlik"
  | "Bayram"
  | "Kulüp Faaliyeti"
  | "2. Yıl Eğitimi";

export type EducationYear = "I" | "II" | null;

export type EducationYearFilter = "all" | "I" | "II" | "other";

export interface DagEvent {
  id: string;
  name: string;
  code: string | null;
  type: EventType;
  educationYear: EducationYear;
  prerequisites: string[];
  startDate: string | null; // ISO "YYYY-MM-DD", null = TBD
  endDate: string | null;   // ISO "YYYY-MM-DD", null = same as startDate or TBD
  isMandatory: boolean;
}
