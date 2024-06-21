import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - QuizHub",
  description: "Page not found",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ka" className={`$scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/QuizHubLogo.png" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}
