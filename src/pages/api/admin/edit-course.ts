import { NextApiRequest, NextApiResponse } from "next";
import { Course, partialCourseModifyObj } from "../Models/CourseModel";
import { ConnectionDataBase } from "../ConnectionDb";
import { SECRET } from "./admin-login";
import jwt from "jsonwebtoken";

type ResponseType = {
  message?: String;
  course?: Object;
};

const adminVerify = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  if (!SECRET) {
    return res.json({ message: "Expected JWT_SECRET_KEY" });
  }

  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.json({ message: "Unauthorized" });
  } else {
    const token = authToken.split(" ")[1];
    jwt.verify(token, SECRET, (err, admin) => {
      if (err) {
        return res.json({ message: "Admin is Unauthorized" });
      } else {
        if (!admin) return res.json({ message: "User Undefined" });
      }
      next();
    });
  }
};

export default async function editCourse(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  ConnectionDataBase();
  adminVerify(req, res, async () => {
    try {
      const parseUpdatedCourse = partialCourseModifyObj.safeParse(req.body);

      if (!parseUpdatedCourse.success) {
        return res.send({ message: parseUpdatedCourse.error.message });
      }

      const title = parseUpdatedCourse.data.title;
      const courseDescription = parseUpdatedCourse.data.courseDescription;
      const price = parseUpdatedCourse.data.price;

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
        if (title) {
          course.title = title;
        }
        if (courseDescription) {
          course.courseDescription = courseDescription;
        }
        if (price) {
          course.price = price;
        }
        const response = await course.save();

        if (response) {
          res.send({
            message: "Course updated successfully",
            course: response,
          });
        } else {
          res.status(403).json({ message: "Course Update Failed" });
        }
      }
    } catch (error) {
      res.send({ message: "Internal Server Error" });
    }
  });
}
