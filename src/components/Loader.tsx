import React from "react";
import loader from "../../public/loader.svg";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="h-[calc(100vh-80px)] pt-[80px] w-full flex items-center justify-center">
      <Image src={loader} alt="" />
    </div>
  );
};

export default Loader;
