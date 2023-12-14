"use client";
import LoginForm from "@/components/login-form";
import { RootState } from "@/state/store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const searchParams = useSearchParams();
  const display = useSelector((state: RootState) => state.app.display);

  if (!display && !searchParams.get("preview")) return null;
  return (
    <div className="h-full bg-gray-900 rounded-xl w-full">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col gap-5 w-full items-center">
          <Image
            src="/politi.png"
            alt="politi logo"
            width={200}
            height={200}
            className=" shadow-lg"
          />
          <div className="flex items-center justify-center ">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
