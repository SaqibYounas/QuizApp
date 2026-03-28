import { calculateResults } from "./Helper";

export const sortResults = (results, sortColumn, sortOrder) => {
  if (!sortColumn) return results;

  const sorted = [...results].sort((a, b) => {
    let valA, valB;

    switch (sortColumn) {
      case "wrongAnswers":
        valA = calculateResults(
          a.correctAnswers,
          a.totalQuestions,
          a.notAttempted
        ).wrongAnswers;
        valB = calculateResults(
          b.correctAnswers,
          b.totalQuestions,
          b.notAttempted
        ).wrongAnswers;
        break;
      case "percentage":
        valA = calculateResults(
          a.correctAnswers,
          a.totalQuestions,
          a.notAttempted
        ).percentage;
        valB = calculateResults(
          b.correctAnswers,
          b.totalQuestions,
          b.notAttempted
        ).percentage;
        break;
      case "totalTime":
        valA = a.totalTime || 0;
        valB = b.totalTime || 0;
        break;
      case "timeTaken":
        valA = a.timeTaken || 0;
        valB = b.timeTaken || 0;
        break;
      case "createdAt":
        valA = new Date(a.createdAt).getTime();
        valB = new Date(b.createdAt).getTime();
        break;
      default:
        valA = a[sortColumn] ?? 0;
        valB = b[sortColumn] ?? 0;
    }

    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    return 0;
  });

  return sorted;
};
