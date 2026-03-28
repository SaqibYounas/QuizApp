import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const navigate = useNavigate();
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  const handleHomeClick = () => navigate("/");

  const handleLogin = () => {
    loginWithRedirect({
      redirect_uri: window.location.origin,
    });
  };

  return (
    <Navbar bg="secondary" variant="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand
          onClick={handleHomeClick}
          className="fw-bold"
          style={{ cursor: "pointer" }}
        >
          Quiz App
        </Navbar.Brand>

        <Nav className="d-flex align-items-center">
          {!isLoading && !isAuthenticated && (
            <Button onClick={handleLogin} className="button login me-2">
              Log In
            </Button>
          )}

          {!isLoading && isAuthenticated && (
            <Button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="button logout"
            >
              Log Out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
