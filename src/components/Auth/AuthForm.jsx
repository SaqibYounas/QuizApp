import React, { useState } from "react";
import AuthForm from "./Login";
import { LogIn, Key, Mail } from "lucide-react";

const LoginForm = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onAuthSuccess && onAuthSuccess({ email });
    }, 1000);
  };

  const fields = [
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "name@example.com",
      value: email,
      onChange: setEmail,
      icon: Mail,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      value: password,
      onChange: setPassword,
      icon: Key,
    },
  ];

  return (
    <AuthForm
      title="Log In"
      fields={fields}
      submitText="Sign In"
      linkText="Don't have an account?"
      linkTo="/signup"
      onSubmit={handleLogin}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default LoginForm;
