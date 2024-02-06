import Canvas from "./_components/Canvas";

import Room from "@/components/Room";
import CanvasLoading from "./_components/CanvasLoading";

interface BoardProps {
  params: {
    boardId: string;
  };
}

export default function Board({ params }: BoardProps) {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
