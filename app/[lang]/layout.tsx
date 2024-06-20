import "@/styles/globals.css";
import { Providers } from "@/app/[lang]/providers";
import type { Metadata } from "next";
import { Locale, i18n } from "@/i18n.config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "QuizHub",
  description: "Online Learning Platform",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html
      lang={params.lang}
      className={`$scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/QuizHubLogo.png" sizes="any" />
      </head>
      <body /*className={clsx(fontSans.variable)}*/>
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "system",
            children: children,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
