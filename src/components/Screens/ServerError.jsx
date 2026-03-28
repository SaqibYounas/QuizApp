import React from "react";
import { Link } from "react-router-dom";

export default function ServerError500() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center p-4">
        <h1 className="display-1 fw-bold text-danger">500</h1>

        <h2 className="fw-semibold mb-3">Internal Server Error</h2>

        <p
          className="text-muted mb-4"
          style={{ maxWidth: "440px", margin: "0 auto" }}
        >
          Something went wrong on our end. We’re working to fix it. Please try
          again later.
        </p>

        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button
            className="btn btn-outline-secondary px-4 py-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>

          <Link to="/" className="btn btn-primary px-4 py-2">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
