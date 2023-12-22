"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Citizen, Efterlysning, TabletUser } from "@prisma/client";
import axios from "axios";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  beskrivelse: z.string().min(2).max(50),
});

const BorgerOverviewPage = ({ params }: { params: number }) => {
  const [isBorger, setIsBorger] = useState<Citizen>();
  const [efterlyst, setIsEfterlyst] = useState<Efterlysning>();
  const [sager, setSager] = useState([]);
  const [user, setUser] = useState<TabletUser>();

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

  useEffect(() => {
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
        setIsEfterlyst(efterlysning);
      } catch (error) {
        console.log("Error!", error);
      }
    };

    getSager();
    getBorger();
    getEfterlysninger();
  }, [params]); // Include params in the dependency array

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beskrivelse: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios.post("/api/efterlysninger", {
        beskrivelse: values.beskrivelse,
        tabletUserId: user?.id,
        citizenId: params,
      });
      toast({
        title: "Efterlysning oprettet",
        description: `Efterlysning blev oprettet på ${isBorger?.name}`,
        variant: "ipad",
        duration: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full max-h-[800px]">
      <div className="p-10 w-full h-full flex flex-col gap-5">
        <div>
          <h1 className="text-4xl font-semibold text-white">Borger Oversigt</h1>
          <p className="text-white/60 text-sm">
            Her kan du læse borgerense seneste sager og straffe borger evt
            skulle have haft.
          </p>
        </div>
        <ScrollArea>
          <div className="flex flex-col gap-5">
            <div
              className={cn(efterlyst?.closed == false ? "visible" : "hidden")}
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className={cn(efterlyst ? "hidden" : "visible")}
                      >
                        Opret Efterlysning
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[500px] bg-black/80 backdrop-blur-sm text-white">
                      <DialogHeader>
                        <DialogTitle>Opret efyerlysning på borger</DialogTitle>
                        <DialogDescription>
                          Alle betjente i din kres kan se efterlysningen.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-8"
                        >
                          <FormField
                            control={form.control}
                            name="beskrivelse"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Beskrivelse</FormLabel>
                                <FormControl>
                                  <Input
                                    className="text-black"
                                    placeholder="Grund"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit">Opret</Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="mt-5">
                <DataTable columns={columns} data={sager} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default BorgerOverviewPage;
