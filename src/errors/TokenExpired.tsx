import styles from "./error.module.css";

export default function TokenExpired() {
  const tivoliUrl = import.meta.env.VITE_TIVOLI_URL ?? "/";

  return (
    <div className={styles.errorWrapper}>
      <h1>Session expired</h1>
      <h2>
        Your token has already been used or has expired (they last 5 minutes).
      </h2>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <a href="/">← Back to Tivoli</a>
        <button onClick={() => (window.location.href = tivoliUrl)}>
          Back to Tivoli (external)
        </button>
      </div>
    </div>
  );
}
