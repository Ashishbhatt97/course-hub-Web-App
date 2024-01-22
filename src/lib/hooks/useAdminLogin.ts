import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { toast } from "@/components/ui/use-toast";
import { UserObject } from "@/store/atoms/UserAtom";
import { userObjAtom } from "@/store/atoms/UserObjAtom";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";

type loginFormatType = {
  email: string;
  password: string;
};

export function useLogin() {
  const router = useRouter();
  const initialLoginFormat = {};
  const setUserObj = useSetRecoilState(UserObject);
  const setUserObjAtom = useSetRecoilState(userObjAtom);
  const setWishlistCart = useSetRecoilState(wishlistAtom);
  const [loginFormat, setLoginFormat] = useState(initialLoginFormat);

  const handleAdminLoginSubmit = async (loginFormat: loginFormatType) => {
    try {
      const response = await axios.post(
        `/api/admin/admin-login`,
        loginFormat,
        {}
      );

      if (response.data.errorMessage) {
        toast({
          variant: "ordinary",
          description: `${response.data.errorMessage}`,
        });
      } else {
        toast({
          variant: "ordinary",
          description: `${response.data.userData.firstName} Admin is Logged In Successfully`,
        });
        router.push("/");
        localStorage.setItem("adminToken", response.data.token);
        // setLoginFormat(initialLoginFormat);

        // setUserObj({
        //   isUserLoading: false,
        //   userEmail: response.data.userData.email,
        // });

        // setUserObjAtom(response.data.userData);
        // setWishlistCart(response.data.userData.wishlist);
      }
    } catch (error) {
      console.error("Error submitting sign up form:", error);
    }
    setLoginFormat(initialLoginFormat);
  };
  return { handleAdminLoginSubmit };
}
