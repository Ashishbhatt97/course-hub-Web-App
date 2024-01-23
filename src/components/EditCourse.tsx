import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import axios from "axios";

const EditCourseForm = () => {
  const formSchema = z.object({
    title: z.string().max(100, { message: "Limit exceeded" }).min(5),
    courseDescription: z
      .string()
      .max(80, { message: "Limit exceeded" })
      .min(10, { message: "Minimum 20 Character Required" }),
    price: z
      .number()
      .min(99, { message: "Course price should be more than 99₹" }),
    imageUrl: z.string().max(350, {
      message: "Image Url not should be more than 350 Characters",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      courseDescription: "",
      price: 99,
      imageUrl: "",
    },
  });

  const onSubmit = async () => {
    const response = await axios.post("/api/admin/edit-course", form, {
      headers: {
        Authorization: `${localStorage.getItem("adminToken")}`,
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder=""
                  className="border-slate-700 placeholder:text-gray-300/40 "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Description</FormLabel>
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
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

export default EditCourseForm;
