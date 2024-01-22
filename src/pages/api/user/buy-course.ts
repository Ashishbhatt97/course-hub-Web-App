import { NextApiRequest, NextApiResponse } from "next";
import { SECRET } from "../admin/admin-login";
import jwt from "jsonwebtoken";
import { Course } from "../Models/CourseModel";
import { User } from "../Models/UserModel";

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

export default function buyCourseHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyUserLoggedIn(req, res, async () => {
    try {
      const course = req.body;
      const coursesToPurchase = course.courses;
      console.log(coursesToPurchase);

      if (!Array.isArray(coursesToPurchase)) {
        return res.json({ message: "Invalid type of courses" });
      }

      const user = await User.findOne({
        email: req.headers["email"],
        password: req.headers["password"],
      });

      if (user) {
        if (!user.purchasedCourse) {
          return res
            .status(403)
            .json({ message: "User has no purchased courses" });
        }

        const coursesAlreadyPurchased = user.purchasedCourse.map(
          (e: { courseId: number }) => e.courseId
        );
        const alreadyPurchasedCourses = [];

        for (const courseToPurchase of coursesToPurchase) {
          const courseIdToPurchase = courseToPurchase.courseId;

          if (coursesAlreadyPurchased.includes(courseIdToPurchase)) {
            alreadyPurchasedCourses.push(courseToPurchase);
          } else {
            const course = await Course.findOne({
              courseId: courseIdToPurchase,
            });

            if (course) {
              user.purchasedCourse.push(course);
            }
          }
        }

        if (alreadyPurchasedCourses.length > 0) {
          return res.status(403).json({
            message:
              "Some courses are already purchased. Please remove them from the cart.",
            alreadyPurchasedCourses: alreadyPurchasedCourses,
          });
        }

        await user.save();
        res.json({ message: "Courses purchased successfully" });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
