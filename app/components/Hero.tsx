import React from "react";
import { Button } from "@nextui-org/react";
import { useUser } from "@/app/dbcontext/UserDbContext";

const HeroData = {
  en: {
    title: "Start",
    subtitle: "engaging your students",
    subtitle2: "with interactive quizzes",
    description:
      "Transform your classroom with our dynamic quiz platform. Create or join quiz rooms to make learning fun and effective.",
    button1: "Join Room",
    button2: "Create Room",
  },
  Ka: {
    title: "დაიწყე",
    subtitle: "თქვენი სტუდენტების ჩართვა",
    subtitle2: "ინტერაქტიული ქვიზებით",
    description:
      "გადაარჩიე შეკითხვები და შექმეე შეკითხვების კორპუსი, რომ შექმნილი იყოს სწრაფი და ეფექტური.",
    button1: "შეერთდი ქვიზს",
    button2: "შექმეე ქვიზი",
  },
};

export const Hero = ({
  lang,
  onOpenSignupModal,
}: {
  lang: string;
  onOpenSignupModal: () => void;
}) => {
  const { title, subtitle, subtitle2, description, button1, button2 } =
    HeroData[lang == "en" ? "en" : "Ka"];

  const { user } = useUser();

  const handleJoinRoom = () => {};
  const handleCreateRoom = () => {
    if (!user) {
      onOpenSignupModal();
      return;
    }
    if (user) {
      return;
    }
  };

  return (
    <section className="pt-24  ">
      <div className="px-12 mx-auto w-full">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 dark:text-white text-slate-800 text-4xl font-extrabold leading-none tracking-normal  md:text-6xl md:tracking-tight">
            <span>{title}</span>{" "}
            <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-yellow-400 to-slate-500 lg:inline">
              {subtitle}
            </span>{" "}
            <span>{subtitle2}</span>
          </h1>
          <p className="px-0 mb-8 text-lg dark:text-slate-500 text-slate-600 md:text-xl lg:px-24">
            {description}
          </p>
          <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <Button
              color="warning"
              href="#_"
              size="lg"
              variant="shadow"
              className="w-full text-white p-5 text-lg px-6 py-3 font-bold mb-2 rounded-2xl sm:w-auto sm:mb-0"
            >
              {button1}
              <svg
                className="w-4 h-4 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Button>
            <Button
              color="default"
              href="#_"
              size="lg"
              variant="shadow"
              onClick={handleCreateRoom}
              className="w-full text-slate-600 bg-gray-100 p-5 font-bold text-lg px-6 py-3 mb-2 rounded-2xl sm:w-auto sm:mb-0"
            >
              {button2}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
        <div className="w-full mx-auto mt-20 text-center md:w-10/12">
          <div className="relative z-0 w-full mt-8">
            <div className="relative overflow-hidden shadow-2xl">
              <div className="flex items-center flex-none px-4 bg-yellow-400 rounded-b-none h-11 rounded-xl">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                </div>
              </div>
              <img src="https://cdn.devdojo.com/images/march2021/green-dashboard.jpg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
