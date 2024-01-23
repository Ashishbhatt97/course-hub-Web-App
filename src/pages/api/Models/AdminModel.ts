import mongoose from "mongoose";
import { z } from "zod";

export type AdminObj = {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  adminId: Number;
};

export const adminValidationObj = z.object({
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
    .min(3, { message: "Email Should atleast 2 characters" })
    .max(30, { message: "Email Should not more than 30 characters" }),

  password: z
    .string()
    .max(100, { message: "Password Should not more than 100 characters" })
    .min(10, { message: "Password Should be atleast 10 characters" }),
});

const adminSchema = new mongoose.Schema<AdminObj>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  adminId: { type: Number, required: true },
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
