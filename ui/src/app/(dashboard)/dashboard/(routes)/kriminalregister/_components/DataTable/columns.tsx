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
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { redirect } from "next/navigation";

export type Payment = {
  id: number;
  name: string;
  foedselsdag: string;
  licensePoints: number;
  hasLicense: boolean;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Navn og Efternavn",
  },
  {
    accessorKey: "foedselsdag",
    header: "Fødselsdag",
  },
  {
    accessorKey: "telefon",
    header: "Telefon Nummer",
  },
  {
    accessorKey: "hasLicense",
    header: () => <div className="text-left">Gyldigt Kørekort</div>,
    cell: ({ row }) => {
      const data = row.getValue("hasLicense");
      return (
        <div className="text-left font-medium">
          {data === true ? "Ja" : "Nej"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      const deleteBoger = async ({ id }: { id: number }) => {
        try {
          await axios.delete("/api/borger", { data: id });
          toast({
            title: "Borger Slettet.",
            description: "Borgeren blev slettet fra systemet.",
            variant: "ipad",
            duration: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1600);
        } catch (error) {
          toast({
            title: "Noget gik galt!",
            description: "Prøv igen sener, eller kontakt byens administrator.",
            variant: "ipad",
            duration: 1500,
          });
          console.log(error);
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
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{payment.name}</DropdownMenuLabel>
            <DropdownMenuItem>Redigere</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                redirect(`/dashboard/kriminalregister/${payment.id}`)
              }
            >
              Sager
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deleteBoger({ id: payment.id })}
              className="text-red-500 hover:text-red-500"
            >
              Slet Borger
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
