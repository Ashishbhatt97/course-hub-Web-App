"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import axios from "axios";

interface FeedbackFormProps {
  onSubmit: (feedback: { message: string; stars: number }) => void;
}

const FeedbackForm: React.FC = () => {
  const formSchema = z.object({
    message: z.string().min(3, {
      message: "Message must be at least 3 characters.",
    }),
    stars: z.number().int().max(5).min(1, {
      message: "Stars Should Between 1 to 5.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      stars: 1,
    },
  });

  const onSubmit = async () => {
    const response = await axios.post("", {
      headers: {
        Authorization: `${localStorage.getItem("userToken")}`,
      },
    });

    if (response) {
      toast({ variant: "ordinary", description: "Feedback Submitted" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 lg:w-[700px] w-[350px] md:w-[550px]"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  className="border-slate-700 placeholder:text-gray-300/40"
                  placeholder="Enter Your Message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stars"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate this course out of 5</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Rating"
                  className="border-slate-700 placeholder:text-gray-300/40 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"ordinary"} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FeedbackForm;
