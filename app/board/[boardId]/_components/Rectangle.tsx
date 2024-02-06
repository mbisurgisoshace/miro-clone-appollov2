import { RectangleLayer } from "@/types/Canvas";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  selectingColor?: string;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
}

function Rectangle({
  id,
  layer,
  selectingColor,
  onPointerDown,
}: RectangleProps) {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill="#000"
      width={width}
      height={height}
      strokeWidth={1}
      stroke="transparent"
    />
  );
}

export default Rectangle;
