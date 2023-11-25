import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex items-center space-x-2">
        <CircularProgress color="primary" size={40} />
        <span className="text-gray-600">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingPage;
