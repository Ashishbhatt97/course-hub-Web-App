import { NextApiRequest, NextApiResponse } from "next";
import { SECRET } from "../admin/admin-login";
import jwt from "jsonwebtoken";
import { User, userObj } from "../Models/UserModel";

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

export default function removeWishlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyUserLoggedIn(req, res, async () => {
    try {
      const { courseId } = req.body;
      console.log(typeof courseId);

      if (typeof courseId !== "string")
        return res.json({ message: "Invalid type of courseId" });

      const course_Id = parseInt(courseId);

      const user = await User.findOne({
        email: req.headers["email"],
        password: req.headers["password"],
      });

      if (user) {
        const userWishlist = user.wishlist;

        const course = userWishlist.filter(
          (userWishlist: { courseId: number }) =>
            userWishlist.courseId !== course_Id
        );

        if (!course) return res.json({ message: "Course Not Found" });

        user.wishlist = course;
        await user.save();

        res.json({ message: "Course Remove from Wishlist successfully", user });
      } else {
        res.status(403).json({ message: "User not found" });
      }
    } catch (error) {
      if (error) res.send({ message: "Internal Server Error" });
    }
  });
}
