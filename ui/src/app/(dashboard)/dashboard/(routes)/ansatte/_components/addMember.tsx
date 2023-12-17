"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  admin: z.boolean(),
  pnummer: z.string(),
});

const AddMember = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      admin: false,
      pnummer: "",
    },
  });

  const state = form.formState;

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      axios.post("/api/user", values);
      toast({
        title: "Medarbejder Tilføjet",
        description: `Du har tilføjet ${values.name} til systemet`,
        variant: "ipad",
        duration: 1500,
      });
      if (!state.isLoading) {
        form.reset();
        window.location.reload();
      }
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
        <Button
          size="ipad"
          variant="ipad"
          className="text-md flex flex-row gap-2 items-center"
        >
          <PlusCircle className="w-5 h-5" />
          Ansæt Medarbejder
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/80 backdrop-blur-sm text-white border-white/30 ">
        <DialogHeader>
          <DialogTitle>Ansettelsen af Betjent</DialogTitle>
          <DialogDescription>
            Udfyld alt og din nye rekrudt er ansat.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="text-black"
                        placeholder="Betjentens Email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Navn</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Betjentens Navn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adgangskode</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-black"
                        placeholder="Betjentens password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pnummer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PNummer</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        placeholder="Betjentes Pnummer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="admin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Adgang</FormLabel>
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
                          Giv brugeren System Adgang
                        </label>
                      </div>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;
