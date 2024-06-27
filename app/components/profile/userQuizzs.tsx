/* eslint-disable @next/next/no-img-element */
"use client";

import { Reveal } from "../RevealFramer";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardBody, useDisclosure } from "@nextui-org/react";
import { QuizModel } from "@/app/interface/MainInterfaces";
import QuizApi from "@/app/api/MainApi/Quiz";
import { Locale } from "@/i18n.config";
import CreateQuiz from "./CreateQuiz";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleQuizPress = useCallback(
    (quiz: QuizModel | null) => {
      if (quiz) {
        router.push(`profile/${quiz.quizId}`);
      }
    },
    [router]
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
