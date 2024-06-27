export interface QuizModel {
  quizId: number;
  name_en: string;
  name_ka: string;
  imageUrl: string;
  userid: number;
  questions: QuestionModel[];
}

export interface QuestionModel {
  questionId: number;
  question_en: string;
  question_ka: string;
  imageurl: string;
  videourl: string;
  quizId: number;
  answers: AnswersModel[];
}

export interface AnswersModel {
  answerId: number;
  answer_en: string;
  answer_ka: string;
  isCorrect: boolean;
  questionId: number;
}
