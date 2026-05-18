import styles from "./error.module.css";

export default function TokenExpired() {
  return (
    <div className={styles.errorWrapper }>
      <h1>Session expired</h1>
      <h2>Your token has already been used or has expired (they last 5 minutes).</h2>
      <a href="/">← Back to Tivoli</a>
    </div>
  );
}