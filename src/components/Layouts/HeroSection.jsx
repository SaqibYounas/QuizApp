import React, { useEffect } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { signup } from "../services/auth/signup";
import LoginButton from "../Buttons/Login";
import Spinners from "./Spinner";
export default function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    const registerUser = async () => {
      if (user && isAuthenticated) {
        try {
          const payload = {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
          };
          const response = await signup(payload);
          console.log(response);
        } catch (error) {
          console.log("Signup error:", error);
        }
      }
    };
    registerUser();
  }, [user]);

  if (isLoading) {
    return <Spinners />;
  }

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="p-4 shadow" style={{ maxWidth: "500px", width: "100%" }}>
        {isAuthenticated && user ? (
          <>
            <h2 className="text-center fw-bold mb-3">Welcome to the Quiz!</h2>
            <p className="text-center text-secondary">
              Test your knowledge. Click below to begin!
            </p>

            <div className="text-center mt-4 d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Button
                variant="primary"
                size="lg"
                className="shadow"
                onClick={() => navigate("/select")}
              >
                Start Quiz
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="shadow"
                onClick={() => navigate("/result/past")}
              >
                View Result
              </Button>
            </div>
          </>
        ) : (
          <h2 className="text-center fw-bold mb-3">
            Please log in to start the Quiz!
            <br />
            <LoginButton />
          </h2>
        )}
      </Card>
    </Container>
  );
}
