import { TooltipContentProps } from "@radix-ui/react-tooltip";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  label: string;
  sideOffset?: number;
  alignOffset?: number;
  children: React.ReactNode;
  side?: TooltipContentProps["side"];
  align?: TooltipContentProps["align"];
}

function Hint({
  side,
  align,
  label,
  children,
  sideOffset,
  alignOffset,
}: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-white bg-black border-black"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Hint;
