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
  email: string;
  name: string;
  admin: boolean;
  pnummer: string;
  onDuty: boolean;
};

export const Ansattecolumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "name",
    header: "Navn",
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
    header: () => <div className="text-left">OnDuty</div>,
    cell: ({ row }) => {
      const data = row.getValue("onDuty");
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
      const onDelete = () => {
        try {
          axios.delete("/api/user", {
            data: payment.id,
          });
          toast({
            title: "Bruger slettet.",
            description: `Brugeren med navnet ${payment.name} er blevet slettet`,
            variant: "ipad",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } catch (error) {
          toast({
            title: "Fejl ved sletning af bruger.",
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
            <DropdownMenuLabel>{payment.name}</DropdownMenuLabel>
            <DropdownMenuItem
              className="text-red-500 hover:text-red-500"
              onClick={() => onDelete()}
            >
              Slet Bruger
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
