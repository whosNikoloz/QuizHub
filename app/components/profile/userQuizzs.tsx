"use client";

import { Reveal } from "../RevealFramer";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { QuizModel } from "@/app/interface/MainInterfaces";

export const UserQuizs = ({ lang }: { lang: string }) => {
  const [Quizs, setQuizs] = useState<QuizModel[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizModel | null>(null);

  const HandleQuizpress = (quiz: QuizModel) => {
    setSelectedQuiz(quiz);
    onOpen();
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="col-span-4 sm:col-span-9 ">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-black-100/50  justify-center items-center "
          shadow="sm"
        >
          <CardBody className="flex gap-2">
            <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                Quizzes
              </div>
              <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                Create +
              </button>
            </div>
            {Quizs.map((quiz, index) => (
              <Reveal direction="up" key={index}>
                <Card
                  isPressable
                  className="w-full bg-transparent hover:bg-white/10"
                >
                  <CardBody>
                    <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] px-3 py-[20px] transition-all duration-150">
                      <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                          <img
                            className="h-full w-full rounded-xl"
                            src="https://horizon-tailwind-react-corporate-7s21b54hb-horizon-ui.vercel.app/static/media/Nft1.0fea34cca5aed6cad72b.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            {lang === "en" ? quiz.Name_en : quiz.Name_ka}
                          </h5>
                          <p className="mt-1 text-sm font-normal text-gray-600">
                            Mark Benjamin
                          </p>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
