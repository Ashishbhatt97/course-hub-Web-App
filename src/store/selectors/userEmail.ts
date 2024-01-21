import { selector } from "recoil";
import { UserObject } from "../atoms/UserAtom";

export const userEmail = selector({
  key: "uniqueUserEmailState",
  get: ({ get }) => {
    const user = get(UserObject);
    return user.userEmail;
  },
});
