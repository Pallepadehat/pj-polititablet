"use client";
import Loading from "@/components/loading";
import { DateTimeDisplay, IconDisplay } from "@/components/topmenu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { DashboardOverviewScreen } from "./_components/DashboardOverview";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useEffect } from "react";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const display = useSelector((state: RootState) => state.app.display);

  if (!display && !searchParams.get("preview")) return null;

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-[1200px] h-[900px]">
        {/* Your iPad image */}
        <div className="absolute inset-0 z-1">
          <Image src="/ipad.svg" alt="iPad" fill />
        </div>

        {/* Content Centered Inside the iPad */}
        <div className="absolute top-8 left-10 right-20 w-[1055px]">
          {/* Top: Current time and date, Signal strength, Wi-Fi, and battery icons */}
          <div className="flex flex-col justify-between items-start">
            <DateTimeDisplay />
            <IconDisplay />
          </div>
        </div>

        {/* Centered content (LoginForm) */}
        <div className="absolute inset-0 flex justify-center items-center text-black">
          <div className="w-[1110px] h-[800px] rounded-xl flex flex-row">
            <DashboardSidebar />

            {/* Right-side overview screen components */}
            <DashboardOverviewScreen />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
