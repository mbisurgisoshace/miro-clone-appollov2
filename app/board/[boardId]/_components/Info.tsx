"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { cn } from "@/lib/utils";
import Hint from "@/components/Hint";
import Actions from "@/components/Actions";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/useRenameModal";
import { Menu } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};
interface InfoProps {
  boardId: string;
}

function Info({ boardId }: InfoProps) {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button variant={"board"} className="px-2" asChild>
          <Link href={"/"}>
            <Image alt="Logo" width={40} height={40} src="/logo.svg" />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} side="bottom" sideOffset={10} title={data.title}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};

export default Info;
