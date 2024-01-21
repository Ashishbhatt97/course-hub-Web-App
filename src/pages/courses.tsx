import React, { useState, useEffect } from "react";
import axios from "axios";
import { CourseObj } from "../pages/api/Models/CourseModel";
import CourseCard from "../components/CourseCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CourseObjAtom } from "@/store/atoms/CourseObjAtom";
import { userEmail } from "@/store/selectors/userEmail";

const Courses = () => {
  const [courses, setCourses] = useState<CourseObj[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const setCourseObjAtom = useSetRecoilState(CourseObjAtom);
  const userEmailValue = useRecoilValue(userEmail);

  const uniqueCategories = Array.from(
    new Set(courses.map((course) => course.category))
  );

  const handleFilterChange = (category: string | null) => {
    setFilter(category);
  };

  const filteredCourses = filter
    ? courses.filter((course) => course.category === filter)
    : courses;

  useEffect(() => {
    const getCourses = async () => {
      try {
        let response;

        if (userEmailValue === null) {
          response = await axios.get("/api/admin/get-courses", {});
        } else {
          response = await axios.get("/api/user/show-unpurchased", {
            headers: {
              Authorization: `bearer ${
                localStorage.getItem("userToken") || ""
              }`,
            },
          });
        }
        setCourseObjAtom(response.data.courses);
        setCourses(response.data.courses);
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
  }, []);

  return (
    <div className="flex flex-col w-full h-full gap-4 pt-[80px]">
      <div className=" text-center text-[80px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['poppins]">
        COURSES.
      </div>

      <div className="">
        <div className=" text-white cursor-pointer flex items-center justify-center gap-4">
          <div
            className="w-fit bg-white/10 backdrop-blur-lg p-4 rounded-xl px-8 flex justify-center items-center"
            onClick={() => handleFilterChange(null)}
          >
            All
          </div>
          {uniqueCategories.map((category) => (
            <div key={category} className="flex px-4">
              <div
                className="w-fit bg-white/10 backdrop-blur-lg p-4 rounded-xl px-8 flex justify-center items-center"
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-5">
        {filteredCourses.map((course) => (
          <div
            className="h-full  w-full flex justify-center items-center"
            key={course.courseId}
          >
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
