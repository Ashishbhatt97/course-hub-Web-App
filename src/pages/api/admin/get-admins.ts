import { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "../Models/AdminModel";
import { ConnectionDataBase } from "../ConnectionDb";
import { SECRET } from "./admin-login";

import jwt from "jsonwebtoken";

type responseType = {
  admins?: Object;
  message?: String;
  token?: String;
};

const adminVerify = async (
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
    jwt.verify(token, SECRET, (err, admin) => {
      if (err) {
        return res.json({ message: "Admin is Unauthorized" });
      } else {
        if (!admin) return res.json({ message: "User Undefined" });
      }
      next();
    });
  }
};

export default async function getAllAdmins(
  req: NextApiRequest,
  res: NextApiResponse<responseType>
) {
  ConnectionDataBase();
  adminVerify(req, res, async () => {
    try {
      const allAdmins = await Admin.find({});
      res.json({ admins: allAdmins });
    } catch (error) {
      console.log(error);
    }
  });
}
