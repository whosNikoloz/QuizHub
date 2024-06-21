export interface QuizModel {
  QuizId: number;
  Name_en: string;
  Name_ka: string;
  UserId: number;
  questions: QuestionModel[];
}

export interface QuestionModel {
  QuestionId: number;
  Question_en: string;
  Question_ka: string;
  ImageUrl: string;
  VideoUrl: string;
  QuizId: number;
  Answers: string[];
}

export interface AnswersModel {
  AnswerId: number;
  Answer_en: string;
  Answer_ka: string;
  IsCorrect: boolean;
  QuestionId: number;
}
