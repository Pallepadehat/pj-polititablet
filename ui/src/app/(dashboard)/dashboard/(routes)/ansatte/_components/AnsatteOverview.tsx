"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Ansattecolumns } from "./AnsatteTable/columns";
import { AnsatteTable } from "./AnsatteTable/data-table";
import AddMember from "./addMember";

export const AnsatteOverviewScreen = () => {
  const [Ansatte, setAnsatte] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("/api/user");
        console.log(data.data);
        setAnsatte(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="p-10">
        <h1 className="text-4xl font-semibold text-white">Ansatte</h1>
        <p className="text-white/60 text-sm">
          Administer dine ansatte på en simple måde!
        </p>
        <div className="flex flex-row justify-between items-center mt-2">
          <AddMember />
        </div>
        <div className="pt-5 text-white">
          <AnsatteTable data={Ansatte} columns={Ansattecolumns} />
        </div>
      </div>
    </div>
  );
};
