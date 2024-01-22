import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";

type signUpFormat = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const useAdminSignup = () => {
  const initialSignUpFormat = {};
  const [signUpFormat, setSignUpFormat] = useState(initialSignUpFormat);
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
          title: `${response.data.errorMessage}`,
        });
      } else {
        toast({
          variant: "ordinary",
          description: `${response.data.firstName} Admin Created Successfully`,
        });
        router.push("/admin/login");
      }
      setSignUpFormat(initialSignUpFormat);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAdminSignUpSubmit , setSignUpFormat };
};

export default useAdminSignup;
