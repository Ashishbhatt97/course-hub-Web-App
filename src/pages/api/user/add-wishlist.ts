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

      if (typeof user == "string")
        return res.json({ message: "Bad Request from Backend" });

      req.headers["email"] = user.user.email;
      req.headers["password"] = user.user.password;
      next();
    });
  }
}

export default function addWishlist(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    verifyUserLoggedIn(req, res, async () => {
      try {
        const { courseId } = req.body;

        if (typeof courseId !== "string")
          return res.json({ message: "Invalid type of courseId" });

        const course_Id = parseInt(courseId);
        const course = await Course.findOne({ courseId: course_Id });

        if (course) {
          const user = await User.findOne({
            email: req.headers["email"],
            password: req.headers["password"],
          });

          if (user) {
            if (!user.wishlist) {
              return res.status(403);
            }

            const courseExists = user.wishlist.find(
              (e: any) => e.courseId === course_Id
            );

            if (courseExists) {
              return res.json({ message: "Course Already in  Wishlist" });
            } else {
              user.wishlist.push(course);
              await user.save();

              res.json({
                message: "Course Added Successfully In Wishlist",
                user,
              });
            }
          } else {
            res.status(403).json({ message: "User not found" });
          }
        } else {
          res.status(404).json({ message: "Course not found" });
        }
      } catch (error) {
        if (error) res.send({ message: "Internal Server Error" });
      }
    });
  }
}
