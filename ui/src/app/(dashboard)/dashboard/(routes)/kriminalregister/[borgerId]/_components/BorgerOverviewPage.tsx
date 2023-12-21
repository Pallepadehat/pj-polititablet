"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Citizen, Efterlysning } from "@prisma/client";
import axios from "axios";
import { AlertCircleIcon, AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "./DataTable/data-table";
import { columns } from "./DataTable/columns";

const BorgerOverviewPage = ({ params }: { params: number }) => {
  const [isBorger, setIsBorger] = useState<Citizen>();
  const [efterlyst, setIsEfterlyst] = useState<Efterlysning>();
  const [sager, setSager] = useState([]);

  const getSager = async () => {
    try {
      const response = await axios.get(`/api/borgersager`);
      setSager(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBorger = async () => {
    try {
      const response = await axios.patch("/api/borgerid", {
        id: params,
      });
      const data = response.data;
      setIsBorger(data);
    } catch (error) {
      console.log("Error!", error);
    }
  };

  const getEfterlysninger = async () => {
    try {
      const data = await axios.patch("/api/efterlysninger/getbyid", {
        id: params,
      });
      const efterlysning = data.data;
      console.log("Efterlysning", efterlysning);
      setIsEfterlyst(efterlysning);
    } catch (error) {
      console.log("Error!", error);
    }
  };
  useEffect(() => {
    getSager();
    getBorger();
    getEfterlysninger();
  }, []);

  const closeEfterlysning = async (ids: number) => {
    const id = ids;
    const citizenId = params;
    try {
      await axios.patch("/api/efterlysninger", { citizenId, id });
      toast({
        title: "Efterlysning",
        description: "Efterlysningen er blevet lukket.",
        variant: "ipad",
        duration: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-h-[800px]">
      <div className="p-10 w-full h-full flex flex-col gap-10">
        <div>
          <h1 className="text-4xl font-semibold text-white">Borger Oversigt</h1>
          <p className="text-white/60 text-sm">
            Her kan du læse borgerense seneste sager og straffe borger evt
            skulle have haft.
          </p>
        </div>
        <div
          className={cn(
            "pt-5 pb-5",
            efterlyst?.closed == false ? "visible" : "hidden"
          )}
        >
          <Alert variant="destructive">
            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex gap-2 pb-2 items-center">
                <AlertCircleIcon className="w-7 h-7" />
                <AlertTitle className="text-xl">Efterlyst!</AlertTitle>
              </div>
              <Button
                variant="destructive"
                onClick={() => closeEfterlysning(efterlyst?.id!)}
              >
                Afslut efterlysning
              </Button>
            </div>

            <AlertDescription className="flex flex-col gap-3">
              <span className="font-medium">
                Denne borger er efterlyst for:
              </span>
              <span>Beskrivelse: {efterlyst?.beskrivelse}</span>
            </AlertDescription>
          </Alert>
        </div>

        <div className="pt-5 text-white bg-[#1C1C1E] w-full h-full rounded-md px-5">
          <div
            className="flex flex-row justify-between w-full
          "
          >
            <div className=" flex flex-col gap-2 text-white">
              <h1 className="font-semibold">
                Navn: <span className="font-normal">{isBorger?.name}</span>
              </h1>
              <h1 className="font-semibold">
                Fødselsdato:{" "}
                <span className="font-normal">{isBorger?.foedselsdag}</span>
              </h1>
              <h1 className="font-semibold">
                Telefonnummer:{" "}
                <span className="font-normal">{isBorger?.telefon}</span>
              </h1>
              <h1 className="font-semibold flex gap-1">
                Kørekort:{" "}
                {isBorger?.hasLicense == true ? (
                  <p className="font-normal">Ja</p>
                ) : (
                  <p className="font-normal">Nej</p>
                )}
              </h1>
            </div>
            <div>
              <Button variant="destructive">Opret Efterlysning</Button>
            </div>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={sager} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorgerOverviewPage;
