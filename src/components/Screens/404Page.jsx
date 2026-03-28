import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
      <div className="text-center px-4">
        <h1 className="display-1 fw-bold text-primary">404</h1>

        <h2 className="fw-semibold mb-3">Oops! Page Not Found</h2>

        <p
          className="text-muted mb-4"
          style={{ maxWidth: "420px", margin: "0 auto" }}
        >
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/" className="btn btn-primary px-4 py-2">
            Home
          </Link>

          <button
            className="btn btn-outline-secondary px-4 py-2"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
