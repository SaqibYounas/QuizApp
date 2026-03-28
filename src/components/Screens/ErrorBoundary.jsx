import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error Boundary Caught:", error, info);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
          <div className="text-center">
            <h1 className="display-4 text-danger mb-3">
              Something went wrong.
            </h1>
            <p className="text-muted mb-4">
              An unexpected error has occurred. Please try again.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                className="btn btn-primary px-4 py-2"
                onClick={this.handleRefresh}
              >
                Refresh Page
              </button>

              <button
                className="btn btn-outline-secondary px-4 py-2"
                onClick={this.handleGoBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
