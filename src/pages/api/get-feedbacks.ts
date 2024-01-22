import { NextApiRequest, NextApiResponse } from "next";
import { ConnectionDataBase } from "./ConnectionDb";
import { FeedbackModel } from "./Models/FeedbackModel";

type responseType = {
  feedbacks?: any[];
};

export default async function getFeedbackHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  ConnectionDataBase();
  if (req.method === "GET") {
    try {
      const feeds: any[] = await FeedbackModel.find({});
      return res.json({ feedbacks: feeds });
    } catch (error) {
      console.error(error);
    }
  }
}
