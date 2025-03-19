import React, { useCallback, useEffect, useMemo } from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timeoutId = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [toasts.length]);

  useEffect(() => {
    const clearToasts = (event) => {
      if (event.key === "Escape") {
        setToasts([]);
      }
    };
    document.addEventListener("keydown", clearToasts);
    return () => document.removeEventListener("keydown", clearToasts);
  }, []);

  const addToast = useCallback((message, variant) => {
    const id = crypto.randomUUID();
    setToasts((prevToasts) => [...prevToasts, { id, message, variant }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={useMemo(
        () => ({ toasts, addToast, removeToast }),
        [addToast, removeToast, toasts]
      )}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
