export async function QuizResults(token) {
  try {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(`${BASE_URL}/result`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results;
    }

    return [];
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    return [];
  }
}
