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
import { AdminEmailAtom } from "@/store/atoms/AdminEmailAtom";
import { CourseObjAtom } from "@/store/atoms/CourseObjAtom";
import EditCourseForm from "@/components/EditCourse";

export default function Page() {
  const router = useRouter();
  const courseId = router.query.id;
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>({});
  const [prevcourse, setPrevcourse] = useState({});
  const setUser = useSetRecoilState(userObjAtom);
  const userEmailState = useRecoilValue(userEmail);
  const adminEmailState = useRecoilValue(AdminEmailAtom);
  const setWishlistCart = useSetRecoilState(wishlistAtom);
  const setCourseObjAtom = useSetRecoilState(CourseObjAtom);
  const [courseValue, setCourseValue] = useState<number>(0);

  const CheckoutHandler = async () => {
    if (userEmailState) {
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
    } else {
      router.push("/login");
    }
  };

  const addtoCartHandle = async () => {
    setLoading(true);

    if (userEmailState) {
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
    } else {
      router.push("/login");
    }
  };

  const deleteCourseHandle = async () => {
    setLoading(true);
    const res = await axios.delete(`/api/admin/delete-course`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      data: {
        courseId: courseId,
      },
    });

    if (res) {
      if (res.data.Courses) {
        setCourseObjAtom(res.data.Courses);
      }
      if (res.data.message) {
        toast({
          variant: "ordinary",
          description: res.data.message,
        });
      }
    }
    setLoading(false);
    router.push("/courses");
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
                    <h3 className="lg:h-[26vh] w-full h-1/2 text-white/70 line-clamp-1">
                      {course.courseDescription}
                    </h3>

                    <h3 className="text-stone-500 flex gap-1 mt-5">
                      Instructor:
                      <span className="text-white">
                        {course.instructorName}
                      </span>
                    </h3>

                    <h3 className="text-stone-500 flex gap-1">
                      price:
                      <span className="text-white">₹ {course.price}</span>
                    </h3>

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

                    <>
                      {adminEmailState && (
                        <Button
                          variant={"ordinary"}
                          className="text-black w-[151px] border-black/80"
                          onClick={deleteCourseHandle}
                        >
                          Delete this Course
                        </Button>
                      )}
                    </>
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

                {adminEmailState && (
                  <div className=" bg-slate-700/20 rounded-2xl lg:py-6 pb-10 sm:pb-0  flex flex-col gap-5 sm:gap-0  items-center justify-center">
                    <h2 className="text-white text-center mt-8 lg:mt-0 bg-clip-text w-full lg:text-[75px] text-[30px] font-extrabold ">
                      EDIT COURSE
                    </h2>

                    <div className="flex items-center justify-center">
                      <EditCourseForm />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
