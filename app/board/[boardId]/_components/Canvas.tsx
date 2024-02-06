"use client";

import Info from "./Info";
import Participants from "./Participants";
import Toolbar from "./Toolbar";

interface CanvasProps {
  boardId: string;
}

function Canvas({ boardId }: CanvasProps) {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Toolbar />
      <Participants />
    </main>
  );
}

export default Canvas;
