import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/Canvas";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  selectingColor?: string;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
}

function Ellipse({ id, layer, selectingColor, onPointerDown }: EllipseProps) {
  const { x, y, width, height, fill } = layer;
  return (
    <ellipse
      x={0}
      y={0}
      width={width}
      rx={width / 2}
      cx={width / 2}
      ry={height / 2}
      cy={height / 2}
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

export default Ellipse;
