"use client";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import { UserObject } from "@/store/atoms/UserAtom";
import { userObjAtom } from "@/store/atoms/UserObjAtom";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";
import { CourseObjAtom } from "@/store/atoms/CourseObjAtom";
import { userEmail } from "@/store/selectors/userEmail";
import { FeedbackAtom } from "@/store/atoms/feedbacksAtom";
import { adminObj } from "@/store/atoms/AdminObj";
import { AdminEmailAtom } from "@/store/atoms/AdminEmailAtom";

const ValidatingComponent = () => {
  const userEmailValue = useRecoilValue(userEmail);
  const setUserAtom = useSetRecoilState(userObjAtom);
  const setAdminObjAtom = useSetRecoilState(adminObj);
  const setUserObject = useSetRecoilState(UserObject);
  const setFeedbacks = useSetRecoilState(FeedbackAtom);
  const setAdminEmail = useSetRecoilState(AdminEmailAtom);
  const setWishlistCart = useSetRecoilState(wishlistAtom);
  const setCourseObjAtom = useSetRecoilState(CourseObjAtom);

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

    const getAdminLoginStatus = async () => {
      try {
        const res = await axios.get("/api/admin/adminloginstatus", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
          },
        });
        const adminObjData = res.data.adminData;
        if (adminObjData) {
          setAdminObjAtom(res.data.adminData);
          setAdminEmail(adminObjData.email);
          setUserAtom(adminObjData);
        }

        if (!adminObjData) {
          setAdminObjAtom({});
        }
      } catch (error) {
        if (error) {
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

    const getFeedbacks = async () => {
      const response = await axios.get("/api/get-feedbacks", {});
      setFeedbacks(response.data.feedbacks);
    };

    getCourses();
    getFeedbacks();
    getUserValidation();
    getAdminLoginStatus();
  }, []);

  return <></>;
};

export default ValidatingComponent;
