"use client";

import EmptyBoards from "./EmptyBoards";
import EmptyFavorites from "./EmptyFavorites";
import EmptySearch from "./EmptySearch";

interface BoardsListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

function BoardsList({ orgId, query }: BoardsListProps) {
  const data = []; // TODO: Change to API Call

  if (!data?.length && query.search) return <EmptySearch />;

  if (!data.length && query.favorites) return <EmptyFavorites />;

  if (!data.length) return <EmptyBoards />;

  return <div>BoardsList</div>;
}

export default BoardsList;
