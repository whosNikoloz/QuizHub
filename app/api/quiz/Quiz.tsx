const quiz_API = "https://localhost:45455/api/Quiz/";

const quiz_conveyAPI = "https://firstbrushedtower49.conveyor.cloud/api/Quiz/";

interface CreateQuiz {
  name_en: string;
  name_ka: string;
}

const QuizApi = () => {
  const hanldeCreateQuiz = async (quiz: CreateQuiz) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${quiz_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const handleEditQuiz = async (quizId: number, quiz: CreateQuiz) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${quiz_API}${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quiz),
      });
      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const handleDeleteQuiz = async (quizId: number) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${quiz_API}${quizId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        return true;
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  const handleGetQuiz = async (quizId: number) => {
    try {
      const response = await fetch(`${quiz_API}${quizId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const quiz = await response.json();
        return quiz;
      } else {
        const errorText = await response.text();
        console.error("Registration error:", errorText); // Log the error
        return errorText;
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error
      return error;
    }
  };

  return {
    hanldeCreateQuiz,
    handleEditQuiz,
    handleDeleteQuiz,
    handleGetQuiz,
  };
};

export default QuizApi;
