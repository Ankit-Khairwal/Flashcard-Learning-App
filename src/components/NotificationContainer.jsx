import React from "react";
import { useNotification } from "../context/NotificationContext";

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return "var(--success-color)";
      case "error":
        return "var(--danger-color)";
      case "warning":
        return "var(--warning-color)";
      case "info":
      default:
        return "var(--primary-color)";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        maxWidth: "350px",
        width: "100%",
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="slide-in"
          style={{
            backgroundColor: getBackgroundColor(notification.type),
            color: "white",
            padding: "1rem",
            borderRadius: "0.375rem",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              flexShrink: 0,
            }}
          >
            {getIcon(notification.type)}
          </div>
          <div style={{ flex: 1 }}>{notification.message}</div>
          <button
            onClick={() => removeNotification(notification.id)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "1.25rem",
              lineHeight: 1,
              padding: 0,
              opacity: 0.7,
            }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
