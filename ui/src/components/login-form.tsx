"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { AlertOctagon } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertTitle } from "./ui/alert";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

const LoginForm = () => {
  const router = useRouter();

  const callbackUrl = "/dashboard";
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...values,
        callbackUrl,
      });
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 w-[450px] bg-white rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="hello@example.com" {...field} />
                </FormControl>
                <FormDescription>Intast din email adress.</FormDescription>
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
                  <Input placeholder="Adgangskode" type="password" {...field} />
                </FormControl>
                <FormDescription>Indtast din adgangskode.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <Alert>
              <AlertOctagon className="h-4 w-4" />
              <AlertTitle>Ugyldig Email & Password</AlertTitle>
            </Alert>
          )}
          <Button className="w-full" type="submit">
            Login
          </Button>
          <p className="text-sm text-slate-500">
            Har du ikke en konto? kontakt byens administrator.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
