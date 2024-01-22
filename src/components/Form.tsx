import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import useSignUp from "@/lib/hooks/useUserSignup";
import { useLogin } from "@/lib/hooks/useUserLogin";

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
  console.log(pathname);

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

  const { handleSignUpSubmit } = useSignUp();
  const { handleLoginSubmit } = useLogin();
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

  const signUpSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleSignUpSubmit(signUpFormat);
  };

  const loginSubmitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(initialLoginFormat);
    handleLoginSubmit(loginFormat);
  };
  return (
    <form>
      <div className="gap-9 flex flex-col p-12">
        {pathname === "/signup" && (
          <div className="flex gap-3 overflow-hidden">
            <div className="flex flex-col w-[160px]">
              <label className="text-[#d0d0d2]" htmlFor="firstName">
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
              <label className="text-[#d6d6d6]">Last Name:</label>
              <input
                className="bg-transparent outline-none text-[#dadada] border-b border-[#dadada] focus:border-white transition duration-300 ease-in-out"
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
          <label className="text-[#c1c1c3]" htmlFor="email">
            Email:
          </label>
          <input
            className="bg-transparent outline-none text-[#dadada] border-b border-[#dadada] focus:border-white transition duration-300 ease-in-out"
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
          <label className="text-[#b9b9bb]" htmlFor="password">
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
              variant={"extraOrdinary"}
              className="lg:w-[400px] w-[290px] h-[50px]"
              type="submit"
              onClick={signUpSubmitHandler}
            >
              Create Account
            </Button>
          ) : (
            <Button
              variant={"extraOrdinary"}
              className="lg:w-[400px] w-[290px] h-[50px]"
              type="submit"
              onClick={loginSubmitHandler}
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
