import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userEmail } from "@/store/selectors/userEmail";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";
import { userObjAtom } from "@/store/atoms/UserObjAtom";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

export default function Page() {
  const router = useRouter();
  const courseId = router.query.id;
  const userEmailState = useRecoilValue(userEmail);

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>({});
  const [prevcourse, setPrevcourse] = useState({});
  const setWishlistCart = useSetRecoilState(wishlistAtom);
  const setUser = useSetRecoilState(userObjAtom);
  const [courseValue, setCourseValue] = useState<number>(0);

  const CheckoutHandler = async () => {
    try {
      const res = await axios.post(
        "/api/checkout",
        { amount: courseValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (res) {
        const { clientSecret: clientSecret } = res.data;
        console.log(res.data);
        localStorage.setItem("clientSecret", clientSecret);
        router.push("/checkout");
      }
    } catch (error) {
      toast({ variant: "ordinary", description: "Something Went Wrong" });
    }
  };

  const addtoCartHandle = async () => {
    setLoading(true);
    const res = await axios.post(
      `/api/user/add-wishlist`,
      { courseId: courseId },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    setLoading(false);
    if (res) {
      if (res.data.user) {
        setUser(res.data.user);
        setWishlistCart(res.data.user.wishlist);
      }
      if (res.data.message) {
        toast({
          variant: "ordinary",
          description: res.data.message,
        });
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const getCourse = async () => {
      try {
        const link = `/api/admin/admin-getcourse`;
        const response = await axios.get(link, {
          params: { courseId: courseId },
        });

        setCourse(response.data.course);
        setCourseValue(response.data.course.price);
        setPrevcourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
        setLoading(false);
      }
    };

    getCourse();
  }, [courseId]);

  return (
    <div className="w-full flex lg:pt-[80px] pt-[90px] justify-center items-center text-white/90 h-[100vh] flex-col bg-slate-950">
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {course && (
              <div className="w-full h-full lg:px-20 lg:gap-4 flex flex-col mt-7 lg:mt-[20px] p-3 lg:p-0">
                <div>
                  <h2 className="lg:text-[55px] md:text-[35px] sm:text-[30px] text-[26px] font-extrabold tracking-wide">
                    {course.title}
                  </h2>
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-2">
                  <div className="lg:w-1/2 h-[calc(100vh-210px)] lg:gap-4 flex flex-col">
                    <h3 className="text-stone-500">Description:</h3>
                    <div className="lg:h-[26vh] w-full h-1/2 text-white/70 line-clamp-1">
                      {course.courseDescription}
                    </div>
                    <h3 className="text-stone-500 flex gap-1 mt-5">
                      Instructor:
                      <span className="text-white">
                        {course.instructorName}
                      </span>
                    </h3>

                    {userEmailState && (
                      <div className="gap-3 flex w-full items-center justify-center md:justify-normal mt-6 md:mt-0 ">
                        <Button
                          variant={"ordinary"}
                          className="text-black w-[151px]  border-black/80"
                          onClick={addtoCartHandle}
                        >
                          Add to Cart
                        </Button>

                        <Button
                          variant={"ordinary"}
                          className="text-black w-[151px] border-black/80"
                          onClick={CheckoutHandler}
                        >
                          Buy Now
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="lg:w-1/2 w-full p-5 lg:h-[calc(100vh-210px)] lg:pl-[90px] flex items-center lg:items-start lg:justify-center">
                    <Image
                      src={course.imageUrl}
                      width={500}
                      height={500}
                      alt=""
                      className=" rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
