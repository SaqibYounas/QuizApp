import React, { useState } from "react";
import { Card, Form, Button, InputGroup, Container } from "react-bootstrap";
import { UserPlus, Loader, Key, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { singupUser } from "../services/auth/signup";

const SignupForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = await singupUser({
        name: form.username,
        email: form.email,
        password: form.password,
      });
      console.log(data);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center px-3"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Card
        className="shadow-lg border rounded-3 py-3 px-3 px-md-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Card.Body>
          <div className="text-center mb-3">
            <UserPlus className="mb-2 text-indigo-600" size={28} />
            <h2 className="h5 fw-bold">Sign Up</h2>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="signupUsername">
              <Form.Label className="small">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Your username"
                value={form.username}
                onChange={handleChange}
                required
                size="sm"
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="signupEmail">
              <Form.Label className="small">Email Address</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white border-end-0">
                  <Mail size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="border-start-0"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-2" controlId="signupPassword">
              <Form.Label className="small">Password</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white border-end-0">
                  <Key size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="border-start-0"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-2" controlId="signupConfirmPassword">
              <Form.Label className="small">Confirm Password</Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-white border-end-0">
                  <Key size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border-start-0"
                />
              </InputGroup>
            </Form.Group>

            {error && (
              <div className="alert alert-danger py-1 px-2 rounded small">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-1 px-2 rounded small">
                {success}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-100 d-flex align-items-center justify-content-center mb-2 py-1"
              size="sm"
              variant="primary"
            >
              {isSubmitting ? (
                <>
                  <Loader className="me-2" size={14} />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>

            <div className="text-center">
              <small className="text-muted">
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignupForm;
