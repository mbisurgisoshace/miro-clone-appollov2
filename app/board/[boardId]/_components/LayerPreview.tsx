"use client";

import { memo } from "react";
import { useStorage } from "@/liveblocks.config";

import Rectangle from "./Rectangle";
import { LayerType } from "@/types/Canvas";

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
      case LayerType.Rectangle:
        return (
          <Rectangle
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
