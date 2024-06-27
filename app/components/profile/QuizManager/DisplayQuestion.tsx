"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { QuestionModel, QuizModel } from "@/app/interface/MainInterfaces";
import { Locale } from "@/i18n.config";
import { RadioGroup, Radio } from "@nextui-org/react";
import { DeleteIcon } from "../../icons";
import QuizApi from "@/app/api/MainApi/Quiz";

interface GeneralEditProps {
  question: QuestionModel;
  lang: Locale;
  onDelete: (questionId: number) => void;
}

function QuestionDisplay({ question, lang, onDelete }: GeneralEditProps) {
  const api = QuizApi();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteQuestion = async () => {
    console.log("Deleting question");
    setIsLoading(true);
    try {
      console.log(question.questionId);
      const response = await api.handleDeleteQuestion(question.questionId);
      if (response.success) {
        onDelete(question.questionId);
        onClose();
        toast.success("Question deleted successfully.");
      } else {
        toast.error(`Failed to delete question: ${response.error}`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred while creating the question.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex  items-center justify-start  w-full">
        <div className="ml-6">
          <div className="flex gap-4">
            <h4 className="font-bold text-yellow-400 mb-4">
              {lang == "en" ? question.question_en : question.question_ka}
            </h4>
            <Button
              isIconOnly
              className="bg-transparent"
              onClick={() => onOpen()}
            >
              <DeleteIcon size={20} />
            </Button>
          </div>

          <RadioGroup
            color="warning"
            value={question.answers
              .find((answer) => answer.isCorrect)
              ?.answerId.toString()}
          >
            {question.answers.map((answer) => (
              <Radio key={answer.answerId} value={answer.answerId.toString()}>
                {lang == "en" ? answer.answer_en : answer.answer_ka}
              </Radio>
            ))}
          </RadioGroup>
        </div>
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
                      {lang == "en" ? "Delete Question" : "კითხვის წაშლა"}
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
                onClick={handleDeleteQuestion}
              >
                {lang == "en" ? "Delete" : "წაშლა"}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

export default QuestionDisplay;
