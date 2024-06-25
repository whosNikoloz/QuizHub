"use client";

import { Locale } from "@/i18n.config";
import { HubConnection } from "@microsoft/signalr";
import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Textarea,
  Button,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Arrow, IconArrowRight, SentMessageIcon } from "../icons";

interface Message {
  id: number;
  content: string;
  user: string;
  role: string;
}

const ChatCard: React.FC<{
  lang: Locale;
  connection: HubConnection;
  roomid: string;
}> = ({ lang, connection, roomid }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Subscribe to ReceiveMessage event
    connection.on("ReceiveMessage", (data) => {
      const { userName, message, role } = data;
      console.log("Received message:", data);
      const newMessage: Message = {
        id: Date.now(),
        content: message,
        user: userName,
        role: role, // Assuming all received messages are from students
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      // Clean up event listener when component unmounts
      connection.off("ReceiveMessage");
    };
  }, [connection]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        content: inputValue,
        user: "Current User",
        role: "student",
      };
      setInputValue("");

      // Send message via SignalR
      connection
        .invoke("SendMessage", roomid, newMessage.content)
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Card className="flex flex-col w-full mx-auto bg-background rounded-2xl max-w-2xl min-h-[80vh] shadow-lg">
      <CardBody className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[70vh]">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="flex items-start gap-4 ">
              <div className="w-10 h-10">
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={
                    message.role === "teacher"
                      ? "https://i.guim.co.uk/img/media/fbb1974c1ebbb6bf4c4beae0bb3d9cb93901953c/10_7_2380_1428/master/2380.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=223c0e9582e77253911be07c8cad564f"
                      : "https://i.guim.co.uk/img/media/c8c00617b792d1d53f2d2b318820d5758dc61551/231_0_2968_1782/master/2968.jpg?width=1200&quality=85&auto=format&fit=max&s=99459057199a54c97181e29b0947b5fb"
                  }
                  alt=""
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse ">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {message.user}
                  </span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {formatTime(message.id)}
                  </span>
                </div>
                <div className="text-muted-foreground">{message.content}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            {lang === "en"
              ? "No messages yet. Start the conversation!"
              : "ჯერ არ არის შეტყობინებები. დაიწყე საუბარი!"}
          </div>
        )}
      </CardBody>
      <CardFooter className="px-6 py-4  rounded-b-2xl w-full">
        <form className="flex items-center justify-center w-full space-x-2">
          <Textarea
            id="comment"
            minRows={1}
            variant="bordered"
            size="sm"
            value={inputValue}
            onChange={handleInputChange}
            classNames={{
              input: ["text-[16px] "],
            }}
            placeholder={
              lang === "en" ? "Write a comment..." : "დაწერე კომენტარი..."
            }
            required
          />
          <Button
            variant="shadow"
            color="warning"
            type="submit"
            onClick={handleSendMessage}
            className="inline-flex  items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 h-10"
          >
            {lang === "en" ? "Send" : "გაგზავნა"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
