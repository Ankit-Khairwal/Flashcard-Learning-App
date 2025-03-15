import React from "react";

const LoadingSpinner = ({
  size = "medium",
  color = "primary",
  fullScreen = false,
}) => {
  // Size values in pixels
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 64,
  };

  // Color values
  const colorMap = {
    primary: "var(--primary-color)",
    secondary: "var(--secondary-color)",
    white: "white",
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;
  const spinnerColor = colorMap[color] || colorMap.primary;

  const spinnerStyle = {
    width: `${spinnerSize}px`,
    height: `${spinnerSize}px`,
    border: `${spinnerSize / 8}px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `${spinnerSize / 8}px solid ${spinnerColor}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const containerStyle = fullScreen
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }
    : {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      };

  return (
    <div style={containerStyle} className="loading-spinner-container">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle} className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
