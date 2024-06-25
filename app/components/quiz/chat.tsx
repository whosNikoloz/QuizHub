"use client";

import { Locale } from "@/i18n.config";
import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Textarea,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";

interface Message {
  id: number;
  content: string;
  user: string;
  avatar: string;
}

const ChatCard: React.FC<{ lang: Locale }> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hey everyone, excited to be here!",
      user: "John Doe",
      avatar:
        "https://i.guim.co.uk/img/media/c8c00617b792d1d53f2d2b318820d5758dc61551/231_0_2968_1782/master/2968.jpg?width=1200&quality=85&auto=format&fit=max&s=99459057199a54c97181e29b0947b5fb",
    },
    {
      id: 1,
      content: "Hey everyone, excited to be here!",
      user: "John Doe",
      avatar:
        "https://i.guim.co.uk/img/media/c8c00617b792d1d53f2d2b318820d5758dc61551/231_0_2968_1782/master/2968.jpg?width=1200&quality=85&auto=format&fit=max&s=99459057199a54c97181e29b0947b5fb",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        content: inputValue,
        user: "Current User",
        avatar:
          "https://i.guim.co.uk/img/media/c8c00617b792d1d53f2d2b318820d5758dc61551/231_0_2968_1782/master/2968.jpg?width=1200&quality=85&auto=format&fit=max&s=99459057199a54c97181e29b0947b5fb",
      };

      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  return (
    <Card className="flex flex-col w-full mx-auto bg-background rounded-2xl max-w-2xl min-h-[80vh] shadow-lg">
      <CardBody className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[70vh]">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="flex items-start gap-4 ">
              <Avatar className="w-10 h-10">
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={message.avatar}
                  alt=""
                />
              </Avatar>
              <div className="grid gap-1">
                <div className="font-medium">{message.user}</div>
                <div className="text-muted-foreground">{message.content}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No messages yet. Start the conversation!
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
            className="min-h-[50px] "
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
            className="inline-flex mb-2 items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50  h-10 "
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
