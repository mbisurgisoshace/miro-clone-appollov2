"use client";

import { memo } from "react";
import { useStorage } from "@/liveblocks.config";

import Note from "./Note";
import Text from "./Text";
import { Path } from "./Path";
import Ellipse from "./Ellipse";
import Rectangle from "./Rectangle";
import { LayerType } from "@/types/Canvas";
import { colorToCss } from "@/lib/utils";

interface LayerPreviewProps {
  id: string;
  selectionColor?: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
}
export const LayerPreview = memo(
  ({ id, selectionColor, onLayerPointerDown }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    if (!layer) return null;

    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            selectingColor={selectionColor}
            onPointerDown={onLayerPointerDown}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            selectingColor={selectionColor}
            onPointerDown={onLayerPointerDown}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            selectingColor={selectionColor}
            onPointerDown={onLayerPointerDown}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            selectingColor={selectionColor}
            onPointerDown={onLayerPointerDown}
          />
        );
      default:
        console.warn("Unkown layer type");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
