"use client";
import { BatteryFull, Loader, Signal, Wifi } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useParams, redirect } from "next/navigation";

export const DateTimeDisplay = () => {
  const { status } = useSession();
  const pathname = usePathname();
  console.log(pathname);
  const formatDateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    return `${timeString} ${dateString}`;
  };

  return (
    <div className="absolute top-5 left-5 text-white z-10">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-lg font-medium">{formatDateTime()}</p>
        {status === "loading" && <Loader className=" animate-spin w-5 h-5" />}
      </div>
    </div>
  );
};

export const IconDisplay = () => {
  return (
    <div className="absolute right-0 top-5 flex items-center flex-row space-x-2 text-white z-10 ">
      <div className=" h-6 w-6">
        <Signal />
      </div>
      <div className=" h-6 w-6">
        <Wifi />
      </div>
      <div className=" h-6 w-6">
        <h1 className="flex flex-row gap-2">
          100%
          <span>
            <BatteryFull />
          </span>
        </h1>
      </div>
    </div>
  );
};
