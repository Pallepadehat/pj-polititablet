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
  const [selectedTaxes, setSelectedTaxes] = useState<Taxes[]>([]);
  const [totalFineAmount, setTotalFineAmount] = useState<number>(0);
  const [totalPrisonMonths, setTotalPrisonMonths] = useState<number>(0);
  const [totalLicensePoints, setTotalLicensePoints] = useState<number>(0);

  const getTaxes = async () => {
    try {
      const response = await axios.get("/api/taxes");
      const data = response.data;
      setTaxes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaxes();
  }, []);

  useEffect(() => {
    // Recalculate totals whenever selectedTaxes change
    updateTotals(selectedTaxes);
  }, [selectedTaxes]);

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

  const updateTotals = (selectedTaxes: Taxes[]) => {
    setTotalFineAmount(
      selectedTaxes.reduce((total, tax) => total + (tax.fineAmount || 0), 0)
    );

    setTotalPrisonMonths(
      selectedTaxes.reduce((total, tax) => total + (tax.prisonMonths || 0), 0)
    );

    setTotalLicensePoints(
      selectedTaxes.reduce((total, tax) => total + (tax.licensePoints || 0), 0)
    );
  };

  const handleSaveTaxes = async () => {
    try {
      // You can use selectedTaxes for your logic to save taxes
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
            <div className="pb-2 flex flex-col gap-2">
              <h1 className="font-semibold">
                Total Bøde Beløb:{" "}
                <span className="font-normal">{totalFineAmount}</span>
              </h1>
              <h1 className="font-semibold">
                Total Fængsels Tid:{" "}
                <span className="font-normal">{totalPrisonMonths}</span>
              </h1>
              <h1 className="font-semibold">
                Total Klip:{" "}
                <span className="font-normal">{totalLicensePoints}</span>
              </h1>
            </div>
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
