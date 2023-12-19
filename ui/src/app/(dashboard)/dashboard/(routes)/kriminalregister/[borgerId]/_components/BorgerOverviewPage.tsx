"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const BorgerOverviewPage = () => {
  const getSager = async () => {
    try {
      const response = await axios.get(`/api/borgersager`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBorger = async () => {
    try {
      const response = await axios.get;
    } catch (error) {}
  };
  useEffect(() => {
    getSager();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="p-10">
        <h1 className="text-4xl font-semibold text-white">Borger Oversigt</h1>
        <p className="text-white/60 text-sm">
          Her kan du læse borgerense seneste sager og straffe borger evt skulle
          have haft.
        </p>

        <div className="pt-5 text-white"></div>
      </div>
    </div>
  );
};

export default BorgerOverviewPage;
