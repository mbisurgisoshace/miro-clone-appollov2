"use client";

import { LucideIcon } from "lucide-react";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}
function ToolButton({
  icon: Icon,
  label,
  isActive,
  onClick,
  isDisabled,
}: ToolButtonProps) {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        size="icon"
        onClick={onClick}
        disabled={isDisabled}
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
}

export default ToolButton;
