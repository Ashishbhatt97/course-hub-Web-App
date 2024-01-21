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



  return (
    <>
      {cartValue !== 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white/5 backdrop-blur-lg p-4">
          <div className="flex items-center justify-between lg:px-[180px]">
            <h1 className="text-white bg-clip-text bg-red-500 lg:text-[35px] lg:font-extrabold font-medium">
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
