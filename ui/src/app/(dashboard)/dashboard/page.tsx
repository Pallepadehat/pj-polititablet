"use client";

import Card from "@/components/card";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { Car, Paperclip, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Efterlysninger from "./_components/efterlysninger";
import KrSager from "./_components/krsager";

const DashboardPage = () => {
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  if (status === "loading") {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 h-full w-full">
      <div>
        <h1 className="text-white text-lg">
          Du er logget ind som{" "}
          <span className="font-bold">{session.user?.name}</span>
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Card title="Antal Sager" data="1010" icon={Paperclip} />
        <Card title="Antal Personer" data="101" icon={User} />
        <Card title="Antal Efterlysninger" data="15" icon={Car} />
      </div>
      <div className="grid grid-cols-2 gap-5 h-full w-full">
        <div className="p-5 border border-[#202022] w-full h-full rounded-lg">
          <Efterlysninger />
        </div>
        <div className="p-5 border border-[#202022] w-full h-full rounded-lg">
          <KrSager />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
