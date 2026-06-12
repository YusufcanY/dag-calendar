"use client";

import { useState } from "react";
import { codeToName } from "@/data/events";

interface PrereqTagProps {
  code: string;
}

export function PrereqTag({ code }: PrereqTagProps) {
  const [open, setOpen] = useState(false);
  const name = codeToName[code];

  return (
    <span
      title={name}
      onClick={() => name && setOpen((s) => !s)}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "2px",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        padding: "3px 6px",
        borderRadius: "4px",
        background: open ? "var(--bg-card)" : "var(--bg-cell)",
        border: `1px solid ${open ? "var(--border)" : "var(--border-dim)"}`,
        cursor: name ? "pointer" : "default",
        userSelect: "none",
        WebkitUserSelect: "none",
        transition: "background 0.15s, border-color 0.15s",
      }}
    >
      <span
        style={{ color: open && name ? "var(--accent)" : "var(--text-muted)" }}
      >
        {code}
      </span>
      {open && name && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {name}
        </span>
      )}
    </span>
  );
}
