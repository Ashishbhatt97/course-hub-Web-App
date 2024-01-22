import { NextApiRequest, NextApiResponse } from "next";
import { SECRET } from "../admin/admin-login";
import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel";
import { FeedbackModel, feedbackValidationObj } from "../Models/FeedbackModel";

type responseType = {
  email?: string;
  message?: string;
  errorMessage?: String;
};

export function verifyUserLoggedIn(
  req: NextApiRequest,
  res: NextApiResponse<responseType>,
  next: Function
) {
  if (!SECRET) {
    return res.json({ message: "Expected JWT_SECRET_KEY" });
  }
  const authToken = req.headers.authorization;

  const feedbackParsedObj = feedbackValidationObj.safeParse(req.body);
  
  if (!feedbackParsedObj.success) {
    return res.json({
      errorMessage: feedbackParsedObj.error.errors[0].message,
    });
  }

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

export default function feedbackHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  verifyUserLoggedIn(req, res, async () => {
    const email = req.headers["email"];
    const password = req.headers["password"];
    const feedbackDetails = req.body;

    if (!feedbackDetails) {
      return res.json({ message: "Something Went Wrong" });
    }

    const response = await User.findOne({ email, password });
    if (!response) return res.json({ message: "User Not found" });

    const feedback = new FeedbackModel({
      message: feedbackDetails.message,
      stars: feedbackDetails.stars,
      author: response.firstName,
    });

    const result = await feedback.save();
    console.log(feedback);
    console.log(response);

    if (result) {
      return res.json({
        message: "Feedback Created Successfully",
      });
    }
  });
}
