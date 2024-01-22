import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { UserObject } from "@/store/atoms/UserAtom";
import { userObjAtom } from "@/store/atoms/UserObjAtom";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";
import { CourseObjAtom } from "@/store/atoms/CourseObjAtom";
import { userEmail } from "@/store/selectors/userEmail";

const ValidatingComponent = () => {
  const setUserObject = useSetRecoilState(UserObject);
  const setWishlistCart = useSetRecoilState(wishlistAtom);
  const setUserAtom = useSetRecoilState(userObjAtom);
  const setCourseObjAtom = useSetRecoilState(CourseObjAtom);
  const userEmailValue = useRecoilValue(userEmail);

  useEffect(() => {
    const getUserValidation = async () => {
      try {
        const res = await axios.get("/api/user/userloginstatus", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken") || ""} `,
          },
        });
        const email = res.data.userData.email;
        const wishlistData = res.data.userData.wishlist;
        const userObjData = res.data.userData;

        if (userObjData && wishlistData && email) {
          setUserObject({
            userEmail: email,
            isUserLoading: false,
          });
          setUserAtom(userObjData);
          setWishlistCart(wishlistData);
        }

        if (!userObjData && !wishlistData && !email) {
          setUserAtom({});
          setWishlistCart([]);

          setUserObject({
            userEmail: null,
            isUserLoading: true,
          });
        }
      } catch (error) {
        if (error) {
          setUserObject({
            userEmail: null,
            isUserLoading: true,
          });
          setWishlistCart([]);
        }
      }
    };

    const getCourses = async () => {
      try {
        let response;

        if (userEmailValue === null) {
          response = await axios.get("/api/admin/get-courses", {});
        } else {
          response = await axios.get("/api/user/show-unpurchased", {
            headers: {
              Authorization: `bearer ${
                localStorage.getItem("userToken") || ""
              }`,
            },
          });
        }
        setCourseObjAtom(response.data.courses);
      } catch (error) {
        console.log(error);
      }
    };
    getUserValidation();
    getCourses();
  }, [userEmailValue]);

  return <></>;
};

export default ValidatingComponent;
