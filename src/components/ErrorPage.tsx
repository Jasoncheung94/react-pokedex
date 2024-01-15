import React from "react";

interface ErrorPageProps {
  errorMessage: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Oops! Something went wrong.</h2>
      <p>{errorMessage}</p>
      <p>Please try again later or contact support.</p>
    </div>
  );
};

export default ErrorPage;
