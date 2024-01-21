import { NextApiRequest, NextApiResponse } from "next";
import { Admin, adminValidationObj } from "../Models/AdminModel";
import jwt from "jsonwebtoken";
import { ConnectionDataBase } from "../ConnectionDb";

type responseType = {
  message?: String;
  token?: String;
  firstName?: String;
  email?: String;
};

export const SECRET = process.env.JWT_SECRET_KEY;

const loginHandle = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  try {
    const parsedAdminObj = adminValidationObj.safeParse(req.body);
    if (!parsedAdminObj.success) {
      res.json({ message: parsedAdminObj.error.errors[0].message });
      return;
    }
    const email = parsedAdminObj.data.email;
    const adminObj = await Admin.findOne({ email: email });

    if (!adminObj) {
      res.json({ message: "Admin Not Found" });
    }

    if (!SECRET) return res.json({ message: "Expected JWT_SECRET_KEY" });

    jwt.sign(parsedAdminObj, SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) return res.json({ message: "Error" });
      if (!token) return res.status(403).json({ message: "Token Missing" });
      req.headers["token"] = token;
      req.headers["email"] = req.body.email;
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

export default function adminLoginHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  ConnectionDataBase();
  loginHandle(req, res, async () => {
    const token = req.headers["token"];
    const email = req.headers["email"];

    if (typeof token !== "string")
      return res.json({ message: "Undefined Token" });
    if (typeof email !== "string")
      return res.json({ message: "Undefined firstName" });

    res.json({ message: "Logged in successfully", token: token });
  });
}
