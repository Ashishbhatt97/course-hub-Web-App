import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export function TestimonialSection() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full lg:max-w-5xl max-w-[280px] md:max-w-[300px] p-4 md:p-3 lg:p-0"
    >
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="flex justify-center flex-col items-center p-8">
                <CardContent className="flex flex-col aspect-square   items-center justify-center p-1">
                  <div className="rounded-full items-center flex justify-center mb-4">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="avatar"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="w-full h-[150px] flex flex-col justify-center text-center gap-3 ">
                    <p className="text-[#7a7979] line-clamp-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Itaque, quos! Odit culpa, eos sapiente temporibus, velit
                      illo hic reiciendis laborum earum neque aut?
                    </p>
                    <h3 className="text-[#b2b2b2]">Stars : {5}/5</h3>
                  </div>

                  <h3 className="text-md font-medium tracking-wide text-white/40 ">
                    Author : <span className="text-white">Ashish Bhatt</span>
                  </h3>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-white" />
      <CarouselNext className="text-white" />
    </Carousel>
  );
}
