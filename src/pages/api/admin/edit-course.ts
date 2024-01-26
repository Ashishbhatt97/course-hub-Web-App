import { NextApiRequest, NextApiResponse } from "next";
import { Course, partialCourseModifyObj } from "../Models/CourseModel";
import { ConnectionDataBase } from "../ConnectionDb";
import { SECRET } from "./admin-login";
import jwt from "jsonwebtoken";

type ResponseType = {
  message?: String;
  course?: Object;
  errorMessage?: string;
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
    return res.json({ errorMessage: "Unauthorized" });
  } else {
    const token = authToken.split(" ")[1];
    jwt.verify(token, SECRET, (err, admin) => {
      if (err) {
        return res.json({ errorMessage: "Admin is Unauthorized" });
      } else {
        if (!admin) return res.json({ errorMessage: "Admin Undefined" });
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
      const title = req.body.title;
      const courseDescription = req.body.courseDescription;
      const courseId = parseInt(req.body.id);
      const priceInt = parseInt(req.body.price);

      if (typeof courseId === "string" || typeof priceInt === "string") {
        return res.json({ errorMessage: "Wrong Input" });
      }

      const course = await Course.findOne({
        courseId: courseId,
      });

      if (!course) {
        res.json({ errorMessage: "Course Not Found" });
      } else {
        if (title) {
          course.title = title;
        }
        if (courseDescription) {
          course.courseDescription = courseDescription;
        }
        if (priceInt) {
          course.price = priceInt;
        }
        const response = await course.save();
        console.log(response);

        if (response) {
          res.send({
            message: "Course updated successfully",
            course: response,
          });
        } else {
          res.status(403).json({ errorMessage: "Course Update Failed" });
        }
      }
    } catch (error) {
      res.send({ errorMessage: "Internal Server Error" });
    }
  });
}
