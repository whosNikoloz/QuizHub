/* eslint-disable @next/next/no-img-element */
"use client";

import { Reveal } from "../RevealFramer";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
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

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [selectedQuizId, setSelectedQuizId] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleQuizPress = (quiz: QuizModel) => {
    setSelectedQuizId(quiz.quizId);
    onOpen();
  };
  const handleDetailQuiz = () => {
    router.push(`/${lang}/user/profile/${selectedQuizId}`);
  };

  const handleDeleteQuiz = async () => {
    setIsLoading(true);
    try {
      const success = await api.handleDeleteQuiz(selectedQuizId);
      if (success) {
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz.quizId !== selectedQuizId)
        );
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

            {quizzes.length > 0 && (
              <>
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
              </>
            )}
          </CardBody>
        </Card>
      </div>

      <Modal
        isOpen={isOpen}
        className="dark:bg-slate-800"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onClose={onClose}
        placement="center"
      >
        <ModalContent>
          <>
            <ModalBody>
              <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-white"
                      id="modal-title"
                    >
                      {lang == "en" ? "Delete Quiz" : "ქვიზის წაშლა"}
                    </h3>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-end">
              <Button
                color="default"
                className="text-white"
                isLoading={isLoading}
                onClick={handleDeleteQuiz}
              >
                {lang == "en" ? "Delete" : "წაშლა"}
              </Button>
              <Button
                color="warning"
                className="text-white"
                onClick={handleDetailQuiz}
              >
                {lang == "en" ? "Detail" : "დეტალურად"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
