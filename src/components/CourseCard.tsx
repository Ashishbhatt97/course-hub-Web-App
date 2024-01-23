import React from "react";
import Image from "next/image";
import Card from "./Card";
import { useRouter } from "next/router";

interface CourseCardProps {
  courseId: number;
  title?: string;
  price: number;
  instructorName?: string;
  imageUrl: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  courseId,
  title,
  price,
  imageUrl,
  instructorName,
}) => {
  const router = useRouter();
  const param = window.location.pathname;
  return (
    <div
      className="flex text-white h-fit lg:w-2/3 w-[350px] flex-col rounded-t-2xl overflow-hidden cursor-pointer"
      onClick={() => {
        {
          param === "/courses"
            ? router.push(`/course/${courseId}`)
            : router.push(`/purchased/${courseId}`);
        }
      }}
    >
      <Card>
        <div className="w-full h-48 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt="Course Image"
            layout="fill"
            objectFit="cover h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-white mt-4 text-[18px] capitalize font-semibold px-2 line-clamp-1 ">
            {title}
          </h2>
          <div className="bg-white text-black md:text-[16px] text-[14px] h-[40px] font-semibold flex justify-between items-center px-2">
            <h2 className="text-black">Instructor Name :</h2>
            <h2 className="">{instructorName}</h2>
          </div>
          <div className="flex justify-between items-center pb-3 px-2">
            <h2 className="">Price Value</h2>
            <h2 className="">₹ {price}</h2>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseCard;
