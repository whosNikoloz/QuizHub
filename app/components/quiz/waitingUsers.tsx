"use client";

import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { QuizHub } from "../QuizHubLogo";
import { Reveal } from "../RevealFramer";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import toast from "react-hot-toast";

interface WaitingUsersProps {
  roomid: string;
}

const WaitingUsers: React.FC<WaitingUsersProps> = ({ roomid }) => {
  const [users, setUsers] = useState<
    { id: string; userName: string; role: string }[]
  >([]);

  const [connection, setConnection] = useState<HubConnection | null>(null);

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {users.map((user) => (
        <Reveal direction="left" key={user.id} once={true}>
          <Card className="w-full bg-white/5 shadow-lg hover:bg-white/10">
            <CardBody>
              <div className="flex h-full w-full items-start justify-between   px-3  transition-all duration-150">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center">
                    <img
                      className="h-full w-full rounded-xl object-cover"
                      src={
                        user.role === "teacher"
                          ? "https://i.guim.co.uk/img/media/fbb1974c1ebbb6bf4c4beae0bb3d9cb93901953c/10_7_2380_1428/master/2380.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=223c0e9582e77253911be07c8cad564f"
                          : "https://i.guim.co.uk/img/media/c8c00617b792d1d53f2d2b318820d5758dc61551/231_0_2968_1782/master/2968.jpg?width=1200&quality=85&auto=format&fit=max&s=99459057199a54c97181e29b0947b5fb"
                      }
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-base font-bold text-navy-700 dark:text-white">
                      {user.userName}
                      {user.role === "teacher" ? "  Teacher" : "  Student"}
                    </h5>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Reveal>
      ))}
    </div>
  );
};

export default WaitingUsers;
