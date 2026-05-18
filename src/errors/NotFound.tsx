import styles from "./error.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.errorWrapper}>
      <h1>404</h1>
      <h2>PAGE NOT FOUND</h2>
      <button onClick={() => navigate("/")}>Go back home</button>
    </div>
  );
}
