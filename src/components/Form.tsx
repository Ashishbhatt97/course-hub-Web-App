import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { UserObject } from "@/store/atoms/UserAtom";
import { toast } from "./ui/use-toast";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";
import { userObjAtom } from "@/store/atoms/UserObjAtom";

export type user = {
  _id: "";
  firstName: "";
  lastName: "";
  email: "";
  password: "";
  userId: 0;
  purchasedCourse: [];
  wishlist: [];
  __v: 0;
};

const Form = () => {
  const router = useRouter();
  const pathname = usePathname();

  const setUserObj = useSetRecoilState(UserObject);
  const setUserObjAtom = useSetRecoilState(userObjAtom);
  const setWishlistCart = useSetRecoilState(wishlistAtom);

  const initialSignUpFormat = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const initialLoginFormat = {
    email: "",
    password: "",
  };

  const [signUpFormat, setSignUpFormat] = useState(initialSignUpFormat);
  const [loginFormat, setLoginFormat] = useState(initialLoginFormat);

  const handleSignupChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setSignUpFormat((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setLoginFormat((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/user/user-signup`,
        signUpFormat,
        {}
      );

      toast({
        variant: "ordinary",
        title: `${response.data.firstName} Signed Up Successfully`,
      });

      setSignUpFormat(initialSignUpFormat);
    } catch (error) {
      console.log(error);
    }
    setSignUpFormat(initialSignUpFormat);
  };

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/api/user/user-login`,
        loginFormat,
        {}
      );

      if (response) {
        toast({
          variant: "ordinary",
          description: `${response.data.userData.firstName} is Logged In Successfully`,
        });

        router.push("/");
        localStorage.setItem("userToken", response.data.token);

        setLoginFormat(initialLoginFormat);

        setUserObj({
          isUserLoading: false,
          userEmail: response.data.userData.email,
        });

        setUserObjAtom(response.data.userData);
        setWishlistCart(response.data.userData.wishlist);
      }
    } catch (error) {
      console.error("Error submitting sign up form:", error);
    }
    setLoginFormat(initialLoginFormat);
  };

  return (
    <form>
      <div className="gap-9 flex flex-col p-12 ">
        {pathname === "/signup" && (
          <div className="flex gap-3 overflow-hidden">
            <div className="flex flex-col w-[160px]">
              <label className="text-[#828283]" htmlFor="firstName">
                First Name:
              </label>
              <input
                className="bg-transparent outline-none text-[#dadada] border-b-2 border-[#dadada] focus:border-white transition duration-300 ease-in-out"
                type="text"
                id="firstName"
                name="firstName"
                value={signUpFormat.firstName}
                onChange={handleSignupChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#828283]">Last Name:</label>
              <input
                className="bg-transparent outline-none text-[#dadada] border-b-2 border-[#dadada] focus:border-white transition duration-300 ease-in-out"
                type="text"
                id="lastName"
                name="lastName"
                value={signUpFormat.lastName}
                onChange={handleSignupChange}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-[#828283]" htmlFor="email">
            Email:
          </label>
          <input
            className="bg-transparent outline-none text-[#dadada] border-b-2 border-[#dadada] focus:border-white transition duration-300 ease-in-out"
            type="email"
            id="email"
            name="email"
            value={
              pathname === "/signup" ? signUpFormat.email : loginFormat.email
            }
            onChange={
              pathname === "/signup" ? handleSignupChange : handleLoginChange
            }
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[#828283]" htmlFor="password">
            Password:
          </label>
          <input
            className="bg-transparent outline-none text-[#dadada] border-b-2 border-[#dadada] focus:border-white transition duration-300 ease-in-out"
            type="password"
            id="password"
            name="password"
            value={
              pathname === "/signup"
                ? signUpFormat.password
                : loginFormat.password
            }
            onChange={
              pathname === "/signup" ? handleSignupChange : handleLoginChange
            }
          />
        </div>

        <div className="justify-center items-center flex flex-col gap-3">
          {pathname === "/signup" ? (
            <Button
              variant={"ordinary"}
              className="w-[380px] h-[50px]"
              type="submit"
              onClick={handleSignUpSubmit}
            >
              Create Account
            </Button>
          ) : (
            <Button
              variant={"ordinary"}
              className="w-[360px] h-[50px]"
              type="submit"
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
          )}
          <h2 className="text-white -mb-10">
            {pathname === "/signup"
              ? "Already Have an Account? "
              : "Don't Have an Account? "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold cursor-pointer"
              onClick={() =>
                router.push(pathname === "/signup" ? "/login" : "/signup")
              }
            >
              Click Here
            </span>
          </h2>
        </div>
      </div>
    </form>
  );
};

export default Form;
