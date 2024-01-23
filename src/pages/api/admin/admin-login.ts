import { NextApiRequest, NextApiResponse } from "next";
import { Admin, adminValidationObj } from "../Models/AdminModel";
import jwt from "jsonwebtoken";
import { ConnectionDataBase } from "../ConnectionDb";

type responseType = {
  message?: String;
  token?: String;
  admin?: Object;
  email?: String;
  errorMessage?: String;
  adminEmail?: string;
};

export const SECRET = process.env.JWT_SECRET_KEY;

const adminLoginMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => {
  try {
    const parsedAdminObj = adminValidationObj.safeParse(req.body);

    if (!parsedAdminObj.success) {
      res.json({ errorMessage: parsedAdminObj.error.errors[0].message });
      return;
    }
    const email = parsedAdminObj.data.email;
    const password = parsedAdminObj.data.password;

    const response = await Admin.findOne({ email, password });

    if (!response) {
      return res.json({ errorMessage: "Admin Not Found" });
    }

    if (!SECRET) return res.json({ message: "Expected JWT_SECRET_KEY" });

    jwt.sign(parsedAdminObj, SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) return res.json({ errorMessage: "Error" });
      if (!token) return res.status(403).json({ message: "Token Missing" });

      req.headers["token"] = token;
      req.headers["adminEmail"] = req.body.email;
      req.headers["admin"] = response;

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
  adminLoginMiddleware(req, res, async () => {
    const token = req.headers["token"];
    const adminEmail = req.headers["adminEmail"];
    const admin = req.headers["admin"];
    console.log();

    if (typeof token !== "string")
      return res.json({ errorMessage: "Undefined Token" });
    if (typeof adminEmail !== "string" && admin === "string")
      return res.json({ errorMessage: "Undefined" });

    res.json({
      message: "Logged in successfully",
      token: token,
      admin,
    });
  });
}
