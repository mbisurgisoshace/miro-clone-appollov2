"use client";

import { useOrganization } from "@clerk/nextjs";

import BoardsList from "./_components/BoardsList";
import EmptyOrganization from "./_components/EmptyOrganization";

interface DashboardProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function Dashboard({ searchParams }: DashboardProps) {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrganization />
      ) : (
        <BoardsList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
}
