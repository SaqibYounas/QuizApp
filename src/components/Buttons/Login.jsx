import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect({
      redirect_uri: window.location.origin,
    });
  };
  return (
    <>
      <Button
        onClick={handleLogin}
        className="button login"
        style={{ marginTop: "20px" }}
      >
        Log In
      </Button>
    </>
  );
}

export default LoginButton;
