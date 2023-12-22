import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  prisonMonths: z.string(),
  fineAmount: z.string(),
  description: z.string().min(1),
  licensePoints: z.string(),
});

const OpretTax = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prisonMonths: "",
      fineAmount: "",
      description: "",
      licensePoints: "",
    },
  });

  const state = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios.post("/api/taxes", {
        fineAmount: parseFloat(values.fineAmount),
        prisonMonths: parseInt(values.prisonMonths),
        description: values.description,
        licensePoints: parseInt(values.licensePoints),
      });
      toast({
        title: "Takst Tilføjet",
        description: `Du har tilføjet en bøde takst til systemet`,
        variant: "ipad",
        duration: 1500,
      });
      if (!state.isLoading) {
        form.reset();
      }
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } catch (error) {
      toast({
        title: "Der skete en fejl",
        variant: "ipad",
        duration: 1500,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ipad" size="ipad">
          <PlusCircle className="w-5 h-5" /> <p>Tilføj Til Kr</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/80 backdrop-blur-sm text-white w-[500px]">
        <DialogHeader>
          <DialogTitle>Tilføjelse til Kr</DialogTitle>
          <DialogDescription>Tilføj bøde takster til kr</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-white x"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beskrivelse</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="text-black"
                      placeholder="Kørte over for rødt!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fineAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bøde Pris</FormLabel>
                  <FormControl>
                    <Input type="number" className="text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licensePoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klip i kørekortet</FormLabel>
                  <FormControl>
                    <Input type="number" className="text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prisonMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fængsel (I Måneder)</FormLabel>
                  <FormControl>
                    <Input type="number" className="text-black" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!state.isValid}>
              {state.isLoading || state.isSubmitting ? (
                <div className="flex flex-row items-center gap-1">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gemmer
                </div>
              ) : (
                <div>Gem</div>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OpretTax;
