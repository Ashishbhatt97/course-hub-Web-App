import Card from "@/components/Card";
import Form from "@/components/Form";
import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";

const SignUp = () => {
  return (
    <div className="h-[calc(100vh-80px)] w-full pt-[80px] flex  items-center justify-center">
      <div className="w-1/2 ">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600  w-full text-[75px] font-extrabold ">
          User SignUp
        </h1>
      </div>

      <div className="flex w-1/5 rounded-xl ">
        <div className="w-full h-full  flex items-center justify-end">
          <Card className="w-[480px] h-[550px]">
            <div className="flex w-full items-center justify-center mt-5 ">
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
