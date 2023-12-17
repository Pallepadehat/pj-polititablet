"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  email: string;
  name: string;
  admin: boolean;
  pnummer: string;
  onDuty: boolean;
};

export const Ansattecolumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Betjent ID",
  },
  {
    accessorKey: "email",
    header: "Betjent Email",
  },
  {
    accessorKey: "name",
    header: "Bejtent Navn",
  },
  {
    accessorKey: "admin",
    header: () => <div className="text-left">System Adgang</div>,
    cell: ({ row }) => {
      const data = row.getValue("admin");
      return (
        <div className="text-left font-medium">
          {data == true ? "Ja" : "Nej"}
        </div>
      );
    },
  },
  {
    accessorKey: "pnummer",
    header: "PNummer",
  },
  {
    accessorKey: "onDuty",
    header: () => <div className="text-right">På Arbejde</div>,
    cell: ({ row }) => {
      const data = row.getValue("onDuty");
      return (
        <div className="text-left font-medium">
          {data == true ? "Ja" : "Nej"}
        </div>
      );
    },
  },
];
