export async function saveResult(
  token,
  totalQuestions,
  correctAnswers,
  totalTime,
  timeTaken,
  notAttempted
) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  try {
    console.log(
      token,
      totalQuestions,
      correctAnswers,
      totalTime,
      timeTaken,
      notAttempted
    );
    const response = await fetch(`${BASE_URL}/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        totalQuestions,
        correctAnswers,
        totalTime,
        timeTaken,
        notAttempted,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return { message: "Client Error! Try Again" };
  }
}
