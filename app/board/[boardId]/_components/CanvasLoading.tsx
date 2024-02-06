import { Loader } from "lucide-react";

import Info from "./Info";
import Toolbar from "./Toolbar";
import Participants from "./Participants";

interface CanvasLoadingProps {}
function CanvasLoading({}: CanvasLoadingProps) {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Toolbar.Skeleton />
      <Participants.Skeleton />
    </main>
  );
}

export default CanvasLoading;
