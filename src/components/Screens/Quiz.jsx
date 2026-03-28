import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Card,
  Container,
  ListGroup,
  Button,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Timer from "./Timer";
import { QuizData } from "../services/getQuiz";
import { saveResult } from "../services/saveResult";
import { minute_Calculate } from "../utils/Helper";
import Result from "./TotalScore";
import Spinner from "../layouts/Spinner";
import { useApiToken } from "../services/auth/Token";
import useAppNavigation from "../Hooks/UseNavigate";
import { AnswerCheck } from "../services/AnswerCheck";

export default function Quiz() {
  const location = useLocation();
  let { totalQuestions } = location.state || {};

  const [result, setResult] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedAnswers, setSavedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [finalScore, setFinalScore] = useState(0);
  const getToken = useApiToken();
  const { go500 } = useAppNavigation();
  const startTimeRef = useRef(null);
  const startQuiz = () => {
    startTimeRef.current = Date.now();
  };

  const totalTime = useMemo(
    () => minute_Calculate(totalQuestions),
    [totalQuestions]
  );

  const notAttempted =
    selectedQuestions.length - Object.keys(savedAnswers).length;

  useEffect(() => {
    async function loadQuestions() {
      setLoading(true);
      try {
        const fetchedQuestions = await QuizData(totalQuestions);
        setSelectedQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
      setLoading(false);
    }
    loadQuestions();
    startQuiz();
  }, [totalQuestions]);

  useEffect(() => {
    if (result) finishQuiz();
  }, [result]);

  const answerCheck = async (selectedOption) => {
    if (currentUserAnswer) return;

    try {
      const token = await getToken();
      const res = await AnswerCheck(currentQuestion._id, selectedOption, token);

      setSavedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          selected: selectedOption,
          correct: res.correctAnswer,
          isCorrect: res.isCorrect,
        },
      }));
    } catch (error) {
      go500();
    }
  };

  const handleNext = () => {
    if (currentIndex < selectedQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setResult(true);
    }
  };

  const finishQuiz = async () => {
    const endTime = Date.now();

    const timeTakenSeconds = Math.floor(
      (endTime - startTimeRef.current) / 1000
    );

    const timeTaken = timeTakenSeconds;
    const attempted = Object.keys(savedAnswers).length;
    const correct = Object.values(savedAnswers).filter(
      (x) => x.isCorrect
    ).length;

    const notAttempted = selectedQuestions.length - attempted;
    setFinalScore(correct);

    const token = await getToken();

    await saveResult(
      token,
      selectedQuestions.length,
      correct,
      totalTime,
      timeTaken,
      notAttempted
    );
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (result)
    return (
      <Result
        score={finalScore}
        totalQuestions={selectedQuestions.length}
        notAttempted={notAttempted}
      />
    );

  const currentQuestion = selectedQuestions[currentIndex];
  const currentUserAnswer = savedAnswers[currentQuestion.id] || null;

  const attemptedCount = Object.keys(savedAnswers).length;

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-3">
        <Col md={6} className="text-center">
          <Timer totalQuestions={totalQuestions} setResult={setResult} />
        </Col>
      </Row>

      <Row className="justify-content-center mb-2">
        <Col md={8} className="text-center">
          <strong>
            Question {currentIndex + 1} | Attempted {attemptedCount}/
            {selectedQuestions.length}
          </strong>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <ProgressBar
            now={(attemptedCount / selectedQuestions.length) * 100}
            variant="success"
            style={{ height: "20px" }}
            label={`${Math.round(
              (attemptedCount / selectedQuestions.length) * 100
            )}%`}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">
                <strong>Question {currentIndex + 1}:</strong>{" "}
                {currentQuestion.question}
              </Card.Title>

              <ListGroup variant="flush" className="mb-4">
                {Object.entries(currentQuestion.options).map(([key, value]) => {
                  const isCorrect = key === currentUserAnswer?.correct;
                  const isSelected = key === currentUserAnswer?.selected;

                  let bg = "";
                  if (currentUserAnswer) {
                    if (isCorrect) bg = "#28a745";
                    else if (isSelected) bg = "#dc3545";
                  }

                  return (
                    <ListGroup.Item
                      key={key}
                      action
                      style={{
                        backgroundColor: bg,
                        color: bg ? "white" : "black",
                        cursor: currentUserAnswer ? "not-allowed" : "pointer",
                      }}
                      onClick={() => answerCheck(key)}
                    >
                      <strong>{key}:</strong> {value}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>

              <div className="d-flex justify-content-between">
                <Button
                  disabled={currentIndex === 0}
                  onClick={handlePrevious}
                  variant="outline-danger"
                >
                  Previous
                </Button>

                <Button
                  disabled={!currentUserAnswer}
                  onClick={handleNext}
                  variant="primary"
                >
                  {currentIndex + 1 === selectedQuestions.length
                    ? "Finish"
                    : "Next"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
