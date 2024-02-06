"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/clerk-react";
import { MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { api } from "@/convex/_generated/api";

import Footer from "./Footer";
import Overlay from "./Overlay";
import Actions from "@/components/Actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  orgId: string;
  authorId: string;
  imageUrl: string;
  createdAt: number;
  authorName: string;
  isFavorite: boolean;
}

function BoardCard({
  id,
  orgId,
  title,
  authorId,
  imageUrl,
  createdAt,
  isFavorite,
  authorName,
}: BoardCardProps) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFavorite = async () => {
    if (isFavorite) {
      try {
        await onUnfavorite({ id });
      } catch (err) {
        toast.error("Failed to unfavorite");
      }
    } else {
      try {
        await onFavorite({ id, orgId });
      } catch (err) {
        console.log("error");

        toast.error("Failed to favorite");
      }
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image fill alt={title} src={imageUrl} className="object-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          author={authorLabel}
          isFavorite={isFavorite}
          onClick={toggleFavorite}
          createdAt={createdAtLabel}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BookCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default BoardCard;
