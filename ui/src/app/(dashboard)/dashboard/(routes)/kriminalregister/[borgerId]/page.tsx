import { DateTimeDisplay, IconDisplay } from "@/components/topmenu";
import Image from "next/image";
import { DashboardSidebar } from "../../../_components/DashboardSidebar";
import BorgerOverviewPage from "./_components/BorgerOverviewPage";

const BorgerPage = ({ params }: { params: { borgerId: string } }) => {
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
          <div className="w-[1110px] h-[800px] rounded-xl bg-[#000000]  flex flex-row">
            <DashboardSidebar />
            <BorgerOverviewPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorgerPage;
