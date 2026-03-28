export async function AnswerCheck(questionId, userAnswer, token) {
  try {
    const BASE_URL = import.meta.env.VITE_API_URL;
    console.log(questionId, userAnswer);

    const response = await fetch(
      `${BASE_URL}/answer?questionId=${questionId}&userAnswer=${userAnswer}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error checking answer:", error);
    return { error: "Client Error! Try Again" };
  }
}
