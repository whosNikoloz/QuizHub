import React, { useState, useEffect } from "react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import QuizApi from "@/app/api/MainApi/Quiz";
import toast from "react-hot-toast";
import { Card, CardBody } from "@nextui-org/react";
import { AnswersModel, QuestionModel } from "@/app/interface/MainInterfaces";
import { Locale } from "@/i18n.config";

interface GeneralEditProps {
  lang: Locale;
  quizid: number;
  onCreate: (newQuestion: QuestionModel) => void;
}

function QuestionCreatorWindow({ lang, onCreate, quizid }: GeneralEditProps) {
  const [isCreating, setIsCreating] = useState(false);
  const api = QuizApi();
  const [question, setQuestion] = useState<QuestionModel>({
    questionId: 0,
    question_en: "",
    question_ka: "",
    imageurl: "",
    videourl: "",
    quizId: quizid,
    answers: [],
  });
  const [answers, setAnswers] = useState<AnswersModel[]>([
    {
      answer_en: "",
      answer_ka: "",
      isCorrect: false,
      answerId: 0,
      questionId: 0,
    },
    {
      answer_en: "",
      answer_ka: "",
      isCorrect: false,
      answerId: 0,
      questionId: 0,
    },
  ]);

  useEffect(() => {
    const allFilled = answers.every(
      (answer) => answer.answer_en && answer.answer_ka
    );
    if (allFilled) {
      setAnswers([
        ...answers,
        {
          answer_en: "",
          answer_ka: "",
          isCorrect: false,
          answerId: 0,
          questionId: 0,
        },
      ]);
    }
  }, [answers]);

  const handleCreate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsCreating(true);
    const filteredAnswers = answers.filter(
      (answer) => answer.answer_en && answer.answer_ka
    );
    const updatedQuestion = { ...question, answers: filteredAnswers };

    try {
      const response = await api.handleCreateQuestion(updatedQuestion, quizid);
      if (response.success) {
        onCreate(response.data);
        toast.success("Question created successfully");
      } else {
        toast.error(`Failed to create question: ${response.error}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while creating the question.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleAnswerChange = (index: number, field: string, value: string) => {
    const updatedAnswers = answers.map((answer, i) =>
      i === index ? { ...answer, [field]: value } : answer
    );
    setAnswers(updatedAnswers);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }));
    setAnswers(updatedAnswers);
  };

  return (
    <>
      <Card className="dark:bg-slate-800 sm:w-5/12 mb-10">
        <CardBody>
          <div className="mx-auto w-full border-0 px-6 py-5 sm:rounded-3xl">
            <h1 className="mb-8 text-2xl font-bold">
              {lang === "en" ? "Add Question" : "დაამატე კითხვა"}
            </h1>
            <form id="form" noValidate onSubmit={handleCreate}>
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
                    lang === "en"
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
                    lang === "en"
                      ? "Enter Question_Ka"
                      : "შეიყვანეთ კითხვა ქართულად"
                  }
                  required
                />
              </div>

              <h1 className="mb-8 text-md text-slate-400 font-bold">
                {lang === "en" ? "Add Answers" : "დაამატე პასუხები"}
              </h1>

              {answers.map((answer, index) => (
                <div
                  className="flex flex-row justify-center items-center space-x-4 mb-4"
                  key={index}
                >
                  <div className="relative z-0 mb-5 w-full space-y-2">
                    <Input
                      type="text"
                      size="sm"
                      classNames={{
                        input: ["text-[16px] "],
                        inputWrapper: ["dark:bg-slate-700"],
                      }}
                      name="answer_en"
                      label={
                        lang === "en"
                          ? "Enter Answer_En"
                          : "შეიყვანეთ პასუხი ინგლისურად"
                      }
                      value={answer.answer_en}
                      onChange={(e) =>
                        handleAnswerChange(index, "answer_en", e.target.value)
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
                      name="answer_ka"
                      label={
                        lang === "en"
                          ? "Enter Answer_ka"
                          : "შეიყვანეთ პასუხი ქართულად"
                      }
                      value={answer.answer_ka}
                      onChange={(e) =>
                        handleAnswerChange(index, "answer_ka", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="w-sm mb-6">
                    <Checkbox
                      color="warning"
                      isSelected={answer.isCorrect}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                </div>
              ))}

              <Button
                color="warning"
                variant="shadow"
                isLoading={isCreating}
                type="submit"
                className="mt-3 w-full font-bold rounded-lg px-6 py-3 text-lg text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
              >
                {lang === "en" ? "Add" : "დამატება"}
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default QuestionCreatorWindow;
