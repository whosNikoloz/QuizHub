const quiz_API = "https://localhost:45455/api/QuizFlow/";

const quiz_conveyAPI = "https://earlyashleaf18.conveyor.cloud/api/QuizFlow/";

const RoomApi = () => {
  const handleCreateRoom = async (quizid: number) => {
    try {
      const token = localStorage.getItem("jwt");
      // Adjust the URL to include the correct endpoint and query parameter for quizid
      const url = `${quiz_API}create-room?quizid=${quizid}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const roomData = await response.json(); // Parse the JSON response
        return { success: true, data: roomData.roomCode };
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

  const handleCheckRoomexists = async (roomCode: string) => {
    try {
      const url = `${quiz_API}checkroom/${roomCode}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const roomData = await response.json(); // Parse the JSON response
        return { success: true, data: roomData.roomCode };
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

  return {
    handleCreateRoom,
    handleCheckRoomexists,
  };
};

export default RoomApi;
