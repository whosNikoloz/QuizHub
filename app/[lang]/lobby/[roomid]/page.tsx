"use client";

import toast, { Toaster } from "react-hot-toast";

import { Locale } from "@/i18n.config";
import WaitingUsers from "@/app/components/quiz/waitingUsers";
import Chat from "@/app/components/quiz/chat";
import { QuizHub } from "@/app/components/QuizHubLogo";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useRouter } from "next/navigation";

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

  const [users, setUsers] = useState<
    { id: string; userName: string; role: string }[]
  >([]);

  const [connection, setConnection] = useState<HubConnection>(null!);

  const userName = localStorage.getItem("userName") || generateRandomName();
  const userId = localStorage.getItem("userId") || generateUserId();

  function generateRandomName() {
    const adjectives = ["Happy", "Sad", "Funny", "Crazy", "Brave"];
    const nouns = ["Cat", "Dog", "Elephant", "Monkey", "Tiger"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomName = `${adjective} ${noun}`;
    localStorage.setItem("userName", randomName); // Save generated name
    return randomName;
  }

  function generateUserId() {
    const userId = `user-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("userId", userId);
    return userId;
  }

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:45455/quizHub")
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);

    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("SignalR Connected");

        await newConnection.send("JoinRoom", roomid, userName, userId);

        newConnection.on("UsersInRoom", (usersInRoom) => {
          console.log("Users in room:", usersInRoom);
          setUsers(
            usersInRoom.map(
              ({
                connectionId,
                userName,
                role,
              }: {
                connectionId: string;
                userName: string;
                role: string;
              }) => ({
                id: connectionId,
                userName: userName,
                role: role,
              })
            )
          );
        });

        newConnection.on("UserJoined", ({ connectionId, userName, role }) => {
          console.log(`User ${userName} (${connectionId}) joined`);
          setUsers((prevUsers) => {
            // Check if the user already exists to avoid duplicates
            const userExists = prevUsers.some(
              (user) => user.id === connectionId
            );
            if (userExists) {
              // Return the existing users without any changes
              return prevUsers;
            }

            // Add the new user to the state
            return [
              ...prevUsers,
              {
                id: connectionId,
                userName: userName, // Use the UserName provided by the backend
                role: role,
              },
            ];
          });
          toast.success(`${userName} joined the room`);
        });

        newConnection.on("UserLeft", ({ connectionId, userName }) => {
          console.log(`User ${userName} with ID ${connectionId} left`);
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== connectionId)
          );
          toast.success(`${userName} left the room`);
        });
      } catch (error) {
        console.error("SignalR Connection Error: ", error);
      }
    };

    if (roomid) {
      startConnection();
    }

    return () => {
      if (newConnection && roomid) {
        newConnection
          .invoke("LeaveRoom", roomid)
          .then(() => console.log(`Left room ${roomid}`))
          .catch((error) =>
            console.error(`Error leaving room ${roomid}:`, error)
          );
        newConnection.stop();
      }
    };
  }, [roomid]);

  useEffect(() => {
    const handleBeforeUnload = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="flex bg-transparent  flex-col items-center  justify-center h-full mt-5 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 w-full justify-between">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => router.push(`/`)}
              >
                <QuizHub />
                <h1 className="text-2xl font-bold">QuizHub</h1>
              </div>
              <h1 className="text-lg font-bold">
                {lang == "en" ? "RoomCode" : "ოთახის კოდი"} : {roomid}
              </h1>
            </div>
            <ButtonGroup>
              <Button
                onClick={() => handleWindowChange("waitingUsers")}
                color="warning"
                variant="shadow"
                className={
                  currentWindow == "Chat"
                    ? "text-white"
                    : "bg-white text-yellow-400 dark:bg-slate-800  "
                }
              >
                {lang == "en" ? "Waiting Users" : "ხალხი"}
              </Button>
              <Button
                onClick={() => handleWindowChange("Chat")}
                color="warning"
                variant="shadow"
                className={
                  currentWindow == "waitingUsers"
                    ? "text-white"
                    : "bg-white text-yellow-400 dark:bg-slate-800  "
                }
              >
                {lang == "en" ? "Chat" : "ჩათი"}
              </Button>{" "}
            </ButtonGroup>
            {currentWindow === "waitingUsers" ? (
              <WaitingUsers users={users} />
            ) : (
              <Chat lang={lang} connection={connection} roomid={roomid} />
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}
