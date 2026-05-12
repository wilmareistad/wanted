import styles from "./Game/Idle.module.css";

export default function Instructions() {
  return (
    <div className={styles.box}>
      <h3>INSTRUCTIONS</h3>
      <p>
        Runes family is visiting Yrgo but one is an imposter... Find the wanted Rune
        and catch them before time runs out!
      </p>
    </div>
  );
}
