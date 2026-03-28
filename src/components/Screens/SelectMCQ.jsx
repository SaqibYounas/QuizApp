import React, { useState, useEffect } from "react";
import { Card, Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/SelectMCQ.css";
export default function SelectMCQ() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz", { state: { totalQuestions: count } });
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-3">Select Number of MCQs</h3>

        <Form.Select
          className="custom-select-height"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        >
          <option value="5">5 Questions</option>
          <option value="10">10 Questions</option>
          <option value="15">15 Questions</option>
          <option value="20">20 Questions</option>
        </Form.Select>

        <Button className="mt-4 w-100" onClick={handleStart}>
          Continue
        </Button>
      </Card>
    </Container>
  );
}
