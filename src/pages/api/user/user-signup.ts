import { NextApiRequest, NextApiResponse } from "next";
import { User, userObj, userValidationObj } from "../Models/UserModel";
import { ConnectionDataBase } from "../ConnectionDb";

type responseBody = {
  firstName?: String;
  token?: String;
  message?: String;
  errorMessage?: String;
};

ConnectionDataBase();

export default async function SignupHandler(
  req: NextApiRequest,
  res: NextApiResponse<responseBody>
) {
  if (req.method === "POST") {
    try {
      const userParsedObj = userValidationObj.safeParse(req.body);

      if (!userParsedObj.success) {
        res.json({ errorMessage: userParsedObj.error.errors[0].message });
        return;
      }

      const firstName = userParsedObj.data.firstName;
      const lastName = userParsedObj.data.lastName;
      const email = userParsedObj.data.email;
      const password = userParsedObj.data.password;

      const userExists = await User.findOne({
        email: email,
        password: password,
      });

      if (userExists) {
        return res.json({
          message: "User already Existed",
        });
      } else {
        const user = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          purchasedCourse: [],
          wishlist: [],
          userId: Math.floor(Math.random() * 100),
        });

        const response = await user.save();

        if (response) {
          res.json({
            message: "User Created Successfully",
            firstName: firstName,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
