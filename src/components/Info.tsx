import { useEffect, useRef, useState } from "react";
import styles from "./Info.module.css";

import InfoContent from "./InfoContent";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: () => void;
  showStartButton?: boolean;
}

export default function Info({
  isOpen,
  onClose,
  onStartGame,
  showStartButton = true,
}: InfoModalProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasEverScrolledToBottom, setHasEverScrolledToBottom] = useState(false);

  const handleStart = () => {
    if (onStartGame) onStartGame();
    onClose();
  };

  const checkScrollPosition = () => {
    const element = scrollRef.current;
    if (!element) return;

    const isAtBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 8;
    const atBottom = isAtBottom || element.scrollHeight <= element.clientHeight;
    setHasScrolledToBottom(atBottom);
    if (atBottom) setHasEverScrolledToBottom(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const element = scrollRef.current;
    if (!element) return;

    checkScrollPosition();

    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setHasScrolledToBottom(false);
      setHasEverScrolledToBottom(false);
    }
  }, [isOpen]);

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
            aria-label="Back"
          >
            Back
          </button>
        </div>

        <div className={styles.scrollArea}>
          <div
            ref={scrollRef}
            className={styles.scrollContent}
            onScroll={checkScrollPosition}
          >
            <InfoContent />
          </div>

          {!hasScrolledToBottom && (
            <>
              <div className={styles.scrollFade} aria-hidden="true" />
              <div className={styles.scrollBubble} aria-hidden="true">
                <span aria-hidden="true">\/</span>
              </div>
            </>
          )}
        </div>

        <div className={styles.footer}>
          {showStartButton ? (
            <button
              className={styles.closeButtonBottom}
              onClick={handleStart}
              disabled={!hasEverScrolledToBottom}
              aria-disabled={!hasEverScrolledToBottom}
            >
              Ready? - Start game 2€
            </button>
          ) : (
            <button className={styles.closeButtonBottom} onClick={onClose}>
              Got it
            </button>
          )}
        </div>
      </div>
    </>
  );
}
