import React, { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const AddCourse = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();

  const formSchema = z.object({
    title: z.string().max(100, { message: "Limit exceeded" }).min(5),
    courseDescription: z
      .string()
      .max(500, { message: "Limit exceeded" })
      .min(10, { message: "Minimum 20 Character Required" }),
    price: z
      .string()
      .max(3, { message: "Course price should below than 999₹" }),
    imageUrl: z.string().max(350, {
      message: "Image Url not should be more than 350 Characters",
    }),
    category: z.string(),
    instructorName: z.string().max(100, { message: "Limit exceeded" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      courseDescription: undefined,
      price: undefined,
      imageUrl: undefined,
      category: undefined,
      instructorName: undefined,
    },
  });

  const onSubmit = async () => {
    const updateForm = {
      title: form.control._formValues.title,
      courseDescription: form.control._formValues.courseDescription,
      price: Number(form.control._formValues.price),
      imageUrl: form.control._formValues.imageUrl,
      category: form.control._formValues.category,
      instructorName: form.control._formValues.instructorName,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/admin/create-course",
        updateForm,
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (response.data.errorMessage) {
        toast({
          variant: "ordinary",
          description: `${response.data.errorMessage}`,
        });
        setLoading(false);
      } else {
        toast({
          variant: "ordinary",
          description: "Course Created Successfully",
        });

        router.push("/courses");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="pt-[80px] flex-col text-white w-full lg:w-1/2w-full text-center h-full flex items-center ">
        <div className="lg:w-1/2w-full text-center h-full flex items-center">
          <h1 className="text-transparent mt-8 lg:mt-0 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600  w-full lg:text-[75px] text-[55px] text-center lg:text-left font-extrabold">
            Add Course
          </h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 lg:w-[60%] w-[350px] md:w-[550px] text-left"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Title"
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
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="border-slate-700 placeholder:text-gray-300/40"
                      placeholder="Add course description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Image"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="Price"
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="border-slate-700 text-gray-300/40">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className=" ">
                      <SelectGroup className=" bg-white ">
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="programming">Programming</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="data science">
                          Data Science
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instructorName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Instructor Name"
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
      </div>
    </>
  );
};

export default AddCourse;
