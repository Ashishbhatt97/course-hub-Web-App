import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "./ui/use-toast";

type CartFooterProps = {
  cartValue: number;
  totalValue: number;
};

const CartFooter: React.FC<CartFooterProps> = ({ cartValue, totalValue }) => {
  const router = useRouter();

  const CheckoutHandler = async () => {
    try {
      const res = await axios.post(
        "/api/checkout",
        { amount: totalValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      if (res) {
        const { clientSecret: clientSecret } = res.data;
        console.log(res.data);
        localStorage.setItem("clientSecret", clientSecret);
        router.push("/checkout");
      }
    } catch (error) {
      toast({ variant: "ordinary", description: "Something Went Wrong" });
    }
  };

  return (
    <>
      {cartValue !== 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white/5 backdrop-blur-lg p-4">
          <div className="flex items-center justify-between px-[180px]">
            <h1 className="text-white bg-clip-text bg-red-500 text-[35px] font-extrabold">
              Cart Value : &nbsp;
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                ₹{totalValue}
              </span>
            </h1>
            <button
              onClick={CheckoutHandler}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartFooter;
