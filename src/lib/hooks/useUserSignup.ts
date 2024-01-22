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

const useSignUp = () => {
  const initialSignUpFormat = {};
  const [signUpFormat, setSignUpFormat] = useState(initialSignUpFormat);
  const router = useRouter();

  const handleSignUpSubmit = async (signUpFormat: signUpFormat) => {
    try {
      const response = await axios.post(
        `/api/user/user-signup`,
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
          description: `${response.data.firstName} Signed Up Successfully`,
        });
        router.push("/login");
      }
      setSignUpFormat(initialSignUpFormat);
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSignUpSubmit };
};

export default useSignUp;
