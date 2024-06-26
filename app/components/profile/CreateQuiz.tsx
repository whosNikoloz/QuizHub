import QuizApi from "@/app/api/MainApi/Quiz";
import { QuizModel } from "@/app/interface/MainInterfaces";
import { Locale } from "@/i18n.config";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const CreateQuiz = ({
  lang,
  onQuizCreated,
}: {
  lang: Locale;
  onQuizCreated: (response: QuizModel) => void;
}) => {
  const api = useMemo(() => QuizApi(), []);
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
  const handleCreateQuiz = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.handleCreateQuiz({
        name_en: englishName,
        name_ka: georgianName,
        imageurl: image,
      });

      if (response.success) {
        const newQuiz: QuizModel = {
          quizId: response.data.quizId,
          name_en: response.data.name_en,
          name_ka: response.data.name_ka,
          imageUrl: response.data.imageUrl,
          userid: response.data.userid,
          questions: response.data.questions,
        };
        onQuizCreated(newQuiz);
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
  }, [api, englishName, georgianName, image, onNewClose]);
  return (
    <>
      <Button
        onClick={onNewOpen}
        className="linear  bg-lightPrimary px-4 rounded-2xl py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
      >
        {lang === "en" ? "Create +" : "დამატება +"}
      </Button>
      <Modal
        isOpen={isNewOpen}
        onOpenChange={onNewOpenChange}
        radius="md"
        className="dark:bg-slate-800"
        placement="top-center"
        shouldBlockScroll={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 dark:text-white text-black">
                {lang === "en" ? "New Quiz" : "ახალი ქვიზი"}
              </ModalHeader>
              <form action={handleCreateQuiz}>
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
                          inputWrapper: ["dark:bg-slate-700"],
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
                          inputWrapper: ["dark:bg-slate-700"],
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
                          inputWrapper: ["dark:bg-slate-700"],
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
                    type="submit"
                    isLoading={isLoading}
                    onClick={handleCreateQuiz}
                    className="text-white"
                  >
                    {lang === "en" ? "Create" : "დამატება"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateQuiz;
