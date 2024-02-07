import { colorToCss } from "@/lib/utils";
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
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      className="drop-shadow-md"
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectingColor || "transparent"}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      onPointerDown={(e) => onPointerDown(e, id)}
    />
  );
}

export default Rectangle;
