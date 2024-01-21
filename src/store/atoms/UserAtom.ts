import { atom } from "recoil";

export const UserObject = atom({
  key: "uniqueUserObjectState",
  default: {
    isUserLoading: true,
    userEmail: null,
  },
});
