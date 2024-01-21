import { NextApiRequest, NextApiResponse } from "next";
import { SECRET } from "../admin/admin-login";
import jwt from "jsonwebtoken";
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

export default function removeWishlist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyUserLoggedIn(req, res, async () => {
    try {
      const user = await User.findOne({
        email: req.headers["email"],
        password: req.headers["password"],
      });

      if (user) {
        user.wishlist = [];
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
