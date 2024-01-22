import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Loader from "@/components/Loader";
import { userObjAtom } from "@/store/atoms/UserObjAtom";
import route from "../api/create-payment";
import { userEmail } from "@/store/selectors/userEmail";
import { useRecoilValue } from "recoil";
import FeedbackForm from "@/components/Feedback";

export default function Page() {
  const router = useRouter();
  const courseId = router.query.id;

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>({});
  const [prevcourse, setPrevcourse] = useState({});
  const email = useRecoilValue(userEmail);

  useEffect(() => {
    if (email === null) {
      router.push("/login");
    }

    setLoading(true);
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
    <div className="w-full flex lg:pt-[180px] pt-[90px] justify-center items-center text-white/90 h-[calc(100vh-120px)] flex-col bg-slate-950">
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            {course && (
              <div className="w-full h-full lg:px-20 lg:gap-4 flex flex-col mt-7 lg:mt-[20px] p-3 lg:p-0">
                <div className="w-full h-full flex flex-col justify-center ">
                  <div className="">
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
                </div>
                <div className=" bg-slate-700/20 rounded-2xl lg:py-6 pb-10 sm:pb-0  flex flex-col gap-5 sm:gap-0  items-center justify-center">
                  <h2 className="text-white text-center mt-8 lg:mt-0 bg-clip-text w-full lg:text-[75px] text-[30px] font-extrabold ">
                    FEEDBACK FORM
                  </h2>
                  <div className="flex items-center justify-center">
                    <FeedbackForm />
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
