import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../Models/CourseModel";
import { SECRET } from "./admin-login";
import jwt from "jsonwebtoken";

type responseType = {
  message?: String;
  Courses?: Object;
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

export default async function deleteCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  adminVerify(req, res, async () => {
    const courseId = req.query.courseId;
    const availableCourses = await Course.findOneAndDelete({
      courseId: courseId,
    });

    if (!availableCourses) {
      res.json({ message: "Course Not Found" });
    } else {
      const updatedCourses = await Course.find({ published: true });
      res.json({
        message: "Course Deleted successfully",
        Courses: updatedCourses,
      });
    }
  });
}
