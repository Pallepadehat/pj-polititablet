"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  sagsnr: string;
  bøde: string;
  fængsel: string;
  ansvarlig: string;
  dato: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "sagsnr",
    header: "SagsNr.",
  },
  {
    accessorKey: "bøde",
    header: "Bøde",
  },
  {
    accessorKey: "fængsel",
    header: "Fængsel",
  },
  {
    accessorKey: "ansvarlig",
    header: "Ansvarlig",
  },
  {
    accessorKey: "dato",
    header: "Dato",
  },
];
