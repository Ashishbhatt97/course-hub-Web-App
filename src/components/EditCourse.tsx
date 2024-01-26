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
import { useParams } from "next/navigation";

const EditCourseForm = () => {
  const params = useParams();


  
  const formSchema = z.object({
    title: z.string().max(100, { message: "Limit exceeded" }).min(5).optional(),
    courseDescription: z
      .string()
      .max(350, { message: "Limit exceeded" })
      .min(10, { message: "Minimum 20 Character Required" })
      .optional(),
    price: z
      .string()
      .max(3, { message: "Course price should below than 999₹" })
      .optional(),
    imageUrl: z
      .string()
      .max(350, {
        message: "Image Url not should be more than 350 Characters",
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      courseDescription: undefined,
      price: undefined,
      imageUrl: undefined,
    },
  });

  const onSubmit = async () => {
    const requestData = {
      ...form.control._formValues,
      ...params,
    };

    const response = await axios.post("/api/admin/edit-course", requestData, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    if (response) {
      toast({
        variant: "ordinary",
        description: "Course Updated Successfully",
      });
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
                  inputMode="numeric"
                  placeholder="price"
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
