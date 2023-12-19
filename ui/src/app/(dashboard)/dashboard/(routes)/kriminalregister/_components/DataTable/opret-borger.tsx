"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, PlusCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1),
  foedselsdag: z.string().min(1),
  telefon: z.string().min(1),
  hasLicense: z.boolean(),
});

const OpretBorger = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      foedselsdag: "",
      telefon: "",
      hasLicense: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios.post("/api/borger", values);
      toast({
        title: "Borger Tilføjet Til KR.",
        description: "Borgeren er hermed tilføjet til systemet!",
        variant: "ipad",
        duration: 1500,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      toast({
        title: "Der opstod en fejl.",
        description: "Prøv igen sener eller kontakt byens administrator.",
        variant: "ipad",
        duration: 1500,
      });
      console.log(error);
    }
  }

  const formStatus = form.formState;

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ipad"
            size="ipad"
            className="flex flex-row gap-2 items-center text-md"
          >
            <PlusCircle className="w-5 h-5" /> Opret Borger
          </Button>
        </DialogTrigger>
        <DialogContent className="backdrop-blur-sm bg-black/50 border-white/60">
          <DialogHeader>
            <DialogTitle className="text-white">
              Oprettelse af Borger
            </DialogTitle>
            <DialogDescription>
              Udfyld alle felter for at oprette borger.
            </DialogDescription>
          </DialogHeader>
          <div className="text-white">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Navn</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Navnet på borgeren"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foedselsdag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fødselsdag</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Borgerens fødselsdag"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telefon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon Nummer</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black"
                          placeholder="Borgerens telefon nr"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hasLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kørekort</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Gyldigt kørekort?
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={!formStatus.isValid || formStatus.isSubmitting}
                >
                  {formStatus.isSubmitting ? (
                    <div className="flex flex-row gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <p>Opretter</p>
                    </div>
                  ) : (
                    <p>Opret</p>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpretBorger;
