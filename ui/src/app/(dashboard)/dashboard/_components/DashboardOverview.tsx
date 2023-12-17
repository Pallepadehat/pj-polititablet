import { AlertOctagon, Info, Paperclip, User } from "lucide-react";
import DashboardOverviewItem from "./DashboardOverview-items";
import SenesteSager from "./seneste-sager";
import { Alert } from "@/components/ui/alert";
import NyesteEfterlysning from "./nyeste-efterlysning";

export const DashboardOverviewScreen = () => {
  return (
    <div className="w-full h-full">
      <div className="p-10">
        <h1 className="text-4xl font-semibold text-white">Oversigt</h1>
        <p className="text-white/60">
          Få et nemt overblik over din Politi Station
        </p>
      </div>
      <div className="pt-5 px-10 text-white">
        <div className="grid grid-cols-3 gap-5">
          <DashboardOverviewItem title="Antal Sager" value={1000} icon={Info} />
          <DashboardOverviewItem
            title="Antal Personer"
            value={100}
            icon={User}
          />
          <DashboardOverviewItem
            title="Antal Efterlysninger"
            value={15}
            icon={Paperclip}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 px-10 w-full h-[120px] gap-2 mt-10">
        <SenesteSager />
        <NyesteEfterlysning />
      </div>
    </div>
  );
};
