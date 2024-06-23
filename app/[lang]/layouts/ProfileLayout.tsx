import { Navbar } from "@/app/components/navbar";
import { Locale } from "@/i18n.config";

export default function ProfileLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b dark:from-black bg-white dark:bg-slate-800">
      <Navbar
        lng={lang}
        NotMain={true}
        onOpenSignupModal={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      {children}
    </div>
  );
}
