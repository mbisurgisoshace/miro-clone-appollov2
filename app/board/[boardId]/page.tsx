import Canvas from "./_components/Canvas";

import Room from "@/components/Room";
import CanvasLoading from "./_components/CanvasLoading";
import CanvasPixi from "./_components/CanvasPixi";

interface BoardProps {
  params: {
    boardId: string;
  };
}

export default function Board({ params }: BoardProps) {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      {/* <Canvas boardId={params.boardId} /> */}
      <CanvasPixi boardId={params.boardId} />
    </Room>
  );
}
