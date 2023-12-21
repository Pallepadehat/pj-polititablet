"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export type Payment = {
  id: number;
  caseNumber: string;
  responsible: string;
  fineAmount: number;
  prisonMonths: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "caseNumber",
    header: "CaseNumber",
  },
  {
    accessorKey: "responsible",
    header: "Oprettet af",
  },
  {
    accessorKey: "fineAmount",
    header: "Bøde beløb",
  },
  {
    accessorKey: "prisonMonths",
    header: "Fængsel (I måneder)",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Medvirkene Betjente</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover:text-red-500">
              Slet Sag
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
