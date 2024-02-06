"use client";

import { useSelf } from "@/liveblocks.config";

import Info from "./Info";
import Toolbar from "./Toolbar";
import Participants from "./Participants";

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Toolbar />
      <Participants />
    </main>
  );
}

export default Canvas;
