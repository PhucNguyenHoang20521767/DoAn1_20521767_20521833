import React, { useState, useEffect } from "react";

import { CSSProperties } from "react";

const Chatbot = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const iframeStyle: CSSProperties = {
    position: "fixed",
    bottom: "130px",
    right: "20px",
    width: "350px",
    height: "500px",
    border: "none",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    zIndex: 8888,
    display: showIframe ? "block" : "none",
  };

  const chatbotButtonStyle: CSSProperties = {
    position: "fixed",
    bottom: "72px",
    right: "20px",
    zIndex: 8888,
    backgroundColor: "#273449",
    color: "#fff",
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  };

  const toggleIframe = () => {
    setShowIframe(!showIframe);
    setShowSuggestion(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuggestion(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/7qd6KjDFX-NZ6nzKkNdc9"
        style={iframeStyle}
      ></iframe>
      {showSuggestion && (
        <div
          style={{
            position: "fixed",
            bottom: "130px",
            right: "20px",
            zIndex: 8888,
            backgroundColor: "#273449",
            color: "#fff",
            borderRadius: "10px",
            padding: "10px",
            cursor: "pointer",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
          onClick={toggleIframe}
        >
          Bạn cần trợ giúp không?
        </div>
      )}
      <div style={chatbotButtonStyle} onClick={toggleIframe}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </div>
    </div>
  );
};

export default Chatbot;
