import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userEmail } from "@/store/selectors/userEmail";
import v2 from "../../../public/i2.jpg";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";
import { userObjAtom } from "@/store/atoms/UserObjAtom";
import { toast } from "@/components/ui/use-toast";

export default function Page() {
  const router = useRouter();
  const courseId = router.query.id;
  const userEmailState = useRecoilValue(userEmail);

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>({});
  const [prevcourse, setPrevcourse] = useState({});
  const setWishlistCart = useSetRecoilState(wishlistAtom);
  const [user, setUser] = useRecoilState(userObjAtom);

  const addtoCartHandle = async () => {
    const res = await axios.post(
      `/api/user/add-wishlist`,
      { courseId: courseId },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

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
    const getCourse = async () => {
      try {
        const link = `/api/admin/admin-getcourse`;
        const response = await axios.get(link, {
          params: { courseId: courseId },
        });

        setCourse(response.data.course);
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
    <div className="w-full flex pt-[80px] justify-center items-center text-white/90 h-[100vh] flex-col bg-slate-950">
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {course && (
              <div className="w-full h-full px-20 gap-4 flex flex-col mt-[20px]">
                <div>
                  <h2 className="text-[55px] font-extrabold tracking-wide">
                    {course.title}
                  </h2>
                </div>
                <div className="flex">
                  <div className="w-1/2 h-[calc(100vh-210px)] gap-4 flex flex-col">
                    <h3 className="text-stone-500">description:</h3>
                    <div className="h-[25vh] text-white/70 text-pretty truncate text-ellipsis ">
                      {course.courseDescription}
                    </div>
                    <h3 className="text-stone-500">
                      Instructor:{" "}
                      <span className="text-white">
                        {course.instructorName}
                      </span>
                    </h3>

                    {userEmailState && (
                      <div className="gap-3 flex ">
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
                          onClick={addtoCartHandle}
                        >
                          Buy Now
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="w-1/2 h-[calc(100vh-210px)] pl-[90px] flex items-start justify-center">
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
