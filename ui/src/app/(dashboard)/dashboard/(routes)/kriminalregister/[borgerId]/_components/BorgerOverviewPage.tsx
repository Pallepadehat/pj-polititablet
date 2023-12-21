"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Citizen, Efterlysning } from "@prisma/client";
import axios from "axios";
import { AlertCircleIcon, AlertTriangle } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BorgerOverviewPage = ({ params }: { params: number }) => {
  const [isBorger, setIsBorger] = useState<Citizen>();
  const [efterlyst, setIsEfterlyst] = useState<Efterlysning>();

  const getSager = async () => {
    try {
      const response = await axios.get(`/api/borgersager`);
      console.log(response.data);
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
        <div className={cn("pt-5 pb-5", efterlyst ? "visible" : "hidden")}>
          <Alert variant="destructive">
            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex gap-2 pb-2 items-center">
                <AlertCircleIcon className="w-7 h-7" />
                <AlertTitle className="text-xl">Efterlyst!</AlertTitle>
              </div>
              <Button variant="destructive">Afslut efterlysning</Button>
            </div>

            <AlertDescription className="flex flex-col gap-3">
              <span className="font-medium">
                Denne borger er efterlyst for:
              </span>
              <span>Beskrivelse: {efterlyst?.beskrivelse}</span>
            </AlertDescription>
          </Alert>
        </div>

        <div className="pt-5 text-white bg-[#1C1C1E] w-full h-full rounded-md">
          <div className="px-5 flex flex-col gap-2 text-white">
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
        </div>
      </div>
    </div>
  );
};

export default BorgerOverviewPage;
