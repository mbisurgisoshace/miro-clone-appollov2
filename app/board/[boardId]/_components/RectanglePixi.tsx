import { Graphics } from "@pixi/react";
import { FederatedPointerEvent, Graphics as IGraphics } from "pixi.js";
import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/Canvas";
import { useCallback } from "react";

interface RectangleProps {
  id: string;
  layer: RectangleLayer;
  selectingColor?: string;
  onPointerDown: (e: FederatedPointerEvent, id: string) => void;
}

function RectanglePixi({
  id,
  layer,
  selectingColor,
  onPointerDown,
}: RectangleProps) {
  const { x, y, width, height, fill } = layer;

  const draw = useCallback(
    (g: IGraphics) => {
      g.clear();
      if (selectingColor) g.lineStyle(1, selectingColor);
      g.beginFill(colorToCss(fill));
      g.drawRect(x, y, width, height);
      g.endFill();
    },
    [x, y, width, height, fill, selectingColor]
  );

  return (
    <Graphics
      draw={draw}
      interactive={true}
      pointerdown={(e) => onPointerDown(e, id)}
    />
    // <rect
    //   x={0}
    //   y={0}
    //   width={width}
    //   height={height}
    //   strokeWidth={1}
    //   className="drop-shadow-md"
    //   fill={fill ? colorToCss(fill) : "#000"}
    //   stroke={selectingColor || "transparent"}
    //   style={{
    //     transform: `translate(${x}px, ${y}px)`,
    //   }}
    //   onPointerDown={(e) => onPointerDown(e, id)}
    // />
  );
}

export default RectanglePixi;
