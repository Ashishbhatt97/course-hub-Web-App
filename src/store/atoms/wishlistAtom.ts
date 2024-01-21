import { atom } from "recoil";
import { CourseObj } from "@/pages/api/Models/CourseModel";

export const wishlistAtom = atom<CourseObj[]>({
  key: "wishlistAtom",
  default: [],
});
