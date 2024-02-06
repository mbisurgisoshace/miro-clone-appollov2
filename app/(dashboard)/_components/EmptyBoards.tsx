"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";

function EmptyBoards() {
  const router = useRouter();
  const { organization } = useOrganization();
  //const create = useMutation(api.board.create);
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = async () => {
    if (!organization) return;

    try {
      const id = await mutate({
        title: "Untitled",
        orgId: organization.id,
      });

      toast.success("Board created");
      router.push(`/board/${id}`);
    } catch (err) {
      toast.error("Failed to create board");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image alt="Empty" width={110} height={110} src="/note.svg" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6 ">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create board
        </Button>
      </div>
    </div>
  );
}

export default EmptyBoards;
