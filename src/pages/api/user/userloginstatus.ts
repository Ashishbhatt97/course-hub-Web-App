import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { SECRET } from "../admin/admin-login";
import { User } from "../Models/UserModel";

type responseType = {
  email?: String;
  message?: String;
  token?: String;
  userData?: {};
};

const userLoginMiddleware = async (
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

    jwt.verify(token, SECRET, (err, data) => {
      if (err) {
        return res.json({ message: "User is Unauthorized" });
      } else {
        if (!data) return res.json({ message: "User Undefined" });
      }

      if (typeof data == "string") return res.send({ message: "Bad Request" });

      if (!data) {
        return res.json({ message: "User data is not defined" });
      }

      req.headers["email"] = data.user.email;
      req.headers["password"] = data.user.password;
      next();
    });
  }
};

export default function userLoginHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  userLoginMiddleware(req, res, async () => {
    const email = req.headers["email"];
    const password = req.headers["password"];

    if (typeof email !== "string" || typeof password !== "string")
      return res.json({ message: "Email And Password is Not String Type" });

    const response = await User.findOne({ email, password });
    if (!response) return res.json({ message: "User Not Found" });

    res.json({ message: "User is LoggedIn", userData: response });
  });
}
