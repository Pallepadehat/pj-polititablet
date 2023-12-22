"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Taxes } from "@prisma/client";
import { useState } from "react";
import { number } from "zod";

interface KRCardProps {
  id: number;
  bødePris: string;
  beskrivelse: string;
  fængsel: string;
  klip: string;
  onSelect: (selectedData: {
    id: number;
    description: string;
    prisonMonths: number;
    licensePoints: number;
    fineAmount: number;
  }) => void;
}

const KRCard = ({
  id,
  bødePris,
  beskrivelse,
  fængsel,
  klip,
  onSelect,
}: KRCardProps) => {
  const handleSelect = () => {
    onSelect({
      id: id,
      description: beskrivelse,
      prisonMonths: Number(fængsel),
      licensePoints: Number(klip),
      fineAmount: Number(bødePris),
    });
  };

  return (
    <div className="flex flex-row space-x-2 justify-between p-3 bg-slate-900 rounded-xl">
      <div className="flex flex-col items-center gap-1">
        <h1>Vælg</h1>
        <Checkbox
          onCheckedChange={handleSelect}
          className="border-white w-5 h-5"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1>Beskrivelse</h1>
        <p className="text-sm truncate w-28">{beskrivelse}</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1>Fængsel (I måneder)</h1>
        <p className="text-sm">{fængsel}</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1>Klip</h1>
        <p className="text-sm">{klip}</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1>Bøde beløb</h1>
        <p className="text-sm">{bødePris} DKK</p>
      </div>
    </div>
  );
};

export default KRCard;
