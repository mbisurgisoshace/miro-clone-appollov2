"use client";

import { memo } from "react";
import { useStorage } from "@/liveblocks.config";

import Note from "./Note";
import Text from "./Text";
import { Path } from "./Path";
import Ellipse from "./Ellipse";
import Rectangle from "./Rectangle";
import { Layer, LayerType } from "@/types/Canvas";
import { colorToCss } from "@/lib/utils";
import RectanglePixi from "./RectanglePixi";
import { FederatedPointerEvent } from "pixi.js";
import EllipsePixi from "./EllipsePixi";
import TextPixi from "./TextPixi";

interface LayerPreviewProps {
  id: string;
  layer: Layer;
  selectionColor?: string;
  updateValue: (id: string, newValue: string) => void;
  onLayerPointerDown: (e: FederatedPointerEvent, layerId: string) => void;
}
export const LayerPreviewPixi = memo(
  ({
    id,
    layer,
    selectionColor,
    onLayerPointerDown,
    updateValue,
  }: LayerPreviewProps) => {
    //const layer = useStorage((root) => root.layers.get(id));
    if (!layer) return null;

    switch (layer.type) {
      // case LayerType.Path:
      //   return (
      //     <Path
      //       key={id}
      //       points={layer.points}
      //       onPointerDown={(e) => onLayerPointerDown(e, id)}
      //       x={layer.x}
      //       y={layer.y}
      //       fill={layer.fill ? colorToCss(layer.fill) : "#000"}
      //       stroke={selectionColor}
      //     />
      //   );
      // case LayerType.Note:
      //   return (
      //     <Note
      //       id={id}
      //       layer={layer}
      //       selectingColor={selectionColor}
      //       onPointerDown={onLayerPointerDown}
      //     />
      //   );
      case LayerType.Text:
        return (
          <TextPixi
            id={id}
            layer={layer}
            updateValue={updateValue}
            selectingColor={selectionColor}
            onPointerDown={onLayerPointerDown}
          />
        );
      case LayerType.Rectangle:
        return (
          <RectanglePixi
            id={id}
            layer={layer}
            selectingColor={selectionColor}
            onPointerDown={onLayerPointerDown}
          />
        );
      case LayerType.Ellipse:
        return (
          <EllipsePixi
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

LayerPreviewPixi.displayName = "LayerPreview";

export default LayerPreviewPixi;
