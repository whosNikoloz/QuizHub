/* eslint-disable @next/next/no-img-element */
"use client";

import { Reveal } from "../RevealFramer";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { QuizModel } from "@/app/interface/MainInterfaces";
import QuizApi from "@/app/api/MainApi/Quiz";
import Image from "next/image";
import toast from "react-hot-toast";

export const UserQuizs = ({ lang }: { lang: string }) => {
  const [quizzes, setQuizzes] = useState<QuizModel[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizModel | null>(null);

  const HandleQuizpress = (quiz: QuizModel) => {
    setSelectedQuiz(quiz);
    console.log(quiz);
    onEditOpen();
  };

  const api = QuizApi();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await api.handleGetQuizzes();
        setQuizzes(response);
        console.log(quizzes);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const {
    isOpen: isNewOpen,
    onOpen: onNewOpen,
    onOpenChange: onNewOpenChange,
    onClose: onNewClose,
  } = useDisclosure();

  const [englishName, setEnglishName] = useState("");
  const [georgianName, setGeorgianName] = useState("");
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2utl2G7i2baBL5wah_c9s2zIuJcLbeXhuWQ&s"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await api.handleCreateQuiz({
        name_en: englishName,
        name_ka: georgianName,
        imageurl: image,
      });

      if (response.success) {
        setQuizzes([
          ...quizzes,
          {
            name_en: response.data.name_en,
            name_ka: response.data.name_ka,
            imageUrl: response.data.imageUrl,
            quizid: response.data.quizid,
            userid: response.data.userid,
            questions: response.data.questions,
          },
        ]);
        toast.success("Quiz created successfully");
        onNewClose();
      } else {
        toast.error(`Failed to create quiz: ${response.error}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while creating the quiz.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="col-span-4 sm:col-span-9 shadow-2xl">
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-black-100/50 max-h-[85vh]  justify-center items-center "
          shadow="sm"
        >
          <CardBody className="flex gap-2">
            <div className="flex items-center justify-between  p-3 w-full">
              <div className="text-lg font-bold text-navy-700 dark:text-white">
                {lang === "en" ? "Quizzes" : "ქვიზები"}
              </div>
              <Button
                onClick={onNewOpen}
                className="linear  bg-lightPrimary px-4 rounded-2xl py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
              >
                {lang === "en" ? "Create +" : "დამატება +"}
              </Button>
            </div>

            {quizzes.map((quiz, index) => (
              <Reveal direction="up" key={index}>
                <Card
                  isPressable
                  onClick={() => HandleQuizpress(quiz)}
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

      <Modal
        isOpen={isEditOpen}
        placement="top-center"
        onOpenChange={onEditOpenChange}
      >
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

      <Modal
        isOpen={isNewOpen}
        onOpenChange={onNewOpenChange}
        radius="md"
        placement="top-center"
        backdrop="blur"
        shouldBlockScroll={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 dark:text-white text-black">
                {lang === "en" ? "New Quiz" : "ახალი ქვიზი"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-3">
                    <Input
                      placeholder={
                        lang === "en"
                          ? "Enter English Name"
                          : "შეიყვანეთ ინგლისური სახელი"
                      }
                      classNames={{
                        input: ["text-[16px] "],
                      }}
                      value={englishName}
                      onChange={(e) => setEnglishName(e.target.value)}
                    />
                    <label
                      htmlFor="NameEnglish"
                      className="text-xs items-center justify-start flex w-1/2"
                    >
                      {lang === "en" ? "English Name" : "ინგლისური სახელი"}
                    </label>
                  </div>

                  <div className="flex flex-row gap-3">
                    <Input
                      placeholder={
                        lang === "en"
                          ? "Enter Georgian Name"
                          : "შეიყვანეთ ქართული სახელი"
                      }
                      classNames={{
                        input: ["text-[16px] "],
                      }}
                      value={georgianName}
                      onChange={(e) => setGeorgianName(e.target.value)}
                    />
                    <label
                      htmlFor="NameGeorgian"
                      className="text-xs items-center justify-start flex w-1/2"
                    >
                      {lang === "en" ? "Georgian Name" : "ქართული სახელი"}
                    </label>
                  </div>
                  <div className="flex gap-4 p-3">
                    <Input
                      label={lang === "en" ? "Image URL" : "სურათის URL"}
                      placeholder={
                        lang === "en"
                          ? "Enter Image URL"
                          : "შეიყვანეთ სურათის URL"
                      }
                      classNames={{
                        input: ["text-[16px] "],
                      }}
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    {image && (
                      <img
                        src={image}
                        alt="Product"
                        className="rounded-2xl w-20 h-20"
                      />
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onNewClose}>
                  {lang === "en" ? "Cancel" : "გაუქმება"}
                </Button>
                <Button
                  color="warning"
                  isLoading={isLoading}
                  onClick={handleCreateQuiz}
                  className="text-white"
                >
                  {lang === "en" ? "Create" : "დამატება"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
