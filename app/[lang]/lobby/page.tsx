"use client";
import { Locale } from "@/i18n.config";
import { useState } from "react";

import { Toaster } from "react-hot-toast";

export default function Lobby({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-t dark:from-black bg-white dark:bg-slate-800 justify-between">
      <Toaster position="bottom-left" reverseOrder={false} />
    </main>
  );
}
