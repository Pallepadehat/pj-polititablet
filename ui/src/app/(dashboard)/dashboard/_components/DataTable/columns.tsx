"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  sagsnr: string;
  personid: string;
  betjentnr: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "sagsNr",
    header: "Sags Nr.",
  },
  {
    accessorKey: "personNr",
    header: "Person Nr.",
  },
  {
    accessorKey: "pNummer",
    header: "P Nummer",
  },
];
