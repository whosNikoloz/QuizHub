export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col bg-gradient-to-t dark:from-black bg-white dark:bg-slate-800 h-screen">
      <main>{children}</main>
    </div>
  );
}
