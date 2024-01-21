import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../Models/CourseModel";
import { ConnectionDataBase } from "../ConnectionDb";

type ResponseType = {
  message?: String;
  course?: Object;
};

export default async function editCourse(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  ConnectionDataBase();
  if (req.method === "GET") {
    try {
      const courseId = req.query.courseId;

      if (typeof courseId !== "string") {
        return res.json({ message: "Wrong Input" });
      }

      const course = await Course.findOne({
        courseId: parseInt(courseId),
      });

      if (!course) {
        res.json({ message: "Course Not Found" });
      } else {
        res.send({
          course: course,
        });
      }
    } catch (error) {
      res.send({ message: "Internal Server Error" });
    }
  }
}
