import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { calculateResults, getFeedback } from "../utils/Helper";
import { getChartOptions, getChartData } from "../utils/ResulthChartConfig";
import { useEffect, useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Result({
  score,
  totalQuestions,
  onGoHome,
  notAttempted,
}) {
  const navigate = useNavigate();
  const resulth = calculateResults(score, totalQuestions, notAttempted);
  const firstRender = useRef(true);
  const total = localStorage.getItem("totalQuestions");

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      localStorage.removeItem("totalQuestions");
      return;
    }
    if (!totalQuestions) {
      navigate("/select");
    }
  }, [navigate, total]);

  const handleHome = () => {
    localStorage.removeItem("totalQuestions");
    if (onGoHome) onGoHome();
    else navigate("/");
  };

  const options = getChartOptions(score, totalQuestions, resulth.percentage);
  const data = getChartData(score, resulth.wrongAnswers, notAttempted);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 text-center border-0">
            <h2 className="mb-3 text-primary">Quiz Result</h2>
            <h5 className="mb-4">{getFeedback(resulth.percentage)}</h5>

            <Row className="mb-3">
              <Col>
                <p>
                  <strong>Total Questions:</strong> {totalQuestions}
                </p>
                <p className="text-success">
                  <strong>Correct:</strong> {score}
                </p>
                <p style={{ color: "#ffc107" }}>
                  {" "}
                  <strong>NotAttemped:</strong> {notAttempted}
                </p>
                <p className="text-danger">
                  <strong>Wrong:</strong> {resulth.wrongAnswers}
                </p>
                <p>
                  <strong>Percentage:</strong> {resulth.percentage}%
                </p>
              </Col>
            </Row>

            <div style={{ width: "100%", height: "350px" }}>
              <Pie
                data={data}
                options={options}
                plugins={options.pluginsExtra}
              />
            </div>

            <div className="mt-4">
              <Button variant="primary" size="lg" onClick={handleHome}>
                Go to Home
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
