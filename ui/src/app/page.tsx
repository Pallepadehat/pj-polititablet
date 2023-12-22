"use client";
import LoginForm from "@/components/login-form";
import { DateTimeDisplay, IconDisplay } from "@/components/topmenu";
import { RootState } from "@/state/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Component for displaying the current time and date

// Component for displaying icons (e.g., signal strength, Wi-Fi, battery)

export default function Home() {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const searchParams = useSearchParams();
  const display = useSelector((state: RootState) => state.app.display);

  if (!display && !searchParams.get("preview")) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-[1200px] h-[900px]">
        {/* Your iPad image */}
        <div className="absolute inset-0 z-1">
          <Image src="/ipad.svg" alt="iPad" fill />
        </div>

        {/* Content Centered Inside the iPad */}
        <div className="absolute top-8 left-10 right-20 w-[1055px]">
          <div className="flex flex-col justify-between items-start">
            {/* Top: Current time and date */}
            <DateTimeDisplay />

            {/* Bottom: Signal strength, Wi-Fi, and battery icons */}
            <IconDisplay />
          </div>
        </div>

        {/* Centered content (LoginForm) */}
        <div className="absolute inset-0 flex justify-center items-center text-black">
          <div className="bg-slate-900 w-[1110px] h-[800px] rounded-xl p-5 flex items-center justify-center flex-col gap-2">
            <Image src="/politi.png" alt="logo" width={200} height={200} />
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
