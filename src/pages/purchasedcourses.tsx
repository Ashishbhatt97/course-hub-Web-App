import React, { useState, useEffect } from "react";
import axios from "axios";
import { CourseObj } from "./api/Models/CourseModel";
import CourseCard from "../components/CourseCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";

const Courses = () => {
  const [courses, setCourses] = useState<CourseObj[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const router = useRouter();

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
        const response = await axios.get("/api/user/purchased-courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")} `,
          },
        });
        setCourses(response.data.purchasedCourse);
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
    <div className="flex flex-col pt-[80px] w-full h-full gap-4">
      {courses.length !== 0 ? (
        <>
          <h1 className=" text-center md:text-[80px] text-[60px] font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['helvetica']">
            PURCHASED COURSES.
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

          <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-3 gap-6 mt-5">
            {filteredCourses.map((course) => (
              <div
                className="h-full w-full flex justify-center items-center p-5 md:p-0"
                key={course.courseId}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="text-center w-full lg:h-[50vh] h-[50vh] p-4 md:p-0 flex flex-col items-center justify-center lg:text-[80px] text-[50px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r text-white font-['helvetica']">
            <h1>NO COURSE PURCHASED!</h1>
            <Button
              className="text-center text-black flex items-center rounded-md w-[250px] p-5 justify-center"
              variant={"ordinary"}
              onClick={() => router.push("/courses")}
            >
              Explore Courses
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
