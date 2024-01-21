import Card from "@/components/Card";
import Form from "@/components/Form";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";

const SignUp = () => {
  return (
    <div className="lg:h-[calc(100vh-80px)] h-full w-full lg:pt-[80px] pt-[90px] flex flex-col lg:flex-row items-center justify-center">
      <div className="lg:w-1/2w-full text-center h-full flex items-center">
        <h1 className="text-transparent mt-8 lg:mt-0 bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600  w-full lg:text-[75px] text-[55px] text-center lg:text-left font-extrabold">
          User SignUp
        </h1>
      </div>

      <div className="w-1/2 h-full flex rounded-xl">
        <div className="w-full h-full flex items-center justify-center">
          <Card className="lg:w-[480px] lg:h-[550px] w-[380px] h-fit py-5">
            <div className="flex w-full items-center justify-center mt-5">
              <Image src={logo} height={80} width={80} alt="logo"></Image>
            </div>
            <Form />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
