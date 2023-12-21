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

const OpretKr = () => {
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
    <div>
      <Button
        size="ipad"
        variant="ipad"
        className="text-md flex flex-row gap-2 items-center"
      >
        <PlusCircle className="w-5 h-5" />
        Tilføj til
      </Button>
    </div>
  );
};

export default OpretKr;
