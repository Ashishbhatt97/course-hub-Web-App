import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";
import { useSetRecoilState } from "recoil";
import { adminObj } from "@/store/atoms/AdminObj";

type signUpFormat = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const useAdminSignup = () => {
  const initialSignUpFormat = {};
  const [signUpFormat, setSignUpFormat] = useState(initialSignUpFormat);
  const setAdminObjAtom = useSetRecoilState(adminObj);
  const router = useRouter();

  const handleAdminSignUpSubmit = async (signUpFormat: signUpFormat) => {
    try {
      const response = await axios.post(
        `/api/admin/admin-signup`,
        signUpFormat,
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
          description: `${response.data.firstName} Admin Created Successfully`,
        });
        router.push("/admin/login");
      }
      setAdminObjAtom(response.data.Admin);
      setSignUpFormat(initialSignUpFormat);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAdminSignUpSubmit, setSignUpFormat };
};

export default useAdminSignup;
