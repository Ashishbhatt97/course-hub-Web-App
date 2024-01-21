import mongoose from "mongoose";
import { z } from "zod";

export interface CourseObj {
  courseId: number;
  title: string;
  courseDescription: string;
  price: number;
  imageUrl: string;
  published: boolean;
  instructorName: string;
  category: string;
}

export const CourseValidationObj = z.object({
  courseId: z.number().optional(),
  title: z.string().max(100, { message: "Limit exceeded" }).min(5),
  courseDescription: z
    .string()
    .max(1500, { message: "Limit exceeded" })
    .min(10, { message: "Minimum 20 Character Required" }),
  price: z
    .number()
    .min(100, { message: "Course price should be more than 100₹" }),
  imageUrl: z
    .string()
    .max(350, { message: "Image Url not should be more than 350 Characters" }),
  instructorName: z
    .string()
    .max(350, { message: "Image Url not should be more than 350 Characters" }),
  published: z.boolean().default(true),

  category: z
    .string()
    .max(350, { message: "Image Url not should be more than 350 Characters" }),
});

export const partialCourseModifyObj = CourseValidationObj.partial();

const courseModel = new mongoose.Schema<CourseObj>({
  category: { type: String, required: true },
  title: { type: String, required: true },
  courseDescription: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  published: { type: Boolean, required: true },
  courseId: { type: Number, required: true },
  instructorName: { type: String, required: true },
});

export const Course =
  mongoose.models.Course || mongoose.model<CourseObj>("Course", courseModel);
