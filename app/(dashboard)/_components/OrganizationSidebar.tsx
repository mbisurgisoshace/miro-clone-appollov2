"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { LayoutDashboard, Star } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

function OrganizationSidebar() {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image alt="Logo" width={60} height={60} src="/logo.svg" />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              width: "100%",
              display: "flex",
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
      <div className="space-y-1 w-full">
        <Button
          asChild
          size="lg"
          variant={favorites ? "ghost" : "secondary"}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Team Boards
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant={favorites ? "secondary" : "ghost"}
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={{ pathname: "/", query: { favorites: true } }}>
            <Star className="h-4 w-4 mr-2" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default OrganizationSidebar;
