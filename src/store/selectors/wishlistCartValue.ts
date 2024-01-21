import { selector } from "recoil";
import { wishlistAtom } from "../atoms/wishlistAtom";

export const wishlistCartValue = selector({
  key: "wishlistCartValue",
  get: ({ get }) => {
    const cartData = get(wishlistAtom);
    return cartData.length;
  },
});
