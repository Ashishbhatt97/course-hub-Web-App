import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { SECRET } from "../admin/admin-login";
import { Admin } from "../Models/AdminModel";

type responseType = {
  email?: String;
  message?: String;
  token?: String;
  adminData?: {};
};

const adminVerifyMiddleware = async (
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
        return res.json({ message: "admin is Unauthorized" });
      } else {
        if (!data) return res.json({ message: "admin Undefined" });
      }

      if (typeof data == "string") return res.send({ message: "Bad Request" });

      if (!data) {
        return res.json({ message: "Admin data is not defined" });
      }

      req.headers["email"] = data.data.email;
      req.headers["password"] = data.data.password;
      next();
    });
  }
};

export default function adminLoginStatusHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  adminVerifyMiddleware(req, res, async () => {
    const email = req.headers["email"];
    const password = req.headers["password"];

    if (typeof email !== "string" || typeof password !== "string")
      return res.json({ message: "Email And Password is Not String Type" });

    const response = await Admin.findOne({ email, password });
    if (!response) return res.json({ message: "User Not Found" });

    res.json({ message: "Admin is LoggedIn", adminData: response });
  });
}
