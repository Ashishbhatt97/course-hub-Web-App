import { NextApiRequest, NextApiResponse } from "next";
import { SECRET } from "../admin/admin-login";
import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel";
import { ConnectionDataBase } from "../ConnectionDb";

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

export default function showPurchasedCourseHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  ConnectionDataBase();

  if (req.method === "GET") {
    verifyUserLoggedIn(req, res, async () => {
      try {
        const user = await User.findOne({
          email: req.headers["email"],
          password: req.headers["password"],
        });

        if (!user) {
          return res.json({ message: "User Not Found" });
        }
        const userPurchasedCourse = user.purchasedCourse;

        res.json({ purchasedCourse: userPurchasedCourse });
      } catch (error) {
        res.json({ message: "Internal Server Error" });
      }
    });
  }
}
