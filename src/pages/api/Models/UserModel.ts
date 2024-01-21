import mongoose from "mongoose";
import { z } from "zod";
import { CourseObj } from "./CourseModel";

export type userObj = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  userId: Number;
  wishlist: CourseObj[];
  purchasedCourse: CourseObj[];
};

export const userValidationObj = z.object({
  firstName: z
    .string()
    .min(3, { message: "FirstName Should be atleast 2 characters" })
    .max(30, { message: "FirstName Should not more than 40 characters" })
    .optional(),

  lastName: z
    .string()
    .min(3, { message: "LastName Should be atleast 2 characters" })
    .max(30, { message: "LastName Should not more than 40 characters" })
    .optional(),

  email: z
    .string()
    .email()
    .min(3, { message: "Email Should be atleast 2 characters" })
    .max(30, { message: "Email Should not more than 40 characters" }),

  password: z
    .string()
    .max(100, { message: "Password Should not more than 100 characters" })
    .min(10, { message: "Password Should be atleast 10 characters" }),
});

const userSchema = new mongoose.Schema<userObj>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: Number, required: true },
  purchasedCourse: { type: [Object], required: false },
  wishlist: { type: [Object], required: false },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
