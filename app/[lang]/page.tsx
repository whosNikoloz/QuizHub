import { Navbar } from "../components/navbar";
import { Locale } from "@/i18n.config";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar lng={lang} NotMain={false} />
    </main>
  );
}
