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

  return (
    <div
      className="flex text-white  h-fit w-2/3 flex-col rounded-t-2xl overflow-hidden cursor-pointer"
      onClick={() => {
        router.push(`/course/${courseId}`);
      }}
    >
      <Card>
        <div className="w-full h-48 relative overflow-hidden">
          <Image
            src={imageUrl}
            alt="Course Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-white mt-4 text-[18px] capitalize font-bold px-2">
            {title}
          </h2>
          <div className="bg-white text-black text-[16px] h-[40px] font-semibold flex justify-between items-center px-2">
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
