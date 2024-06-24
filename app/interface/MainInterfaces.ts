export interface QuizModel {
  quizId: number;
  name_en: string;
  name_ka: string;
  imageUrl: string;
  userid: number;
  questions: QuestionModel[];
}

export interface QuestionModel {
  questionid: number;
  question_en: string;
  question_ka: string;
  imageurl: string;
  videourl: string;
  quizid: number;
  answers: string[];
}

export interface AnswersModel {
  answerid: number;
  answer_en: string;
  answer_ka: string;
  iscorrect: boolean;
  questionid: number;
}
