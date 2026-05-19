import styles from "./error.module.css";

export default function TransactionFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.errorWrapper }>
      <h1>Payment failed</h1>
      <h2>Something went wrong when processing your payment.</h2>
      <button onClick={onRetry}>Try again</button>
    </div>
  );
}