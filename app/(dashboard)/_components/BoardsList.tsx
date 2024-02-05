"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import BoardCard from "./BoardCard";
import EmptyBoards from "./EmptyBoards";
import EmptySearch from "./EmptySearch";
import EmptyFavorites from "./EmptyFavorites";
import NewBoardButton from "./NewBoardButton";

interface BoardsListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

function BoardsList({ orgId, query }: BoardsListProps) {
  const data = useQuery(api.boards.get, { orgId });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <NewBoardButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) return <EmptySearch />;

  if (!data.length && query.favorites) return <EmptyFavorites />;

  if (!data.length) return <EmptyBoards />;

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            id={board._id}
            key={board._id}
            isFavorite={false}
            title={board.title}
            orgId={board.ordId}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
          />
        ))}
      </div>
    </div>
  );
}

export default BoardsList;
