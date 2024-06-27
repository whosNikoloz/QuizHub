"use client";

import React, { useEffect, useState } from "react";
import { Locale } from "@/i18n.config";
import QuizApi from "@/app/api/MainApi/Quiz";
import { QuizModel } from "@/app/interface/MainInterfaces";
import toast, { Toaster } from "react-hot-toast";
import QuestionCreatorWindow from "@/app/components/profile/QuizManager/CreateQuestion";
import { QuizHub } from "@/app/components/QuizHubLogo";
import { useRouter } from "next/navigation";

interface QuizApiResponse {
  success: boolean;
  data?: QuizModel; // Assuming QuizModel is already defined
  error?: string;
}

export default function QuizManagerPage({
  params: { lang, quizid },
}: {
  params: { lang: Locale; quizid: number };
}) {
  const api = QuizApi();
  const router = useRouter();

  const [quiz, setQuiz] = useState<QuizModel>();

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
          console.log(response.data);
          setQuiz(newQuiz);
        } else {
          toast.error(`Failed to fetch quiz: ${response.error}`);
        }
      } catch (error) {
        toast.error("An unexpected error occurred while fetching the quiz.");
      }
    };

    fetchQuiz();
  }, [quizid]);

  return (
    <>
      <div className="flex bg-transparent  flex-col items-center  justify-center h-full mt-5 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 w-full justify-center">
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => router.push(`/`)}
              >
                <QuizHub />
                <h1 className="text-2xl font-bold">QuizHub</h1>
              </div>
            </div>
            {quiz ? (
              <QuestionCreatorWindow
                lang={lang}
                onCrete={(updatedInfo) => {
                  setQuiz(updatedInfo.updateQuiz);
                }}
              />
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
