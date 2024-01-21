import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../Models/CourseModel";
import { ConnectionDataBase } from "../ConnectionDb";

type responseType = {
  courses?: Object;
  message?: String;
};
export default async function getCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  ConnectionDataBase();

  if (req.method === "GET") {
    try {
      const courses = await Course.find({ published: true });
      res.json({ courses: courses });
    } catch (error) {
      console.error(error);
    }
  }
}
