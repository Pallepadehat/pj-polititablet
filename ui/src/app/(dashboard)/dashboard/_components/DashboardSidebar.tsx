import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import AboutMe, { ActiveNews, NavigationTabs } from "./Sidebar-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import Logo from "@/components/Logo";

export const DashboardSidebar = () => {
  const { status, data: session } = useSession();

  const shortenUsernameToAlias = (
    username: string,
    maxLength: number
  ): string => {
    // Logic to shorten the username to the desired length
    return username.substring(0, maxLength).toUpperCase();
  };

  const username = `${session?.user?.name}`;

  const alias = shortenUsernameToAlias(username, 2);

  return (
    <div className="h-full w-[500px] border-r border-[#38383A]">
      <ScrollArea className=" h-[800px] pt-10">
        <div className="flex flex-col justify-between items-start ">
          <div className="pt-10 p-5 w-full">
            <div className="flex flex-col gap-5 text-white w-full">
              <Logo />
              <div className="flex flex-col">
                <div className="p-4 bg-[#2C2C2E] w-full rounded-t-[14px] flex flex-row gap-3 items-center">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-xl bg-gray-300 text-black">
                      {alias}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col w-full">
                    {status === "loading" ? (
                      <h1 className="font-semibold text-lg">Loading...</h1>
                    ) : (
                      <h1 className="font-semibold text-lg">
                        {" "}
                        {session?.user?.name}
                      </h1>
                    )}
                    <p className="text-xs text-white/50">
                      Login ID, Administration & Indstillinger
                    </p>
                  </div>
                </div>
                <Separator className="bg-[#38383A]" />
                <div className="px-4 p-1 bg-[#2C2C2E] w-full rounded-b-[14px] flex flex-row gap-3 items-center">
                  <h1 className="text-semibold text-lg">ROLEPLAYSERVERNAME</h1>
                </div>
              </div>
              <AboutMe />
              <NavigationTabs />
              <ActiveNews />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
