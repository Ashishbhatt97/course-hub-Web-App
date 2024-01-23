import React from "react";
import { MoveDown } from "lucide-react";
import Image from "next/image";
import i1 from "../../public/Group 9.svg";
import CarouselSlider from "@/components/CarouselSlider";

import { useRouter } from "next/router";
import { TestimonialSection } from "@/components/TestimonialSection";

export const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <>
      <div className="h-[100vh] w-full md:pt-[80px] pt-[100px]">
        <div className="w-full flex lg:text-left text-center lg:h-[80vh] p-2 h-[40vh] items-center">
          <div className="lg:w-1/2 h-full flex justify-center items-center lg:pl-44 ">
            <h2 className="text-[#dadada] lg:text-[85px] text-[50px] md:text-[65px] font-bold">
              Study Hard to Get
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                &nbsp; Dream Job...
              </span>
            </h2>
          </div>

          <div className="lg:w-1/2 w-full h-full hidden lg:flex lg:pr-6 justify-center items-center overflow-hidden relative ">
            <Image
              src={i1}
              className=""
              width={500}
              alt="logo"
              onClick={() => router.push("/")}
            />
          </div>
        </div>

        <div className="lg:w-[300px] w-[240px] flex lg:flex justify-between  text-white border-2 rounded-full items-center absolute lg:bottom-[320px] lg:left-[470px] bottom-[200px] left-[70px] md:bottom-[550px] md:left-[250px] cursor-pointer">
          <div className="group overflow-hidden text-[15px] lg:text-[18px]">
            <div className="-translate-y-16 transition-transform group-hover:translate-y-4">
              <h2 className="pl-[45px] tracking-widest">EXPLORE MORE</h2>
            </div>
            <div className="lg:h-[35px] h-[25px] -translate-y-5 lg:-translate-y-2  transition-transform group-hover:translate-y-10">
              <h2 className="lg:pl-[45px] md:ml-[25px] ml-[25px] lg:ml-0 tracking-widest">
                EXPLORE MORE
              </h2>
            </div>
          </div>

          <div className="border-2 border-gray-700 rounded-full p-4">
            <MoveDown size={28} />
          </div>
        </div>
        <CarouselSlider />
        <div className="flex flex-col  items-center justify-center text-white/10">
          <div className="h-full w-full text-center">
            <h2 className="text-center md:text-[80px] text-[40px] tracking-wide lg:text-[60px] font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 ">
              Testimonials
            </h2>
          </div>
          <TestimonialSection />
        </div>
      </div>
    </>
  );
};

export default index;
