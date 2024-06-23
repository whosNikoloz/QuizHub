"use client";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/navbar";
import { Locale } from "@/i18n.config";
import { useState } from "react";
import AuthModals from "../components/user/auth";
import { Toaster } from "react-hot-toast";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  function handleOpenSignupModal() {
    setIsSignupModalOpen(!isSignupModalOpen);
  }

  function handleCloseSignupModal() {
    setIsSignupModalOpen(!isSignupModalOpen);
  }
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-t dark:from-black bg-white dark:bg-slate-800 justify-between">
      <Navbar
        lng={lang}
        NotMain={true}
        onOpenSignupModal={handleOpenSignupModal}
      />
      <Hero lang={lang} onOpenSignupModal={handleOpenSignupModal} />
      <AuthModals
        isOpen={isSignupModalOpen}
        onClose={handleCloseSignupModal}
        lang={lang === "en" ? "en" : "ka"}
      />
      <Toaster position="bottom-left" reverseOrder={false} />
    </main>
  );
}
