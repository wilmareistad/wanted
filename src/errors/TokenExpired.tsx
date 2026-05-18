import styles from "./error.module.css";

const TIVOLI_URL = import.meta.env.VITE_TIVOLI_URL;

export default function TokenExpired() {
  return (
    <div className={styles.errorWrapper }>
      <h1>Session expired</h1>
      <p>Your token has already been used or has expired (they last 5 minutes).</p>
      <a href={TIVOLI_URL}>← Back to Tivoli</a>
    </div>
  );
}