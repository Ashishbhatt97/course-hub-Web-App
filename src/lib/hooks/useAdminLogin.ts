import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";

type loginFormatType = {
  email: string;
  password: string;
};

export function useAdminLogin() {
  const router = useRouter();
  const initialLoginFormat = {};
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
        setLoginFormat(initialLoginFormat);
      }
    } catch (error) {
      console.error("Error submitting sign up form:", error);
    }
    setLoginFormat(initialLoginFormat);
  };
  return { handleAdminLoginSubmit };
}
