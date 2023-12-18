"use client";
import { useEffect, useState } from "react";
import { Citizen } from "@prisma/client";
import axios from "axios";
import { DataTable } from "./DataTable/data-table";
import { columns } from "./DataTable/columns";

const KriminalRegisterOverviewScreen = () => {
  const [borger, setBorger] = useState([]);

  const getBorgerData = async () => {
    const repsonse = await axios.get("/api/borger");
    const data = repsonse.data;
    setBorger(data);
  };

  useEffect(() => {
    getBorgerData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="p-10">
        <h1 className="text-4xl font-semibold text-white">kriminalregister</h1>
        <p className="text-white/60 text-sm">
          Her kan du opret sager på borger, samt holde styr på hvilket sager
          borger har haft tidligere
        </p>

        <div className="pt-5 text-white">
          <DataTable data={borger} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default KriminalRegisterOverviewScreen;
