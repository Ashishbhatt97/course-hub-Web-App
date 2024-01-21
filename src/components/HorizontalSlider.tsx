import React, { useState } from "react";
import { CourseObj } from "../pages/api/Models/CourseModel";
import { Button } from "./ui/button";

interface Props {
  courses: CourseObj[];
}

export const CourseSlider: React.FC<Props> = ({ courses }) => {
  const [filter, setFilter] = useState<string | null>(null);

  const uniqueCategories = Array.from(
    new Set(courses.map((course) => course.category))
  );

  const handleFilterChange = (category: string | null) => {
    setFilter(category);
  };

  const filteredCourses = filter
    ? courses.filter((course) => course.category === filter)
    : courses;

  return (
    <div>
      <div className="slider flex">
        <Button onClick={() => handleFilterChange(null)}>All</Button>
        {uniqueCategories.map((category) => (
          <div key={category} className="flex  gap-4 p-4 ">
            <Button onClick={() => handleFilterChange(category)}>
              {category}
            </Button>
          </div>
        ))}
      </div>
      <div className="courses">
        {filteredCourses.map((course) => (
          <button key={course.courseId} className="course-button">
            {course.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseSlider;
