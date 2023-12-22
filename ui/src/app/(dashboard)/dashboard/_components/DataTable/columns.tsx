"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  caseNumber: string;
  responsible: string;
  fineAmount: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "caseNumber",
    header: "Sags Nr.",
  },
  {
    accessorKey: "responsible",
    header: "Ansvarlig",
  },
  {
    accessorKey: "fineAmount",
    header: "Bøde",
  },
];
