import React, { createContext, useContext, useState, useCallback } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback(
    (message, type = "info", duration = 5000) => {
      const id = Date.now();

      setNotifications((prev) => [...prev, { id, message, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    []
  );

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const success = useCallback(
    (message, duration) => {
      return addNotification(message, "success", duration);
    },
    [addNotification]
  );

  const error = useCallback(
    (message, duration) => {
      return addNotification(message, "error", duration);
    },
    [addNotification]
  );

  const info = useCallback(
    (message, duration) => {
      return addNotification(message, "info", duration);
    },
    [addNotification]
  );

  const warning = useCallback(
    (message, duration) => {
      return addNotification(message, "warning", duration);
    },
    [addNotification]
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        success,
        error,
        info,
        warning,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
