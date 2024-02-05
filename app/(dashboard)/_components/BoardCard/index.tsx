"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/clerk-react";
import { formatDistanceToNow } from "date-fns";

import Footer from "./Footer";
import Overlay from "./Overlay";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image fill alt={title} src={imageUrl} className="object-fit" />
          <Overlay />
        </div>
        <Footer
          title={title}
          author={authorLabel}
          createdAt={createdAtLabel}
          isFavorite={isFavorite}
          onClick={() => {}}
          disabled={false}
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
