import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import logo from "../../public/logo.png";

import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { wishlistAtom } from "@/store/atoms/wishlistAtom";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OaCAmSI8FJKhVHQ3mbbqh2vOUh0oeOs1cpwYMlp1FG20BBtZS8w00s7Hvu6nl1PUrA930GLVNGrHraKyWwkQPyn00rgI2X0ij"
);

const CheckoutForm = () => {
  const setWishlistCart = useSetRecoilState(wishlistAtom);
  const cart = useRecoilValue(wishlistAtom);

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState<Boolean>(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      router.push("/404");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setIsProcessing(false);
      setWishlistCart([]);

      await axios.get("/api/user/empty-wishlist", {
        headers: {
          Authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      });

      const res = await axios.post(
        "/api/user/buy-course",
        { courses: cart },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (res) {
        router.push("/success");
        console.log(res.data);
      }
    }

    if (error) {
      setIsProcessing(false);
    }

    setIsProcessing(false);
  };

  return (
    <div className=" h-full pt-[50px] w-[550px] px-8 rounded-2xl bg-gradient-to-tr bg-white from-blue-200/50 via-white/15 to-blue-100 ">
      <div className=" flex items-center justify-center w-full">
        <Image
          className="cursor-pointer"
          onClick={() => router.push("/")}
          src={logo}
          alt="logo"
          height={100}
          width={100}
        />
      </div>

      <form onSubmit={submitHandler} className="gap-5 flex flex-col ">
        <PaymentElement />
        <Button
          className="min-w-full bg-green-500 hover:text-black text-white hover:border hover:border-green-500"
          variant={"ordinary"}
        >
          {isProcessing ? "processing..." : "Pay"}
        </Button>
      </form>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: `${localStorage.getItem("clientSecret")}`,
      }}
    >
      <div className="h-[calc(100vh-80px)] w-full pt-[80px] flex justify-center items-center ">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default Checkout;
