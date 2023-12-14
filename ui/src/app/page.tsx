import LoginForm from "@/components/login-form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full bg-gray-900">
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
