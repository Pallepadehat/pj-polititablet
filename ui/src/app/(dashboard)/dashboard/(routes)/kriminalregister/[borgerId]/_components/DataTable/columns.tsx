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
import { redirect, useRouter } from "next/navigation";

export type Payment = {
  id: number;
  name: string;
  age: string;
  licensePoints: number;
  hasLicense: boolean;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Borger Navn",
  },
  {
    accessorKey: "age",
    header: "Alder",
  },
  {
    accessorKey: "licensePoints",
    header: "Total Klip",
  },
  {
    accessorKey: "hasLicense",
    header: () => <div className="text-left">Har kørekort</div>,
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
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{payment.name}</DropdownMenuLabel>
            <DropdownMenuItem>Redigere</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/dashboard/kriminalregister/${payment.id}`)
              }
            >
              Sager
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 hover:text-red-500">
              Slet Borger
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
