import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import tick from "../../public/tick.svg";
import { Button } from "@/components/ui/button";

const Success: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push("/purchasedcourses");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className=" pt-[80px] h-[100vh] w-full flex items-center justify-center ">
      <div className="h-[450px] w-[450px] p-5 bg-white/10 backdrop-blur-lg rounded-2xl text-white text-center flex flex-col items-center">
        <Image src={tick} alt="" width={200} height={200} />
        <h1 className="font-extrabold text-xl mt-2">
          Thank you for your purchase!
        </h1>
        <p className="text-white/40">Your transaction was successful.</p>
        <p className="text-white/40">
          You will be redirected to your purchased courses shortly. If not,
          click the button below.
        </p>
        <Button variant="ordinary" className="mt-4">
          Click Here
        </Button>
      </div>
    </div>
  );
};

export default Success;
