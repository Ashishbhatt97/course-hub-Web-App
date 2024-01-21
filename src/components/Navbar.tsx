// import Image from "next/image";
// import logo from "../../public/logo.png";
// import { AlignRight, ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { userEmail } from "@/store/selectors/userEmail";
// import { UserObject } from "@/store/atoms/UserAtom";
// import { toast } from "./ui/use-toast";
// import { wishlistCartValue } from "@/store/selectors/wishlistCartValue";

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const wishlistCart = useRecoilValue(wishlistCartValue);
//   const userEmailSelector = useRecoilValue(userEmail);
//   const setUserObject = useSetRecoilState(UserObject);
//   const [sideNav, setSideNav] = useState<Boolean>(false);

//   useEffect(() => {
//     const userToken = localStorage.getItem("userToken");
//   }, []);

//   const logOutHandle = () => {
//     localStorage.setItem("userToken", "");
//     setUserObject({
//       userEmail: null,
//       isUserLoading: true,
//     });

//     toast({
//       variant: "destructive",
//       description: `User Logged Out Successfully`,
//     });
//   };

//   return (
//     <>
//       <div className="lg:h-[80px] z-50 flex w-full bg-white/5 backdrop-blur-lg fixed ">
//         <div className="h-full w-[30%] flex items-center justify-center ">
//           <Image
//             className="cursor-pointer mt-2"
//             onClick={() => router.push("/")}
//             src={logo}
//             alt="logo"
//             height={50}
//             width={50}
//           />
//         </div>
//         <div className="h-full w-[50%] justify-center font-regular ">
//           <ol className="flex gap-14">
//             <ul
//               className={` transition tracking-wider duration-300 ease-in-out text-gray-400 cursor-pointer hover:text-white ${
//                 pathname == "/" ? "text-white" : "font-medium"
//               }`}
//               onClick={() => router.push("/")}
//             >
//               Home
//             </ul>
//             <ul
//               className={`active:text-bold text-gray-400 tracking-wider transition duration-300 ease-in-out cursor-pointer hover:text-white ${
//                 pathname == "/courses" ? "text-white" : "font-medium"
//               }`}
//               onClick={() => {
//                 router.push("/courses");
//               }}
//             >
//               Courses
//             </ul>
//             {userEmailSelector && (
//               <ul
//                 className={`active:text-bold text-gray-400  transition tracking-wider duration-300 ease-in-out cursor-pointer hover:text-white ${
//                   pathname == "/purchasedcourses" ? "text-white" : "font-medium"
//                 }`}
//                 onClick={() => router.push("/purchasedcourses")}
//               >
//                 Purchased Courses
//               </ul>
//             )}
//           </ol>
//         </div>
//         <div className="h-full w-[30%]  flex items-center justify-end gap-9 pr-32 ">
//           {userEmailSelector && (
//             <div className="relative cursor-pointer">
//               <div className="absolute bg-black left-3 bottom-2 rounded-full w-[20px] h-[20px] text-white flex items-center justify-center text-[12px] font-[poppins]">
//                 {wishlistCart}
//               </div>
//               <ShoppingCart
//                 onClick={() => router.push("/cart")}
//                 className="text-white"
//                 size={25}
//               />
//             </div>
//           )}

//           {!userEmailSelector && (
//             <h2
//               className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold cursor-pointer"
//               onClick={() => {
//                 router.push("/login");
//               }}
//             >
//               Login
//             </h2>
//           )}

//           {!userEmailSelector ? (
//             <Button variant={"ordinary"} onClick={() => router.push("/signup")}>
//               Sign Up
//             </Button>
//           ) : (
//             <Button variant={"ordinary"} onClick={logOutHandle}>
//               Log Out
//             </Button>
//           )}
//           <AlignRight
//             className="text-gray-400 transition duration-300 ease-in-out hover:text-white cursor-pointer sm:block  md:hidden lg:hidden xl:hidden 2xl:hidden"
//             size={30}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

import Image from "next/image";
import logo from "../../public/logo.png";
import { AlignRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userEmail } from "@/store/selectors/userEmail";
import { UserObject } from "@/store/atoms/UserAtom";
import { toast } from "./ui/use-toast";
import { wishlistCartValue } from "@/store/selectors/wishlistCartValue";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const wishlistCart = useRecoilValue(wishlistCartValue);
  const userEmailSelector = useRecoilValue(userEmail);
  const setUserObject = useSetRecoilState(UserObject);
  const [sideNav, setSideNav] = useState<Boolean>(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
  }, []);

  const logOutHandle = () => {
    localStorage.setItem("userToken", "");
    setUserObject({
      userEmail: null,
      isUserLoading: true,
    });
    setSideNav(!sideNav);
    router.push("/login");
    toast({
      variant: "destructive",
      description: `User Logged Out Successfully`,
    });
  };

  return (
    <>
      <div className="md:h-[80px] h-[90px] z-50 flex w-full bg-white/5 backdrop-blur-2xl fixed">
        <div className="h-full md:w-[30%] w-[50%] flex items-center md:justify-center pl-[40px]">
          <Image
            className="cursor-pointer mt-2"
            onClick={() => router.push("/")}
            src={logo}
            alt="logo"
            height={50}
            width={50}
          />
        </div>
        <div className="h-full w-[50%] lg:text-[18px] md:text-[14px]  md:items-center md:justify-center font-regular hidden md:flex">
          <ol className="flex gap-14">
            <ul
              className={`transition tracking-wider duration-300 ease-in-out text-gray-400 cursor-pointer hover:text-white ${
                pathname == "/" ? "text-white" : "font-medium"
              }`}
              onClick={() => router.push("/")}
            >
              Home
            </ul>
            <ul
              className={`transition tracking-wider duration-300 ease-in-out cursor-pointer text-gray-400 hover:text-white ${
                pathname == "/courses" ? "text-white" : "font-medium"
              }`}
              onClick={() => router.push("/courses")}
            >
              Courses
            </ul>
            {userEmailSelector && (
              <ul
                className={`transition tracking-wider duration-300 ease-in-out cursor-pointer text-gray-400 hover:text-white ${
                  pathname == "/purchasedcourses" ? "text-white" : "font-medium"
                }`}
                onClick={() => router.push("/purchasedcourses")}
              >
                Purchased Courses
              </ul>
            )}
          </ol>
        </div>
        <div className="h-full md:w-[30%] w-[50%] justify-end pr-[30px] md:pr-0 flex items-center md:justify-center gap-9 ">
          {/* Mobile Hamburger Menu */}

          {userEmailSelector && (
            <div className="relative cursor-pointer">
              <div className="absolute bg-black left-3 bottom-2 rounded-full w-[20px] h-[20px] text-white flex items-center justify-center text-[12px] font-[poppins]">
                {wishlistCart}
              </div>
              <ShoppingCart
                onClick={() => router.push("/cart")}
                className="text-white"
                size={25}
              />
            </div>
          )}

          {!userEmailSelector && (
            <h2
              className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold cursor-pointer hidden md:block"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </h2>
          )}

          <AlignRight
            className="text-gray-400 transition duration-300 ease-in-out hover:text-white cursor-pointer md:hidden"
            size={30}
            onClick={() => setSideNav(!sideNav)}
          />

          {!userEmailSelector ? (
            <Button
              variant={"ordinary"}
              className="hidden lg:block"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          ) : (
            <>
              <Button
                className="hidden lg:block"
                variant={"ordinary"}
                onClick={logOutHandle}
              >
                Log Out
              </Button>
            </>
          )}
        </div>
      </div>

      {sideNav && (
        <div className="md:hidden fixed top-[90px] left-0 w-full h-[calc(100vh+110px)] z-50 backdrop-blur-2xl">
          <div className="pt-[80px] h-full text-[35px]">
            <ol className="flex gap-14 flex-col text-center">
              <ul
                className={`transition tracking-wider duration-300 ease-in-out text-gray-400 cursor-pointer hover:text-white ${
                  pathname == "/" ? "text-white" : "font-medium"
                }`}
                onClick={() => {
                  router.push("/");
                  setSideNav(!sideNav);
                }}
              >
                Home
              </ul>
              <ul
                className={`transition tracking-wider duration-300 ease-in-out cursor-pointer text-gray-400 hover:text-white ${
                  pathname == "/courses" ? "text-white" : "font-medium"
                }`}
                onClick={() => {
                  setSideNav(!sideNav);
                  router.push("/courses");
                }}
              >
                Courses
              </ul>
              {userEmailSelector && (
                <ul
                  className={`transition tracking-wider duration-300 ease-in-out cursor-pointer text-gray-400 hover:text-white ${
                    pathname == "/purchasedcourses"
                      ? "text-white"
                      : "font-medium"
                  }`}
                  onClick={() => {
                    setSideNav(!sideNav);
                    router.push("/purchasedcourses");
                  }}
                >
                  Purchased Courses
                </ul>
              )}

              {!userEmailSelector ? (
                <>
                  <ul
                    className={`text-gray-400 hover:text-white`}
                    onClick={() => {
                      setSideNav(!sideNav);
                      router.push("/login");
                    }}
                  >
                    Log In
                  </ul>

                  <ul
                    className={`text-gray-400 hover:text-white`}
                    onClick={() => {
                      setSideNav(!sideNav);
                      router.push("/signup");
                    }}
                  >
                    Sign Up
                  </ul>
                </>
              ) : (
                <ul
                  className={`text-gray-400 hover:text-white`}
                  onClick={logOutHandle}
                >
                  Log Out
                </ul>
              )}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
