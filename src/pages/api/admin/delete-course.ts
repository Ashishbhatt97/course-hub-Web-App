import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../Models/CourseModel";
import { SECRET } from "./admin-login";
import jwt from "jsonwebtoken";

type responseType = {
  message?: string;
  Courses?: object;
  errorMessage?: string;
};

const adminVerify = (
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
  next: () => void
) => {
  if (!SECRET) {
    return res.json({ message: "Expected JWT_SECRET_KEY" });
  }

  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.json({ errorMessage: "Unauthorized" });
  }

  const token = authToken.split(" ")[1];
  jwt.verify(token, SECRET, (err, admin) => {
    if (err || !admin) {
      return res.json({ errorMessage: "Admin is Unauthorized" });
    }
    next();
  });
};

export default async function deleteCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  adminVerify(req, res, async () => {
    try {
      const courseId = req.body.courseId;
      const availableCourses = await Course.findOneAndDelete({
        courseId: courseId,
      });

      if (!availableCourses) {
        return res.json({ errorMessage: "Course Not Found" });
      }

      const updatedCourses = await Course.find({ published: true });

      return res.json({
        message: "Course Deleted successfully",
        Courses: updatedCourses,
      });
    } catch (error) {
      console.error("Error in deleteCourseHandler:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
