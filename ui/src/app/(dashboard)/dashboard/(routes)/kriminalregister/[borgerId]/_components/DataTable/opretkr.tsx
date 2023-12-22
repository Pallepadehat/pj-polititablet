"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from "lucide-react";
import KRCard from "../krCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Taxes } from "@prisma/client";

const OpretKr = () => {
  const [taxes, setTaxes] = useState<Taxes[]>();
  const getTaxes = async () => {
    try {
      const repsonse = await axios.get("/api/taxes");
      const data = repsonse.data;
      setTaxes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaxes();
  }, []);

  const [selectedTaxes, setSelectedTaxes] = useState<Taxes[]>([]);

  const handleTaxSelect = (tax: Taxes) => {
    setSelectedTaxes((prevSelectedTaxes) => {
      const isTaxSelected = prevSelectedTaxes.some(
        (selectedTax) => selectedTax.id === tax.id
      );

      if (!isTaxSelected) {
        return [...prevSelectedTaxes, tax];
      } else {
        return prevSelectedTaxes.filter(
          (selectedTax) => selectedTax.id !== tax.id
        );
      }
    });
  };

  const handleSaveTaxes = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="ipad"
            variant="ipad"
            className="text-md flex flex-row gap-2 items-center"
          >
            <PlusCircle className="w-5 h-5" />
            Tilføj til
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black/80 backdrop-blur-sm text-white w-[700px]  h-[650px]">
          <DialogHeader>
            <DialogTitle>Tilføj takst til kr</DialogTitle>
            <DialogDescription>Tilføj en staf til borgeren </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full">
            <ScrollArea className="h-[500px]">
              <div className=" flex flex-col gap-2">
                {taxes?.map((item, idx) => (
                  <KRCard
                    key={idx}
                    id={idx}
                    beskrivelse={item.description!}
                    fængsel={item.prisonMonths?.toString()!}
                    klip={item.licensePoints?.toString()!}
                    bødePris={item.fineAmount?.toString()!}
                    onSelect={() => handleTaxSelect(item)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-red-500 hover:bg-red-600">Anuller</Button>
            </DialogClose>

            <Button
              className="bg-green-500 hover:bg-green-600"
              onClick={handleSaveTaxes}
            >
              Gem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpretKr;
