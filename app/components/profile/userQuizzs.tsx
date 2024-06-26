/* eslint-disable @next/next/no-img-element */
"use client";

import { Reveal } from "../RevealFramer";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { QuizModel } from "@/app/interface/MainInterfaces";
import QuizApi from "@/app/api/MainApi/Quiz";
import { Locale } from "@/i18n.config";
import CreateQuiz from "./CreateQuiz";

export const UserQuizs = ({ lang }: { lang: Locale }) => {
  const [quizzes, setQuizzes] = useState<QuizModel[]>([]);

  const api = useMemo(() => QuizApi(), []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.handleGetQuizzes();
        setQuizzes(response);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [api]);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const handleQuizPress = useCallback(
    (quiz: React.SetStateAction<QuizModel | null>) => {
      onEditOpen();
    },
    [onEditOpen]
  );

  const handleQuizCreated = (response: QuizModel) => {
    if (!response) {
      return;
    }
    setQuizzes((prevQuizzes) => [...prevQuizzes, response]);
  };

  return (
    <>
      <div className="col-span-4 sm:col-span-9 ">
        <Card
          isBlurred
          className="border-none  bg-background/60 dark:bg-default-100/50 shadow-2xl max-h-[85vh]  justify-center items-center "
          shadow="sm"
        >
          <CardBody className="flex gap-2">
            <div className="flex items-center justify-between  p-3 w-full">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                {lang === "en" ? "Quizzes" : "ქვიზები"}
              </div>
              <CreateQuiz lang={lang} onQuizCreated={handleQuizCreated} />
            </div>

            {quizzes.map((quiz, index) => (
              <Reveal direction="up" key={index}>
                <Card
                  isPressable
                  onClick={() => handleQuizPress(quiz)}
                  className="w-full bg-transparent shadow-lg hover:bg-white/10"
                >
                  <CardBody>
                    <div className="flex h-full w-full items-start justify-between   px-3  transition-all duration-150">
                      <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                          <img
                            className="h-full w-full rounded-xl object-cover"
                            src={quiz.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            {lang === "en" ? quiz.name_en : quiz.name_ka}
                          </h5>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0" // Corrected from stroke-width to strokeWidth for JSX compatibility
                            viewBox="0 0 320 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path>
                          </svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                          <p> </p>
                          0.4<p className="ml-1">ETH</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                          <p>30s</p>
                          <p className="ml-1">ago</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Reveal>
            ))}
          </CardBody>
        </Card>
      </div>
    </>
  );
};
