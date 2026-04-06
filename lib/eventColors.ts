import type { EventType } from "@/types";

export interface EventColorConfig {
  className: string;
  borderClass: string;
  dot: string;
  label: string;
}

const colorMap: Record<EventType, EventColorConfig> = {
  Seminer: {
    className: "ev-seminer",
    borderClass: "ev-seminer-border",
    dot: "#2b74b8",
    label: "Seminer",
  },
  Uygulama: {
    className: "ev-uygulama",
    borderClass: "ev-uygulama-border",
    dot: "#1f8f5c",
    label: "Uygulama",
  },
  Bayram: {
    className: "ev-bayram",
    borderClass: "ev-bayram-border",
    dot: "#b83c3c",
    label: "Bayram / Tatil",
  },
  "Eğitim Faaliyeti": {
    className: "ev-egitim",
    borderClass: "ev-egitim-border",
    dot: "#7b4fc9",
    label: "Eğitim Faaliyeti",
  },
  Etkinlik: {
    className: "ev-etkinlik",
    borderClass: "ev-etkinlik-border",
    dot: "#c97a00",
    label: "Etkinlik",
  },
  "2. Yıl Eğitimi": {
    className: "ev-2yil",
    borderClass: "ev-2yil-border",
    dot: "#b8622a",
    label: "2. Yıl Eğitimi",
  },
  "Kulüp Faaliyeti": {
    className: "ev-kulup",
    borderClass: "ev-kulup-border",
    dot: "#1f8aaa",
    label: "Kulüp Faaliyeti",
  },
};

export function getEventColors(type: EventType): EventColorConfig {
  return colorMap[type] ?? colorMap["Etkinlik"];
}

export { colorMap };
