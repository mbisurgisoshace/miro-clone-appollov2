"use client";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";

import { cn } from "@/lib/utils";
import { useApiMutation } from "@/hooks/useApiMutation";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

function NewBoardButton({ orgId, disabled }: NewBoardButtonProps) {
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = async () => {
    try {
      const id = await mutate({
        orgId,
        title: "Untitled",
      });

      toast.success("Board created");
      router.push(`/board/${id}`);
    } catch (err) {
      toast.error("Failed to create board");
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || pending}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );
}

export default NewBoardButton;
