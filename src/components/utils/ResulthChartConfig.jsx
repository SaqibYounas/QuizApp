import ChartDataLabels from "chartjs-plugin-datalabels";

export const getChartOptions = (score, totalQuestions, percentage) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom", labels: { font: { size: 14 } } },
    title: {
      display: true,
      text: `Score: ${score} / ${totalQuestions} (${percentage}%)`,
      font: { size: 20, weight: "bold" },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.label;
        },
      },
    },
    datalabels: {
      color: "#fff",
      font: { weight: "bold", size: 14 },
      formatter: (value, context) => {
        if (value === 0) return "";
        const total = context.chart.data.datasets[0].data.reduce(
          (a, b) => a + b,
          0
        );
        const percent = ((value / total) * 100).toFixed(1);
        return `${percent}%`;
      },
    },
  },
  pluginsExtra: [ChartDataLabels],
});

export const getChartData = (score, wrongAnswers, notAttempted) => ({
  labels: ["Correct", "Wrong", "Not Attempted"],
  datasets: [
    {
      data: [score, wrongAnswers, notAttempted],
      backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
      hoverOffset: 10,
    },
  ],
});
