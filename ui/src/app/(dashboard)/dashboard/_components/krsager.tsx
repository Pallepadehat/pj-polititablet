import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DataTable } from "./krsager/data-table";
import { columns } from "./krsager/columns";

const KrSager = () => {
  const dummy = [
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
  ];

  return (
    <div>
      <h1 className="text-white font-bold text-2xl p-2">Seneste sager i KR</h1>
      <div className="flex flex-col gap-5">
        <div className="w-full h-[650px]">
          <DataTable columns={columns} data={dummy} />
          <p className="text-center mt-3 text-white/50">
            Seneste efterlysninger
          </p>
        </div>
      </div>
    </div>
  );
};

export default KrSager;
