"use client";

import React, { useState, useEffect } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { Card, Avatar } from "@nextui-org/react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { QuizHub } from "@/app/components/QuizHubLogo";

export default function LobbyPage({
  params: { roomid },
}: {
  params: { roomid: string };
}) {
  const [users, setUsers] = useState<
    { id: string; avatar: string; name: string; userName: string }[]
  >([]);

  const [connection, setConnection] = useState<HubConnection | null>(null);

  const userName = localStorage.getItem("userName") || generateRandomName();

  function generateRandomName() {
    const adjectives = ["Happy", "Sad", "Funny", "Crazy", "Brave"];
    const nouns = ["Cat", "Dog", "Elephant", "Monkey", "Tiger"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomName = `${adjective} ${noun}`;
    localStorage.setItem("userName", randomName); // Save generated name
    return randomName;
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

        await newConnection.send("JoinRoom", roomid, userName);

        newConnection.on("UsersInRoom", (usersInRoom) => {
          console.log("Users in room:", usersInRoom);
          setUsers(
            usersInRoom.map(
              ({
                connectionId,
                userName,
              }: {
                connectionId: string;
                userName: string;
              }) => ({
                id: connectionId,
                avatar: "",
                name: "",
                userName: userName,
              })
            )
          );
        });

        newConnection.on("UserJoined", ({ connectionId, userName }) => {
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
                avatar: "", // Placeholder for avatar URL
                name: "", // Placeholder for the user's real name, if available
                userName: userName, // Use the UserName provided by the backend
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

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full mt-10 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              <QuizHub />
              <h1 className="text-2xl font-bold">QuizHub</h1>
              <h1 className="text-2xl font-bold">RoomId : {roomid}</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {users.map((user) => (
                <Card
                  key={user.id}
                  className="flex flex-col items-center gap-2 p-4"
                >
                  <Avatar>
                    <Image
                      src={user.avatar}
                      width={100}
                      height={100}
                      alt={user.name}
                    />
                  </Avatar>
                  <div className="text-sm font-medium">{user.userName}</div>
                  <div className="text-xs text-muted-foreground">Online</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}
