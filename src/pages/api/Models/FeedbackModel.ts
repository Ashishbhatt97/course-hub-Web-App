import mongoose from "mongoose";
import { z } from "zod";

export interface FeedbackModel {
  message: string;
  stars: number;
  author: string;
}

export const feedbackValidationObj = z.object({
  message: z
    .string()
    .max(1500, { message: "Limit exceeded" })
    .min(3, { message: "Minimum 3 Character Required" }),
  stars: z
    .number()
    .min(1, { message: "Star rating should be in between 1 to 5" })
    .max(5),
  author: z.string(),
});

const feedbackModel = new mongoose.Schema<FeedbackModel>({
  message: { type: String, required: true },
  stars: { type: Number, required: true },
  author: { type: String, required: true },
});

export const FeedbackModel =
  mongoose.models.Feedbacks ||
  mongoose.model<FeedbackModel>("Feedbacks", feedbackModel);
