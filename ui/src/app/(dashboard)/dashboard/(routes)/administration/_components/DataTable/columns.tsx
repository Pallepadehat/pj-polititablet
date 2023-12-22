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
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: number;
  prisonMonths: number;
  fineAmount: number;
  description: string;
  licensePoints: number;
};

export const Ansattecolumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "prisonMonths",
    header: "Fængsel (i måneder)",
  },
  {
    accessorKey: "fineAmount",
    header: "Bøde",
  },
  {
    accessorKey: "description",
    header: "Beskrivelse",
  },
  {
    accessorKey: "licensePoints",
    header: "Klip",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const onDelete = () => {
        try {
          axios.delete("/api/taxes", {
            data: payment.id,
          });
          toast({
            title: "Takst slettet.",
            description: `Du har slettet taksten: "${payment.description}"`,
            variant: "ipad",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          toast({
            title: "Fejl ved sletning af taksten.",
            description: "Prøv igen, eller kontakt byen ejer.",
            variant: "ipad",
          });
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black/90 backdrop-blur-sm text-white"
          >
            <DropdownMenuItem
              className="text-red-500 hover:text-red-500"
              onClick={() => onDelete()}
            >
              Slet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
