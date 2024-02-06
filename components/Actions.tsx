"use client";

import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

import { api } from "@/convex/_generated/api";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ConfirmModal";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRenameModal } from "@/store/useRenameModal";

interface ActionsProps {
  id: string;
  title: string;
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

function Actions({ id, side, title, children, sideOffset }: ActionsProps) {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.remove);

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/board/${id}`
      );
      toast.success("Link coppied");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const onDelete = async () => {
    try {
      await mutate({ id });
      toast.success("Board deleted");
    } catch (err) {
      toast.error("Failed to delete board");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        className="w-60"
        sideOffset={sideOffset}
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="h-4 w-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          disabled={pending}
          onConfirm={onDelete}
          header="Delete board?"
          description="This will delete the board and all of its contents."
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Actions;
