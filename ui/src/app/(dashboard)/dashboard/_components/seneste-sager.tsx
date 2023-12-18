"use client";
import { Button } from "@/components/ui/button";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import { useEffect, useState } from "react";
import { TabletSager } from "@prisma/client";
import axios from "axios";

const SenesteSager = () => {
  const [sagerData, setSagerData] = useState([]);
  const fetchData = async () => {
    const repsonse = await axios.get("/api/sager");
    const data = repsonse.data;
    setSagerData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-[#1C1C1E] rounded-[14px] w-full h-[420px]">
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
        <DataTable columns={columns} data={sagerData} />
      </div>
    </div>
  );
};

export default SenesteSager;
