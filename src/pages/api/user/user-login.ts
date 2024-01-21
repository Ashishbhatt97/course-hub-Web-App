import { NextApiRequest, NextApiResponse } from "next";
import { User, userValidationObj } from "../Models/UserModel";
import jwt from "jsonwebtoken";
import { SECRET } from "../admin/admin-login";
import { ConnectionDataBase } from "../ConnectionDb";

type responseType = {
  email?: string;
  message?: string;
  token?: string;
  firstName?: string;
  userData?: {};
  errorMessage?: String;
};

const userLoginMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
  next: () => void
) => {
  try {
    const parsedUserObj = userValidationObj.safeParse(req.body);

    if (!parsedUserObj.success) {
      return res.json({ errorMessage: parsedUserObj.error.errors[0].message });
    }

    if (!SECRET) {
      return res.json({ message: "JWT_SECRET_KEY Expected!" });
    }

    const email = parsedUserObj.data.email;
    const password = parsedUserObj.data.password;

    const response = await User.findOne({ email, password });

    if (!response) {
      return res.json({ errorMessage: "User Not Found" });
    } else {
      jwt.sign(
        { user: response },
        SECRET,
        { expiresIn: "24h" },
        (error, token) => {
          if (error || !token) {
            return res.json({ message: "Failed to generate token" });
          }

          req.headers["userToken"] = token;
          req.headers["userEmail"] = parsedUserObj.data.email;
          req.headers["userResponse"] = response;

          next();
        }
      );
    }
  } catch (error) {
    console.error(error);
    res.json({ errorMessage: "Internal Server Error" });
  }
};

export default async function userLoginHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  if (req.method === "POST") {
    ConnectionDataBase();
    userLoginMiddleware(req, res, () => {
      const token = req.headers["userToken"];
      const email = req.headers["userEmail"];
      const userData = req.headers["userResponse"];

      if (typeof token !== "string" || !email || !userData) {
        return res.json({
          message: "Token, Email, or Response is not defined",
        });
      }

      res.json({
        message: "User Logged In Successfully",
        token,
        userData,
      });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
