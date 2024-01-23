import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";
import { useSetRecoilState } from "recoil";
import { adminObj } from "@/store/atoms/AdminObj";
import { AdminEmailAtom } from "@/store/atoms/AdminEmailAtom";

type loginFormatType = {
  email: string;
  password: string;
};

export function useAdminLogin() {
  const router = useRouter();
  const initialLoginFormat = {};
  const [loginFormat, setLoginFormat] = useState(initialLoginFormat);
  const setAdminObjAtom = useSetRecoilState(adminObj);
  const setAdminEmailAtom = useSetRecoilState(AdminEmailAtom);

  const handleAdminLoginSubmit = async (loginFormat: loginFormatType) => {
    try {
      const response = await axios.post(
        `/api/admin/admin-login`,
        loginFormat,
        {}
      );
      console.log(response.data);

      if (response.data.errorMessage) {
        toast({
          variant: "ordinary",
          description: `${response.data.errorMessage}`,
        });
      } else {
        toast({
          variant: "ordinary",
          description: `${response.data.admin.firstName} Admin is Logged In Successfully`,
        });
        localStorage.setItem("adminToken", response.data.token);
        setAdminObjAtom(response.data.admin);
        setAdminEmailAtom(response.data.admin.email);
        setLoginFormat(initialLoginFormat);
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting sign up form:", error);
    }
    setLoginFormat(initialLoginFormat);
  };
  return { handleAdminLoginSubmit };
}
