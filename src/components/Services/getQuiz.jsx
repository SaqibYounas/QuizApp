export async function QuizData(count) {
  try {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(`${BASE_URL}/questions?count=${count}`);
    const data = await response.json();
    console.log(data)

    return data.questions?.length ? data.questions : data.message;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return "Client Error! Try Again";
  }
}
