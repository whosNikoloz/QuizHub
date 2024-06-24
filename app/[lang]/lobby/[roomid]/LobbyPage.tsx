"use client";
import React, { useState, useEffect } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Card, Avatar } from "@nextui-org/react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function LobbyPage({
  params: { roomid },
}: {
  params: { roomid: string };
}) {
  const [users, setUsers] = useState<
    { id: string; avatar: string; name: string; userName: string }[]
  >([]);

  //
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:45455/quizHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR Connected");

        // Join the room
        await connection.send("JoinRoom", roomid, "Nika");

        // Handle initial users in the room
        connection.on("CurrentUsersInRoom", (users) => {
          setUsers(users);
        });

        // Handle user joined event, including yourself
        connection.on("UserJoined", (user) => {
          setUsers((prevUsers) => [...prevUsers, user]);
        });

        // Handle user left event
        connection.on("UserLeft", (userId) => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
        });
      } catch (error) {
        console.error("SignalR Connection Error: ", error);
      }
    };

    startConnection();

    return () => {
      connection.off("CurrentUsersInRoom");
      connection.off("UserJoined");
      connection.off("UserLeft");
      connection
        .stop()
        .then(() => console.log("SignalR Disconnected"))
        .catch((error) =>
          console.error("SignalR Disconnection Error: ", error)
        );
    };
  }, [roomid]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full mt-10 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 ">
              {/* Replace with your QuizHub or Logo component */}
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
                    <Image src={user.avatar} width={100} alt={user.name} />
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
