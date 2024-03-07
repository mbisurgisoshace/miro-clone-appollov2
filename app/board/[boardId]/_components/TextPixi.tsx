import { Kalam } from "next/font/google";

import { cn, colorToCss } from "@/lib/utils";

import { Text, BitmapText } from "@pixi/react";
import { TextStyle, FederatedPointerEvent } from "pixi.js";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "@/types/Canvas";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

interface TextProps {
  id: string;
  layer: TextLayer;
  selectingColor?: string;
  updateValue: (id: string, newValue: string) => void;
  onPointerDown: (e: FederatedPointerEvent, id: string) => void;
}
const TextPixi = ({
  id,
  layer,
  selectingColor,
  onPointerDown,
  updateValue,
}: TextProps) => {
  const { x, y, width, height, fill, value } = layer;

  const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnWidth = width * scaleFactor;
    const fontSizeBasedOnHeight = height * scaleFactor;

    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
  };

  // const updateValue = useMutation(({ storage }, newValue: string) => {
  //   const liveLayers = storage.get("layers");
  //   liveLayers.get(id)?.set("value", newValue);
  // }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(id, e.target.value);
  };

  return (
    <Text
      x={x}
      y={y}
      width={width}
      height={height}
      interactive={true}
      text={value || "Text"}
      style={
        new TextStyle({
          fill: fill ? colorToCss(fill) : "#000",
          fontSize: calculateFontSize(width, height),
        })
      }
      onpointerdown={(e) => onPointerDown(e, id)}
    />
    // <foreignObject
    //   x={x}
    //   y={y}
    //   width={width}
    //   height={height}
    //   onPointerDown={(e) => onPointerDown(e, id)}
    //   style={{
    //     outline: selectingColor ? `1px solid ${selectingColor}` : "none",
    //   }}
    // >
    //   <ContentEditable
    //     html={value || "Text"}
    //     onChange={handleContentChange}
    //     className={cn(
    //       "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
    //       font.className
    //     )}
    //     style={{
    //       color: fill ? colorToCss(fill) : "#000",
    //       fontSize: calculateFontSize(width, height),
    //     }}
    //   />
    // </foreignObject>
  );
};

export default TextPixi;
