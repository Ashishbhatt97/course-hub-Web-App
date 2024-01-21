import { NextApiRequest, NextApiResponse } from "next";
import { Admin, AdminObj, adminValidationObj } from "../Models/AdminModel";
import { ConnectionDataBase } from "../ConnectionDb";

type responseBody = {
  firstName?: String;
  token?: String;
  message?: String;
  Admin?: AdminObj;
};

ConnectionDataBase();

export default async function SignupHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseBody>
) {
  try {
    const AdminParsedObj = adminValidationObj.safeParse(req.body);

    if (!AdminParsedObj.success) {
      res.json({ message: AdminParsedObj.error.errors[0].message });
      return;
    }

    const firstName = AdminParsedObj.data.firstName;
    const lastName = AdminParsedObj.data.lastName;
    const email = AdminParsedObj.data.email;
    const password = AdminParsedObj.data.password;

    const adminExists = await Admin.findOne({
      email: email,
      password: password,
    });

    if (!adminExists) {
      const admin = new Admin({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        adminId: Math.floor(Math.random() * 100),
      });
      const response = await admin.save();

      if (response) {
        res.json({
          message: "Admin Created Successfully",
          firstName: firstName,
        });
      }
    } else {
      return res.json({
        message: "Admin already Existed",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
