import { useEffect, useRef, memo } from "react";
import type { CarouselProps } from "../types/Level";
import type { Character } from "../types/Character";
import { isImage } from "../utils/gameUtils";
import styles from "./CarouselGrid.module.css";

const ITEM_H = 72;
const ITEM_W = 80; //ger gap
const FIGURE_W = 72;
const SPEED = 1.5;

const imgCache = new Map<string, HTMLImageElement>();
function loadImg(src: string): Promise<HTMLImageElement> {
  if (imgCache.has(src)) return Promise.resolve(imgCache.get(src)!);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      imgCache.set(src, img);
      resolve(img);
    };
    img.src = src;
  });
}

const CarouselGrid = memo(function CarouselGrid({
  characters,
  cols,
  onCharacterClick,
}: CarouselProps) {
  const rows: Character[][] = [];
  for (let i = 0; i < characters.length; i += cols) {
    rows.push(characters.slice(i, i + cols));
  }

  return (
    <div className={styles.carouselGrid}>
      {rows.map((row, rowIndex) => (
        <CanvasRow
          key={rowIndex}
          items={row}
          direction={rowIndex % 2 === 0 ? "left" : "right"}
          onCharacterClick={onCharacterClick}
        />
      ))}
    </div>
  );
});

export default CarouselGrid;

function CanvasRow({
  items,
  direction,
  onCharacterClick,
}: {
  items: Character[];
  direction: "left" | "right";
  onCharacterClick: (c: Character) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const clickDataRef = useRef<{
    offset: number;
    tiled: Character[];
    copies: number;
  }>({ offset: 0, tiled: [], copies: 3 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || items.length === 0) return;

    let running = true;
    let started = false;
    cancelAnimationFrame(rafRef.current);

    async function start(W: number) {
      if (started || !running) return;
      started = true;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const baseImages: (HTMLImageElement | null)[] = await Promise.all(
        items.map((c) =>
          isImage(c.figure) ? loadImg(c.figure) : Promise.resolve(null)
        )
      );
      if (!running) return;

      const dpr = window.devicePixelRatio || 1;
      const H = ITEM_H;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";

      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      const setLen = items.length * ITEM_W;
      const copies = Math.ceil((W + 2 * setLen) / setLen) + 2;

      const tiled: Character[] = [];
      const tiledImages: (HTMLImageElement | null)[] = [];
      for (let c = 0; c < copies; c++) {
        for (let i = 0; i < items.length; i++) {
          tiled.push(items[i]);
          tiledImages.push(baseImages[i]);
        }
      }

      const startOffset = -setLen;
      offsetRef.current = startOffset;

      clickDataRef.current = { offset: startOffset, tiled, copies };

      const sign = direction === "left" ? -1 : 1;

      function draw() {
        if (!running) return;

        offsetRef.current += sign * SPEED;

        if (direction === "left" && offsetRef.current <= -2 * setLen) {
          offsetRef.current += setLen;
        }
        if (direction === "right" && offsetRef.current >= 0) {
          offsetRef.current -= setLen;
        }

        clickDataRef.current.offset = offsetRef.current;

        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < tiled.length; i++) {
          const x = i * ITEM_W + offsetRef.current;
          if (x + ITEM_W <= 0 || x >= W) continue;

          const img = tiledImages[i];
          if (img) {
            ctx.drawImage(img, x, 0, FIGURE_W, H);
          } else {
            const fontSize = Math.round(FIGURE_W * 0.55);
            ctx.font = `${fontSize}px serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.fillText(tiled[i].figure, x + FIGURE_W / 2, H / 2);
          }
        }

        rafRef.current = requestAnimationFrame(draw);
      }

      draw();
    }

    const ro = new ResizeObserver((entries) => {
      const W = entries[0].contentRect.width;
      if (W > 0) start(W);
    });

    ro.observe(wrapper);

    return () => {
      running = false;
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [items, direction]);

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const { offset, tiled } = clickDataRef.current;
    const W = canvasRef.current?.offsetWidth ?? 0;

    let bestOrigIdx = -1;
    let bestDist = Infinity;

    for (let i = 0; i < tiled.length; i++) {
      const x = i * ITEM_W + offset;
      if (x + ITEM_W <= 0 || x >= W) continue;
      const center = x + FIGURE_W / 2;
      const dist = Math.abs(center - clickX);
      if (dist < bestDist && dist < FIGURE_W / 2) {
        bestDist = dist;
        bestOrigIdx = i % items.length;
      }
    }

    if (bestOrigIdx !== -1) onCharacterClick(items[bestOrigIdx]);
  }

  return (
    <div ref={wrapperRef} className={styles.canvasWrapper}>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className={styles.canvas}
      />
    </div>
  );
}