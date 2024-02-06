"use client";

import { useSelf, useOthers } from "@/liveblocks.config";

import UserAvatar from "./UserAvatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOWN_USERS = 2;

interface ParticipantsProps {}

function Participants({}: ParticipantsProps) {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            name={info.name}
            key={connectionId}
            src={info.picture}
            fallback={info?.name?.[0] || "T"}
            borderColor={connectionIdToColor(connectionId)}
          />
        ))}

        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            fallback={currentUser.info?.name?.[0]}
            name={`${currentUser.info?.name} (You)`}
            borderColor={connectionIdToColor(currentUser.connectionId)}
          />
        )}

        {hasMoreUsers && (
          <UserAvatar
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
            name={`${users.length - MAX_SHOWN_USERS} more`}
          />
        )}
      </div>
    </div>
  );
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  );
};

export default Participants;
