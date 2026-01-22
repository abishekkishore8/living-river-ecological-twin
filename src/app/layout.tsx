import type { Metadata } from "next";
import "./globals.css";
import "ol/ol.css";

export const metadata: Metadata = {
  title: "Living River - Ecological Digital Twin Portal",
  description: "Advanced GIS & Biodiversity Intelligence Platform for Namami Gange",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
