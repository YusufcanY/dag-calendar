import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAG 2026 Eğitim Takvimi",
  description: "Doğa Aktiviteleri Grubu 2026 yılı eğitim ve faaliyet takvimi",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
