import { Button } from "@/components/ui/button";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";

const SenesteSager = () => {
  const dummyData = [
    { sagsnr: "#123123", personid: "#1", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#2", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#3", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#4", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#5", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#6", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#7", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#8", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#9", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#10", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#11", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#12", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#12", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#12", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#12", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#12", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#13", betjentnr: "P-01" },
    { sagsnr: "#123123", personid: "#14", betjentnr: "P-01" },
  ];
  return (
    <div className="bg-[#2C2C2E] rounded-[14px] w-full h-[420px]">
      <div className="flex flex-row justify-between px-5 mt-5 items-center">
        <h1 className="text-lg font-semibold text-white">Seneste Sager</h1>
        <Button
          variant="ghost"
          className="text-white font-semibold text-md hover:text-white/60 hover:bg-transparent"
        >
          Tilføj
        </Button>
      </div>
      <div className="px-2 mt-2">
        <DataTable columns={columns} data={dummyData} />
      </div>
    </div>
  );
};

export default SenesteSager;
