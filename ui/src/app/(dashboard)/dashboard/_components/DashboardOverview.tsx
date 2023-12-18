import { useEffect, useState } from "react";
import axios from "axios";
import { TabletEfterlysninger, TabletSager } from "@prisma/client";
import { AlertOctagon, Info, Paperclip, User } from "lucide-react";
import DashboardOverviewItem from "./DashboardOverview-items";
import SenesteSager from "./seneste-sager";
import NyesteEfterlysning from "./nyeste-efterlysning";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

export const DashboardOverviewScreen = () => {
  const { status, data: session } = useSession();
  const [totalSager, setTotalSager] = useState(0);
  const [totalPersoner, setTotalPersoner] = useState(0);
  const [totalEfterlysninger, setTotalEfterlysninger] = useState(0);

  const fetchSagerData = async () => {
    try {
      const response = await axios.get<TabletSager[]>("/api/sager");

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Calculate total number of cases
        const totalSagerCount = response.data.length;
        setTotalSager(totalSagerCount);

        // Calculate total number of persons
        const totalPersonerCount = response.data.reduce(
          (acc, sager) => acc + (sager.personNr ? 1 : 0),
          0
        );
        setTotalPersoner(totalPersonerCount);
      } else {
        console.error("No data or empty array returned from the server.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEfterlysningerData = async () => {
    try {
      const response = await axios.get<TabletEfterlysninger[]>(
        "/api/efterlysninger"
      );

      if (Array.isArray(response.data) && response.data.length > 0) {
        // Calculate total number of persons
        const totalEfterlysningerCount = response.data.reduce(
          (acc, sager) => acc + (sager.id ? 1 : 0),
          0
        );
        setTotalEfterlysninger(totalEfterlysningerCount);
      } else {
        console.error("No data or empty array returned from the server.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSagerData();
    fetchEfterlysningerData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="p-10">
        <h1 className="text-4xl font-semibold text-white">Oversigt</h1>
        <p className="text-white/60">
          Få et nemt overblik over din Politi Station
        </p>
      </div>
      <div className="px-10 pb-5 "></div>
      <div className="px-10 text-white">
        <div className="grid grid-cols-3 gap-5">
          <DashboardOverviewItem
            title="Antal Sager"
            value={totalSager}
            icon={Info}
          />
          <DashboardOverviewItem
            title="Antal Personer"
            value={totalPersoner}
            icon={User}
          />
          <DashboardOverviewItem
            title="Antal Efterlysninger"
            value={totalEfterlysninger}
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
