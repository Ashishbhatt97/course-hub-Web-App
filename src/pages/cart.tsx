"use client";

import React from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartFooter from "@/components/CartFooter";
import { toast } from "@/components/ui/use-toast";
import { userObjAtom } from "@/store/atoms/UserObjAtom";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { wishlistCartValue } from "@/store/selectors/wishlistCartValue";

export default function Cart() {
  const router = useRouter();
  const cart = useRecoilValue(wishlistAtom);
  const setUserObj = useSetRecoilState(userObjAtom);
  const cartValue = useRecoilValue(wishlistCartValue);
  const setWishlistCart = useSetRecoilState(wishlistAtom);

  const deleteCart = async (courseId: number) => {
    const res = await axios.post(
      `/api/user/remove-wishlist`,
      { courseId: courseId.toString() },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    if (res) {
      if (res.data) {
        const wishlistData = res.data.user.wishlist;
        const userObjData = res.data.user;

        if (wishlistData && userObjData) {
          setWishlistCart(wishlistData);
          setUserObj(userObjData);
        }
      }

      if (res.data.message) {
        toast({
          variant: "ordinary",
          title: res.data.message,
        });
      }
    }
  };

  const totalValue = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <>
      <div className="w-full h-[100vh] pt-[80px] flex items-center justify-center ">
        {cartValue === 0 && (
          <div className="text-center bg-slate-300 flex flex-col items-center justify-center  font-extrabold text-transparent bg-clip-text bg-gradient-to-r text-white">
            <h1 className="text-[80px]">Your Cart Is Empty</h1>
            <Button
              className="text-center text-black flex items-center rounded-md w-[250px] p-5 justify-center"
              variant={"ordinary"}
              onClick={() => router.push("/courses")}
            >
              Add Courses To Cart
            </Button>
          </div>
        )}
        {cartValue !== 0 && (
          <div className="w-full h-[80vh]  flex">
            <div className="w-1/2 h-full flex items-center justify-center">
              <div className=" flex items-center justify-center">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600  w-full text-[75px] font-extrabold ">
                  Your Cart
                </h1>
              </div>
            </div>
            <div className="w-1/2 h-full">
              <div className="w-full flex">
                <ScrollArea className="h-[calc(90vh-90px)] rounded-xl py-8 w-[550px]  items-center justify-center flex">
                  <div className="flex flex-col justify-center items-center gap-4 w-full ">
                    {cart.map((c) => (
                      <>
                        <div
                          className="w-full bg-white/5 h-[110px] backdrop-blur-lg rounded-xl cursor-pointer p-4 flex  "
                          key={c.courseId}
                        >
                          <div className="flex w-full">
                            <div className="w-[25%] overflow-hidden">
                              <Image
                                className="rounded-xl"
                                src={c.imageUrl}
                                width={100}
                                height={100}
                                alt="hel"
                              />
                            </div>

                            <div
                              className="gap-1 flex flex-col w-[60%] truncate py-2 "
                              onClick={() =>
                                router.push(`/course/${c.courseId}`)
                              }
                            >
                              <h3 className="text-[18px] text-white">
                                {c.title}
                              </h3>
                              <h3 className="text-[14px] text-white/60">
                                ₹ {c.price}
                              </h3>
                            </div>
                            <div className="flex items-center justify-center">
                              <div className="border border-slate-400 flex justify-center items-center  rounded-2xl h-[60px] w-[60px]">
                                <X
                                  size={24}
                                  className="text-white/60"
                                  onClick={() => deleteCart(c.courseId)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>
          </div>
        )}
      </div>
      <CartFooter cartValue={cartValue} totalValue={totalValue} />
    </>
  );
}
