import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { useToast } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const { toasts } = useToast();
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast {...toast} />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
