"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  beskrivelse: string;
  closed: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "beskrivelse",
    header: "Beskrivelse",
  },
  {
    accessorKey: "closed",
    header: () => <div className="text-left">Åben?</div>,
    cell: ({ row }) => {
      const data = row.getValue("closed");
      return (
        <div className="text-left font-medium">
          {data == true ? "Ja" : "Nej"}
        </div>
      );
    },
  },
];
