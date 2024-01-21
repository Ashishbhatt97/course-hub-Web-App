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
          className="w-full lg:max-w-lg max-w-[250px] md:max-w-[450px] "
        >
          <CarouselContent>
            {courseObj.map((course) => (
              <CarouselItem key={course.courseId}>
                <div className="relative">
                  <Card>
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      height={700}
                      width={700}
                      className="object-fill w-full h-full rounded-xl"
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
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
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
