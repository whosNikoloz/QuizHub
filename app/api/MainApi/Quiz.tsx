const quiz_API = "https://localhost:45455/api/Quiz/";

const quiz_conveyAPI = "https://earlyashleaf18.conveyor.cloud/api/Quiz/";

interface CreateQuiz {
  name_en: string;
  name_ka: string;
  imageurl: string;
}

const QuizApi = () => {
  const handleCreateQuiz = async (quiz: CreateQuiz) => {
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
        const createdQuiz = await response.json(); // Parse the JSON response
        return { success: true, data: createdQuiz };
      } else if (response.status === 400) {
        const errorDetails = await response.json(); // Parse the JSON response for validation errors
        console.error("Validation error:", errorDetails);
        return { success: false, error: errorDetails };
      } else if (response.status === 500) {
        const errorText = await response.text(); // Get error message as text
        console.error("Server error:", errorText);
        return { success: false, error: errorText };
      } else {
        const errorText = await response.text(); // Handle other status codes
        console.error("Unexpected error:", errorText);
        return { success: false, error: errorText };
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Request error:", error.message); // Log any network or other errors
        return { success: false, error: error.message };
      } else {
        console.error("Unexpected error type:", error); // Handle unexpected error types
        return { success: false, error: "An unexpected error occurred" };
      }
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

  const handleGetQuizzes = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${quiz_API}GetQuizzes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const quizzes = await response.json();
        console.log(quizzes);
        return quizzes;
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
    handleGetQuizzes,
    handleCreateQuiz,
    handleEditQuiz,
    handleDeleteQuiz,
    handleGetQuiz,
  };
};

export default QuizApi;
