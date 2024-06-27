"use client";

import React, { useState } from "react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Authentication from "@/app/api/user/auth";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";
import {
  AnswersModel,
  QuestionModel,
  QuizModel,
} from "@/app/interface/MainInterfaces";
import { Locale } from "@/i18n.config";

interface GeneralEditProps {
  lang: Locale;
  onCrete: (updatedInfo: { updateQuiz: QuizModel }) => void;
}

function QuestionCreatorWindow({ lang, onCrete }: GeneralEditProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [question, setQuestion] = useState({} as QuestionModel);
  const [answers, setAnswers] = useState<AnswersModel[]>([]);

  const handleCreate = async () => {
    setIsCreating(true);
    // try {
    //   const response = await Authentication.handleCreateQuestion(question);
    //   if (response.success) {
    //     onCrete({ updateQuiz: response.data });
    //     toast.success("Question created successfully");
    //   } else {
    //     toast.error(`Failed to create question: ${response.error}`);
    //   }
    // } catch (error) {
    //   toast.error("An unexpected error occurred while creating the question.");
    // } finally {
    //   setIsCreating(false);
    // }
  };
  return (
    <>
      <Card className="dark:bg-slate-800">
        <CardBody>
          <div className="mx-auto max-w-md border-0 px-6 py-5 shadow-lg sm:rounded-3xl">
            <h1 className="mb-8 text-2xl font-bold">
              {lang == "en" ? "Add Question" : "დაამატე კითხვა"}
            </h1>
            <form id="form" noValidate>
              <div className="relative z-0 mb-5 w-full">
                <Input
                  size="sm"
                  type="text"
                  classNames={{
                    input: ["text-[16px] "],
                    inputWrapper: ["dark:bg-slate-700"],
                  }}
                  onChange={(e) => {
                    setQuestion({ ...question, question_en: e.target.value });
                  }}
                  name="question_en"
                  label={
                    lang == "en"
                      ? "Enter Question_En"
                      : "შეიყვანეთ კითხვა ინგლისურად"
                  }
                  required
                />
              </div>

              <div className="relative z-0 mb-5 w-full">
                <Input
                  size="sm"
                  type="text"
                  classNames={{
                    input: ["text-[16px] "],
                    inputWrapper: ["dark:bg-slate-700"],
                  }}
                  onChange={(e) => {
                    setQuestion({ ...question, question_ka: e.target.value });
                  }}
                  name="question_ka"
                  label={
                    lang == "en"
                      ? "Enter Question_Ka"
                      : "შეიყვანეთ კითხვა ქართულად"
                  }
                  required
                />
              </div>

              <h1 className="mb-8 text-md text-slate-400 font-bold">
                {lang == "en" ? "Add Answers" : "დაამატე პასუხები"}
              </h1>

              <div className="flex flex-row justify-center items-center space-x-4">
                <div className="mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </span>
                </div>
                <div className="relative z-0 mb-5 w-full space-y-2">
                  <Input
                    type="text"
                    size="sm"
                    classNames={{
                      input: ["text-[16px] "],
                      inputWrapper: ["dark:bg-slate-700"],
                    }}
                    name="answer"
                    label={
                      lang == "en"
                        ? "Enter Answer_En"
                        : "შეიყვანეთ პასუხი ინგლისურად"
                    }
                    onChange={(e) => {
                      answers.push({
                        answer_en: e.target.value,
                        iscorrect: false,
                        answerid: 0,
                        answer_ka: "",
                        questionid: 0,
                      });
                    }}
                    required
                  />
                  <Input
                    type="text"
                    size="sm"
                    classNames={{
                      input: ["text-[16px] "],
                      inputWrapper: ["dark:bg-slate-700"],
                    }}
                    name="answer"
                    label={
                      lang == "en"
                        ? "Enter Answer_ka"
                        : "შეიყვანეთ პასუხი ქართულად"
                    }
                    onChange={(e) => {
                      answers.push({
                        answer_en: e.target.value,
                        iscorrect: false,
                        answerid: 0,
                        answer_ka: "",
                        questionid: 0,
                      });
                    }}
                    required
                  />
                </div>
                <div className="w-sm mb-6">
                  <Checkbox defaultSelected color="warning"></Checkbox>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center space-x-4">
                <div className="mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </span>
                </div>
                <div className="relative z-0 mb-5 w-full space-y-2">
                  <Input
                    type="text"
                    size="sm"
                    classNames={{
                      input: ["text-[16px] "],
                      inputWrapper: ["dark:bg-slate-700"],
                    }}
                    name="answer"
                    label={
                      lang == "en"
                        ? "Enter Answer_En"
                        : "შეიყვანეთ პასუხი ინგლისურად"
                    }
                    required
                  />
                  <Input
                    type="text"
                    size="sm"
                    classNames={{
                      input: ["text-[16px] "],
                      inputWrapper: ["dark:bg-slate-700"],
                    }}
                    name="answer"
                    label={
                      lang == "en"
                        ? "Enter Answer_ka"
                        : "შეიყვანეთ პასუხი ქართულად"
                    }
                    required
                  />
                </div>
                <div className="w-sm mb-6">
                  <Checkbox color="warning"></Checkbox>
                </div>
              </div>

              <Button
                color="warning"
                variant="shadow"
                isLoading={isCreating}
                type="submit"
                className="mt-3 w-full rounded-lg  px-6 py-3 text-lg text-white shadow outline-none transition-all duration-150 ease-linear  hover:shadow-lg focus:outline-none"
              >
                {lang == "en" ? "Add" : "დამატება"}
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default QuestionCreatorWindow;
