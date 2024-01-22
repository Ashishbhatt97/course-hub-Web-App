import * as React from "react";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CourseObjAtom } from "@/store/atoms/CourseObjAtom";
import { useRecoilValue } from "recoil";
import { CourseObj } from "@/pages/api/Models/CourseModel";
import Image from "next/image";

export default function CarouselSlider() {
  const courseObj = useRecoilValue<CourseObj[]>(CourseObjAtom);

  return (
    <div className="w-full lg:h-full h-full md:h-3/4 lg:pt-[80px] flex items-center justify-center lg:flex-row flex-col-reverse bg-black/25 text-white/15">
      <div className="lg:w-1/2 w-full lg:h-full h-1/2  flex justify-center items-center">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full lg:max-w-md max-w-[280px] md:max-w-[300px] p-4 md:p-3 lg:p-0 text-white/30 "
        >
          <CarouselContent>
            {courseObj.map((course) => (
              <CarouselItem key={course.courseId}>
                <div className="relative">
                  <Card>
                    <div className="relative w-full h-[300px] overflow-hidden rounded-xl">
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        width={500}
                        height={500}
                        className="object-cover object-center w-full h-full rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-xl"></div>
                      <div className="absolute inset-0 flex items-start pl-4 justify-end flex-col">
                        <h2 className="text-white/70 truncate hover:text-white transition-all ease-in-out duration-500 lg:text-lg md:text-base text-[16px] font-bold cursor-pointer">
                          {course.title}
                        </h2>
                        <h2 className="text-white/35 text-md mb-3 font-bold ">
                          - {course.instructorName}
                        </h2>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>
      </div>

      <div className="lg:w-1/2 pt-[35px] lg:pt-0 w-full h-1/4 md:h-fit lg:h-full lg:items-center items-end flex justify-center lg:text-[90px] text-[45px] ">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-extrabold">
          Best Courses
        </h2>
      </div>
    </div>
  );
}
