"use client";

import {
  UserButton,
  useOrganization,
  OrganizationSwitcher,
} from "@clerk/nextjs";

import SearchInput from "./SearchInput";
import InviteButton from "./InviteButton";

function Navbar() {
  const { organization } = useOrganization();

  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block lg:hidden flex-1">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                width: "100%",
                display: "flex",
                maxWidth: "376px",
                alignItems: "center",
                justifyContent: "center",
              },
              organizationSwitcherTrigger: {
                width: "100%",
                padding: "6px",
                borderRadius: "8px",
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                justifyContent: "space-between",
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  );
}

export default Navbar;
