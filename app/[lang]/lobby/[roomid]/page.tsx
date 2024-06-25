"use client";

import toast, { Toaster } from "react-hot-toast";

import { Locale } from "@/i18n.config";
import WaitingUsers from "@/app/components/quiz/waitingUsers";
import Chat from "@/app/components/quiz/chat";
import { QuizHub } from "@/app/components/QuizHubLogo";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState } from "react";

export default function LobbyPage({
  params: { lang, roomid },
}: {
  params: { lang: Locale; roomid: string };
  lang: Locale;
}) {
  const [currentWindow, setCurrentWindow] = useState("waitingUsers");
  const handleWindowChange = (window: string) => {
    setCurrentWindow(window);
  };

  return (
    <>
      <div className="flex bg-transparent  flex-col items-center  justify-center h-full mt-5 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 w-full justify-between">
              <div className="flex gap-2">
                <QuizHub />
                <h1 className="text-2xl font-bold">QuizHub</h1>
              </div>
              <h1 className="text-lg font-bold">RoomCode : {roomid}</h1>
            </div>
            <ButtonGroup>
              <Button
                onClick={() => handleWindowChange("waitingUsers")}
                color="warning"
                className={
                  currentWindow == "Chat"
                    ? "text-white"
                    : "bg-white text-yellow-400 dark:bg-slate-800  "
                }
              >
                People
              </Button>
              <Button
                onClick={() => handleWindowChange("Chat")}
                color="warning"
                className={
                  currentWindow == "waitingUsers"
                    ? "text-white"
                    : "bg-white text-yellow-400 dark:bg-slate-800  "
                }
              >
                Chat
              </Button>{" "}
            </ButtonGroup>
            {currentWindow === "waitingUsers" ? (
              <WaitingUsers roomid={roomid} />
            ) : (
              <Chat lang={lang} />
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}
