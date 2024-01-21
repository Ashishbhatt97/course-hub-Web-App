import React, { useState, useEffect } from "react";
import axios from "axios";
import { CourseObj } from "./api/Models/CourseModel";
import CourseCard from "../components/CourseCard";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Courses = () => {
  const [courses, setCourses] = useState<CourseObj[]>([]);
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
    const getCourses = async () => {
      try {
        const response = await axios.get("/api/user/purchased-courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")} `,
          },
        });
        setCourses(response.data.purchasedCourse);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, []);

  return (
    <div className="flex flex-col pt-[80px] w-full h-full gap-4">
      {courses.length !== 0 ? (
        <>
          <div className=" text-center text-[80px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-['poppins]">
            PURCHASED COURSES.
          </div>
          <div className="">
            <div className="text-white cursor-pointer flex items-center justify-center gap-4">
              <div
                className="w-fit bg-white/10 backdrop-blur-lg p-4 rounded-xl px-8 flex justify-center items-center "
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
        </>
      ) : (
        <>
          <div className="text-center w-full h-[50vh] flex flex-col items-center justify-center text-[80px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r text-white font-['poppins]">
            <h1>NO COURSE PURCHASED</h1>
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
