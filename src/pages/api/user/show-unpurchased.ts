import { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../Models/CourseModel";
import { ConnectionDataBase } from "../ConnectionDb";
import { SECRET } from "../admin/admin-login";
import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel";

type responseType = {
  courses?: Object;
  message?: String;
};

export function verifyUserLoggedIn(
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) {
  if (!SECRET) {
    return res.json({ message: "Expected JWT_SECRET_KEY" });
  }
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.json({ message: "Unauthorized" });
  } else {
    const token = authToken.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.json({ message: "User is Unauthorized" });
      } else {
        if (!user) return res.json({ message: "User Undefined" });
      }

      if (typeof user == "string") return res.send({ message: "Bad Request" });
      req.headers["email"] = user.user.email;
      req.headers["password"] = user.user.password;
      next();
    });
  }
}

export default async function getCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  ConnectionDataBase();
  verifyUserLoggedIn(req, res, async () => {
    if (req.method === "GET") {
      try {
        const user = await User.findOne({
          email: req.headers["email"],
          password: req.headers["password"],
        });

        if (!user) {
          return res.status(403).json({ message: "User not found" });
        }

        const purchasedCourseIds = user.purchasedCourse.map(
          (course: { courseId: number }) => course.courseId
        );

        const courses = await Course.find({
          published: true,
          courseId: { $nin: purchasedCourseIds },
        });

        res.json({ courses: courses });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
}
