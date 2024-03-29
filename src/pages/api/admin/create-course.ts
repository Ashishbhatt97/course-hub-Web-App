import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { Course, CourseValidationObj } from "../Models/CourseModel";
import { SECRET } from "./admin-login";
import jwt from "jsonwebtoken";

type responseMessage = {
  message?: String;
  courseId?: Number;
  res?: {};
  title?: string;
  errorMessage?: string;
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
    return res.json({ errorMessage: "Unauthorized" });
  } else {
    const token = authToken.split(" ")[1];
    jwt.verify(token, SECRET, (err, admin) => {
      if (err) {
        return res.json({ errorMessage: "Admin is Unauthorized" });
      } else {
        if (!admin) return res.json({ message: "User Undefined" });
      }

      if (typeof admin == "string") return res.send({ message: "Bad Request" });
      next();
    });
  }
};

export type courseModel = z.infer<typeof CourseValidationObj>;
export default async function CreateCourse(
  req: NextApiRequest,
  res: NextApiResponse<responseMessage>
) {
  adminVerify(req, res, async () => {
    try {
      const ParsedCourseObj = CourseValidationObj.safeParse(req.body);

      if (!ParsedCourseObj.success) {
        return res.json({ message: ParsedCourseObj.error.issues[0].message });
      }

      const title = ParsedCourseObj.data.title;
      const courseDescription = ParsedCourseObj.data.courseDescription;
      const price = ParsedCourseObj.data.price;
      const imageUrl = ParsedCourseObj.data.imageUrl;
      const instructorName = ParsedCourseObj.data.instructorName;
      const published = true;
      const category = ParsedCourseObj.data.category.toLowerCase();

      const newCourse = new Course<courseModel>({
        courseId: Math.floor(Math.random() * 2000),
        title: title,
        courseDescription: courseDescription,
        imageUrl: imageUrl,
        price: price,
        instructorName: instructorName,
        published: published,
        category: category,
      });

      const response = await newCourse.save();
      console.log(newCourse);
      if (response) {
        res.json({ message: "Course Created Successfully", res: response });
      } else {
        res.json({ errorMessage: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
    }
  });
}
