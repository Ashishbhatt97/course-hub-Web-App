import { selector } from "recoil";
import { UserObject } from "../atoms/UserAtom";

export const userLoading = selector({
  key: "uniqueUserLoadingState",
  get: ({ get }) => {
    const userLoadingState = get(UserObject);
    return userLoadingState.isUserLoading;
  },
});
