const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const minute_Calculate = (totalQuestions) => {
  return Math.ceil((totalQuestions / 5) * 60)
};

function calculateResults(correctAnswers, totalQuestions, notAttempted = 0) {
  const wrongAnswers = totalQuestions - correctAnswers - notAttempted;
  const percentage =
    totalQuestions > 0
      ? ((correctAnswers / totalQuestions) * 100).toFixed(2)
      : 0;

  return { wrongAnswers, percentage };
}

const getFeedback = (percentage) => {
  if (percentage >= 90) return "Excellent!";
  if (percentage >= 70) return "Good!";
  if (percentage >= 50) return "Average, Keep Improving!";
  return "Needs Improvement!";
};

const sortResults = (results, sortColumn, sortOrder) => {
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


export { formatTime, minute_Calculate, calculateResults, getFeedback, sortResults }