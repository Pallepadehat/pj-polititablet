"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Bell, LucideIcon, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const DashboardNavbar = () => {
  const shortenUsernameToAlias = (
    username: string,
    maxLength: number
  ): string => {
    // Logic to shorten the username to the desired length
    return username.substring(0, maxLength).toUpperCase();
  };

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const username = `${session?.user?.name}`;

  const alias = shortenUsernameToAlias(username, 2);

  const routepathname = usePathname();

  const routes = [
    { label: "Oversigt", href: "/dashboard", pathname: "/dashboard" },
    {
      label: "Ansatte",
      href: "/dashboard/ansatte",
      pathname: "/dashboard/ansatte",
    },
    {
      label: "Kriminalregister",
      href: "/dashboard/kriminalregister",
      pathname: "/dashboard/kriminalregister",
    },
    {
      label: "Administration",
      href: "/dashboard/administration",
      pathname: "/dashboard/administration",
    },
  ];
  return (
    <div className="container bg-[#1B1C1F] flex flex-col">
      <div className="bg-[#1B1C1F] p-5 border-b border-[#202022]">
        <div className="flex flex-row justify-between items-end gap-2">
          <div className="flex flex-row gap-6">
            <Image
              src="/politi.png"
              alt="politilogo"
              width={150}
              height={140}
            />
            <div className="flex flex-row gap-2">
              {routes.map((item, idx) => (
                <Link href={item.href} key={item.href}>
                  <Button
                    variant="navitem"
                    className={cn(
                      "text-gray-500",
                      routepathname == item.pathname &&
                        "underline underline-offset-[32px] decoration-blue-500 decoration-[3px] text-white hover:text-white"
                    )}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>{alias}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Min Profil</DropdownMenuItem>
              <DropdownMenuItem>Indstillinger</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className=" focus:text-red-500"
              >
                Log Af
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
