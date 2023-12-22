"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { KROprettelse } from "./DataTable/data-table";
import { Ansattecolumns } from "./DataTable/columns";

export const AdministrationOverview = () => {
  return (
    <div className="w-full h-full">
      <div className="p-10">
        <h1 className="text-4xl font-semibold text-white">Administration</h1>
        <p className="text-white/60 text-sm">
          Administer bøde taskster som dine betjente kan bruge til deres sager.
        </p>
        <div className="flex flex-row justify-between items-center mt-2">
          ad
        </div>
        <div className="pt-5 text-white">
          <KROprettelse columns={Ansattecolumns} data={data} />
        </div>
      </div>
    </div>
  );
};
