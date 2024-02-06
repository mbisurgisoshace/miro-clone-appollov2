"use client";

import { ClientSideSuspense } from "@liveblocks/react";

import { RoomProvider } from "@/liveblocks.config";

interface RoomProps {
  roomId: string;
  children: React.ReactNode;
  fallback: NonNullable<React.ReactNode> | null;
}
function Room({ roomId, fallback, children }: RoomProps) {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default Room;
