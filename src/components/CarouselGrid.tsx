import type { Character } from "../types/Character";
import type { Props, RowProps } from "../types/Level";

export default function CarouselGrid({ characters, cols, onCharacterClick }: Props) {
  const rows: Character[][] = [];
  for (let i = 0; i < characters.length; i += cols) {
    rows.push(characters.slice(i, i + cols));
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {rows.map((row, rowIndex) => (
        <CarouselRow
          key={rowIndex}
          row={row}
          direction={rowIndex % 2 === 0 ? "left" : "right"}
          onCharacterClick={onCharacterClick}
        />
      ))}
    </div>
  );
}

function CarouselRow({ row, direction, onCharacterClick }: RowProps) {
  const doubled = [...row, ...row];

  return (
    <div
      style={{
        display: "flex",
        animation: `scroll-${direction} 6s linear infinite`,
        width: "max-content",
      }}
    >
      {doubled.map((c, i) => (
        <button
          key={`${c.id}-${i}`}
          onClick={() => onCharacterClick(c)}
          style={{ minWidth: "60px", minHeight: "60px", fontSize: "2rem" }}
        >
          {c.figure}
        </button>
      ))}
    </div>
  );
}