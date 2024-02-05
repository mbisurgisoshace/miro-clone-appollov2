"use client";

import { useOrganizationList } from "@clerk/nextjs";

import OrganizationListItem from "./OrganizationListItem";

function OrganizationList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) return null;

  return (
    <div className="space-y-4">
      {userMemberships.data?.map((member) => (
        <OrganizationListItem
          id={member.organization.id}
          key={member.organization.id}
          name={member.organization.name}
          imageUrl={member.organization.imageUrl}
        />
      ))}
    </div>
  );
}

export default OrganizationList;
