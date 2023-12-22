"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "./efterlysningDataTable/data-table";
import { columns } from "./efterlysningDataTable/columns";
import { useEffect, useState } from "react";
import axios from "axios";

const NyesteEfterlysning = () => {
  const [efterLysninger, setefterLysninger] = useState([]);
  const fetchData = async () => {
    const repsonse = await axios.get("/api/efterlysninger");
    const data = repsonse.data;
    setefterLysninger(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-[#1C1C1E] rounded-[14px] w-full h-[420px]">
      <div className="flex flex-row justify-between px-5 mt-5 items-center">
        <h1 className="text-lg font-semibold text-white">
          Nyeste Efterlysninger
        </h1>
        <Button
          variant="ghost"
          className="text-white font-semibold text-md hover:text-white/60 hover:bg-transparent"
        >
          Tilføj
        </Button>
      </div>
      <div className="px-2 mt-2">
        <DataTable columns={columns} data={efterLysninger} />
      </div>
    </div>
  );
};

export default NyesteEfterlysning;
