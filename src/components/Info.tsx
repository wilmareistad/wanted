import styles from "./Info.module.css";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Info({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Game Info</h3>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className={styles.scrollContent}>

          <div className={styles.caution}>
            <h2>CAUTION</h2>
            <h3>Game contains flashing images and fast animations, play with caution.</h3>
          </div>


            <h4 className={styles.tagline}>Find the wanted Rune before time runs out!</h4>


          <div className={styles.section}>
            <h3>How to play:</h3>
            <ul>
              <li>Each round shows a <strong>WANTED</strong> Rune</li>
              <li>Find that rune among the characters</li>
              <li>Click or tap the correct rune to catch them</li>
              <li>Each correct catch adds 5 seconds to your time</li>
              <li>Progress through all the levels to complete the game</li>
            </ul>
          </div>

          <div className={styles.sideRow}>
            <div className={styles.section}>
              <h3>Keyboard shortcuts:</h3>
              <ul>
                <li><kbd>Tab</kbd> - Navigate between characters</li>
                <li><kbd>Enter</kbd> or <kbd>Space</kbd> - Select character</li>
                <li><kbd>Arrow Keys</kbd> - Move in carousel mode</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3>Rewards:</h3>
              <ul>
                <li>1+ level: €0.50</li>
                <li>4+ levels: €1.00</li>
                <li>7+ levels: €1.50</li>
                <li>10+ levels: €1.80</li>
                <li>13+ levels: €2.00</li>
                <li>15+ levels: €3.00</li>
              </ul>
            </div>
          </div>

        </div>

        <div className={styles.footer}>
          <button className={styles.closeButtonBottom} onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </>
  );
}