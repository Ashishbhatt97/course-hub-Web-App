import React, { useState, useEffect } from "react";
import axios from "axios";
import { CourseObj } from "../pages/api/Models/CourseModel";
import CourseCard from "../components/CourseCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CourseObjAtom } from "@/store/atoms/CourseObjAtom";
import { userEmail } from "@/store/selectors/userEmail";
import Loader from "@/components/Loader";

const Courses = () => {
  const [loading, setLoading] = useState(true);
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
    setLoading(true);

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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCourses();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col w-full h-full gap-4 lg:pt-[80px] pt-[120px]">
      <h1 className=" text-center md:text-[80px] text-[60px] font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        COURSES.
      </h1>

      <div>
        <div className="text-white cursor-pointer flex items-center gap-4 overflow-x-auto lg:justify-center  whitespace-nowrap">
          <div className="px-4">
            <div
              className="w-fit  bg-white/10 backdrop-blur-lg px-8 py-4 rounded-xl flex-shrink-0"
              onClick={() => handleFilterChange(null)}
            >
              All
            </div>
          </div>
          {uniqueCategories.map((category, index) => (
            <div
              key={category}
              className={`flex px-4 ${index === 0 ? "pl-0" : ""}`}
            >
              <div
                className="w-fit bg-white/10 backdrop-blur-lg px-8 py-4 rounded-xl flex-shrink-0"
                onClick={() => handleFilterChange(category)}
              >
                {category}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2  grid-cols-1 md:gap-3 gap-6 mt-5">
        {filteredCourses.map((course) => (
          <div
            className="h-full w-full flex justify-center md:items-start items-center p-5 md:p-0"
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
