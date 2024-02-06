import {
  Type,
  Redo2,
  Undo2,
  Circle,
  Pencil,
  Square,
  StickyNote,
  MousePointer2,
} from "lucide-react";

import ToolButton from "./ToolButton";
import { CanvasMode, CanvasState, LayerType } from "@/types/Canvas";

interface ToolbarProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
}

function Toolbar({
  undo,
  redo,
  canUndo,
  canRedo,
  canvasState,
  setCanvasState,
}: ToolbarProps) {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 ">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
        />
        <ToolButton
          icon={Type}
          label="Text"
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
        />
        <ToolButton
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          label="Sticky note"
        />
        <ToolButton
          icon={Square}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          label="Rectangle"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
        />
        <ToolButton
          icon={Circle}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
          label="Ellipse"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
        />
        <ToolButton
          icon={Pencil}
          label="Pen"
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={canvasState.mode === CanvasMode.Pencil}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolButton
          icon={Undo2}
          isActive={false}
          label="Undo"
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          icon={Redo2}
          isActive={false}
          label="Redo"
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
}

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
};

export default Toolbar;
