"use client";

import { UserButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <div className="flex imtes-center gap-x-4 p-5 bg-green-500">
      <div className="hidden lg:flex lg:flex-1">{/* TODO: Add search */}</div>
      <UserButton />
    </div>
  );
}

export default Navbar;
