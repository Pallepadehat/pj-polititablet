"use client";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Toast } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import axios from "axios";
import {
  ArrowRight,
  BadgePlusIcon,
  Bell,
  BellOff,
  BellRing,
  Database,
  Info,
  LayoutDashboard,
  LucideIcon,
  Users,
} from "lucide-react";
import Link from "next/link";

export const AboutMe = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div className="px-4 p-2 bg-[#2C2C2E] w-full rounded-t-[14px] flex flex-row gap-3 items-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-8 h-8 bg-[#FF9F0A] rounded-[7px] flex items-center justify-center">
                <BadgePlusIcon />
              </div>
              <h1 className="text-[18px]">On Duty</h1>
            </div>
            <Switch />
          </div>
        </div>
        <Separator className="bg-[#38383A]" />
        <div className="px-4 p-2 bg-[#2C2C2E] w-full rounded-b-[14px] flex flex-row gap-3 items-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-8 h-8 bg-[#0A84FF] rounded-[7px] flex items-center justify-center">
                <Info />
              </div>
              <h1 className="text-[18px]">Rank</h1>
            </div>
            <p className="text-md text-[#EBEBF5]/60">Region Chef | P-0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

export const NavigationTabs = () => {
  const routes = [
    {
      id: 1,
      label: "Oversigt",
      color: "bg-[#FF453A]",
      Icon: LayoutDashboard,
      isAdmin: false,
      href: "/dashboard",
    },
    {
      id: 2,
      label: "Ansatte",
      color: "bg-[#FF375F]",
      Icon: Users,
      isAdmin: true,
      href: "/dashboard/ansatte",
    },
    {
      id: 3,
      label: "Kriminalregister",
      color: "bg-[#5E5CE6]",
      Icon: Database,
      isAdmin: false,
      href: "/dashboard/kriminalregister",
    },
    {
      id: 4,
      label: "Administration",
      color: "bg-[#30D158]",
      Icon: LayoutDashboard,
      isAdmin: false,
      href: "/dashboard/administration",
    },
  ];
  return (
    <div>
      <div className="w-full">
        <div className="flex flex-col w-full">
          {routes.map((item, idx) => (
            <div key={idx}>
              <Link href={item.href}>
                <div
                  className={cn(
                    "p-2 px-4 bg-[#2C2C2E]  w-full  flex flex-row gap-3 items-center",
                    item.id === 1 && "rounded-t-[14px]",
                    item.id === 4 && "rounded-b-[14px]"
                  )}
                >
                  <div className="flex w-full items-center ">
                    <div className="flex flex-row gap-2 items-center">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-[7px] flex items-center justify-center",
                          item.color
                        )}
                      >
                        <Icon Icon={item.Icon} />
                      </div>
                      <h1 className="text-[18px]">{item.label}</h1>
                    </div>
                  </div>
                </div>
                {item.id !== 4 && <Separator className="bg-[#38383A]" />}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Icon = ({ Icon }: { Icon: LucideIcon }) => {
  return <Icon />;
};

export const ActiveNews = () => {
  const setData = async (data: any) => {
    try {
      axios.patch("/api/notifications", { notifications: data });
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "ipad",
        duration: 1500,
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "ipad",
      });
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div className="px-4 p-2 bg-[#2C2C2E] w-full rounded-t-[14px] flex flex-row gap-3 items-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-8 h-8 bg-red-500 rounded-[7px] flex items-center justify-center">
                <Bell />
              </div>
              <h1 className="text-[18px]">Notificationer</h1>
            </div>
            <Switch onCheckedChange={(value) => setData(value)} />
          </div>
        </div>
        <Separator className="bg-[#38383A]" />
        <div className="px-4 p-2 bg-[#2C2C2E] w-full rounded-b-[14px] flex flex-row gap-3 items-center">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-row gap-2 items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-[7px] flex items-center justify-center">
                {false ? <BellOff /> : <BellRing />}
              </div>
              <h1 className="text-[18px]">Seneste Nyt</h1>
            </div>
            <div className="flex flex-row gap-2 items-center ">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                1
              </div>
              <ArrowRight className="text-[#4b4b4d]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
