"use client";

import React, { useEffect, useState } from "react";
import { Locale } from "@/i18n.config";
import QuizApi from "@/app/api/MainApi/Quiz";
import { QuestionModel, QuizModel } from "@/app/interface/MainInterfaces";
import toast, { Toaster } from "react-hot-toast";
import QuestionCreatorWindow from "@/app/components/profile/QuizManager/CreateQuestion";
import { QuizHub } from "@/app/components/QuizHubLogo";
import { useRouter, usePathname } from "next/navigation";
import QuestionDisplay from "@/app/components/profile/QuizManager/DisplayQuestion";
import { Select, SelectItem, Avatar, Button, Navbar } from "@nextui-org/react";
import { Reveal } from "@/app/components/RevealFramer";

interface QuizApiResponse {
  success: boolean;
  data?: QuizModel;
  error?: string;
}

export default function QuizManagerPage({
  params: { lang, quizid },
}: {
  params: { lang: Locale; quizid: number };
}) {
  const api = QuizApi();

  const [quiz, setQuiz] = useState<QuizModel>();

  const [lngstartCon, setLngstartCon] = useState<JSX.Element>();

  useEffect(() => {
    switch (lang) {
      case "ka":
        setLngstartCon(
          <Avatar
            alt="Georgia"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/GE/flat/64.png"
          />
        );
        break;
      case "en":
        setLngstartCon(
          <Avatar
            alt="English"
            className="w-5 h-5 bg-transparent"
            src="https://flagsapi.com/US/flat/64.png"
          />
        );
        break;
    }
  }, [lang]);

  const pathName = usePathname();
  const router = useRouter();

  const handleLanguageChange = (selectedLanguage: string) => {
    if (!pathName) return "/";

    // Check if the path already contains the selected language
    if (pathName.startsWith("/" + selectedLanguage + "/")) return pathName;

    // Find the index of the second occurrence of "/"
    const secondSlashIndex = pathName.indexOf("/", 1);

    if (secondSlashIndex !== -1) {
      // Replace the language segment with the selected language
      const newPath =
        "/" + selectedLanguage + pathName.substring(secondSlashIndex);
      router.push(newPath);
      return newPath;
    }

    // If there's no second occurrence of "/", just append the selected language
    const newPath = "/" + selectedLanguage;
    router.push(newPath);
    return newPath;
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = (await api.handleGetQuiz(quizid)) as QuizApiResponse;

        if (response.success && response.data) {
          const newQuiz: QuizModel = {
            quizId: response.data.quizId,
            name_en: response.data.name_en,
            name_ka: response.data.name_ka,
            imageUrl: response.data.imageUrl,
            userid: response.data.userid,
            questions: response.data.questions,
          };
          setQuiz(newQuiz);
        } else {
          router.push("/");
        }
      } catch (error) {
        toast.error("An unexpected error occurred while fetching the quiz.");
      }
    };

    fetchQuiz();
  }, [quizid]);
  const [addQuestion, setAddQuestion] = useState(false);

  const handleCreateQuestion = async (newQuestion: QuestionModel) => {
    console.log(newQuestion);
    try {
      setAddQuestion(false);
      if (newQuestion) {
        setQuiz((prevQuiz) => {
          if (prevQuiz) {
            return {
              ...prevQuiz,
              questions: [...prevQuiz.questions, newQuestion],
            };
          }
          return prevQuiz;
        });
        toast.success("Question created successfully");
      } else {
        toast.error(`Failed to create question: `);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while creating the question.");
    }
  };

  const DeltedQuestion = (questionId: number) => {
    setQuiz((prevQuiz) => {
      if (prevQuiz) {
        return {
          ...prevQuiz,
          questions: prevQuiz.questions.filter(
            (question) => question.questionId !== questionId
          ),
        };
      }
      return prevQuiz;
    });
  };
  return (
    <>
      <div className="flex bg-transparent  flex-col items-center  justify-center h-full mt-5 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 dark:text-white text-black">
            <Navbar className="rounded-lg flex items-center gap-2  justify-center bg-transparent w-full">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => router.push(`/`)}
              >
                <QuizHub />
                <h1 className="text-2xl font-bold dark:text-white text-black">
                  QuizHub
                </h1>
              </div>
              <div
                className=" gap-2 cursor-pointer hidden sm:flex"
                onClick={() => router.push(`/${lang}/user/profile`)}
              >
                <img src={quiz?.imageUrl} className="w-10 h-10 rounded-lg" />
                <h1 className="text-2xl font-bold dark:text-white text-black">
                  {lang == "en" ? quiz?.name_en : quiz?.name_ka}
                </h1>
              </div>

              <Select
                className={`w-[150px] mb-1  dark:text-white text-black`}
                size="sm"
                onChange={(event: { target: { value: string } }) =>
                  handleLanguageChange(event.target.value)
                }
                aria-label="Select Language"
                labelPlacement="outside"
                defaultSelectedKeys={[lang || `ka`]}
                startContent={lngstartCon}
              >
                <SelectItem
                  key="ka"
                  value={"georgia"}
                  startContent={
                    <Avatar
                      alt="Georgia"
                      className="w-5 h-5 bg-transparent"
                      src="https://flagsapi.com/GE/flat/64.png"
                    />
                  }
                  className="dark:text-white"
                >
                  {lang === "ka" ? "ქართული" : "Georgian"}
                </SelectItem>
                <SelectItem
                  key="en"
                  value={"english"}
                  onClick={() => handleLanguageChange("en")}
                  startContent={
                    <Avatar
                      alt="English"
                      className="w-5 h-5 bg-transparent"
                      src="https://flagsapi.com/US/flat/64.png"
                    />
                  }
                  className="dark:text-white"
                >
                  {lang === "en" ? "English" : "ინგლისური"}
                </SelectItem>
              </Select>
            </Navbar>

            {quiz ? (
              <>
                <div className="flex justify-center sm:flex-row flex-col p-6 w-full gap-20">
                  {quiz.questions && quiz.questions.length > 0 ? (
                    <>
                      <ol className="list-decimal">
                        {quiz.questions.map((question, index) => (
                          <li key={index} className="py-2">
                            <Reveal
                              direction="left"
                              duration={index + 1}
                              once={true}
                            >
                              <QuestionDisplay
                                question={question}
                                lang={lang}
                                onDelete={DeltedQuestion}
                              />
                            </Reveal>
                          </li>
                        ))}
                      </ol>
                    </>
                  ) : (
                    <></>
                  )}
                  {addQuestion ? (
                    <>
                      <QuestionCreatorWindow
                        lang={lang}
                        quizid={quizid}
                        onCreate={handleCreateQuestion}
                      />
                    </>
                  ) : (
                    <Button
                      onClick={() => setAddQuestion(true)}
                      color="warning"
                      variant="shadow"
                      className="text-whtie font-bold"
                    >
                      {lang === "en"
                        ? "Add New Question"
                        : "დაამატე ახალი კითხვა"}
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
}
