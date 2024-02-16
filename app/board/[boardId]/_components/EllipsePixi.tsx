import { useCallback } from "react";
import { Graphics } from "@pixi/react";
import { FederatedPointerEvent, Graphics as IGraphics } from "pixi.js";

import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/Canvas";

interface EllipseProps {
  id: string;
  layer: EllipseLayer;
  selectingColor?: string;
  onPointerDown: (e: FederatedPointerEvent, id: string) => void;
}

function EllipsePixi({
  id,
  layer,
  selectingColor,
  onPointerDown,
}: EllipseProps) {
  const { x, y, width, height, fill } = layer;

  const draw = useCallback(
    (g: IGraphics) => {
      g.clear();
      g.beginFill(colorToCss(fill));
      g.drawEllipse(x, y, width, height);
      g.endFill();
    },
    [x, y, width, height, fill]
  );

  return (
    <Graphics draw={draw} onpointerdown={(e) => onPointerDown(e, id)} />
    // <ellipse
    //   x={0}
    //   y={0}
    //   width={width}
    //   rx={width / 2}
    //   cx={width / 2}
    //   ry={height / 2}
    //   cy={height / 2}
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

export default EllipsePixi;
