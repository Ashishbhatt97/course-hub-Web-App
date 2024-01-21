import mongoose from "mongoose";
let connectDB = false;
const URI = process.env.DATABASE_URL;

export function ConnectionDataBase() {
  try {
    if (connectDB) {
      return;
    }
    if (!URI) {
      return;
    }
    connectDB = true;
    mongoose.connect(URI);
    console.log("Connected To Db");
  } catch (error) {}
}
