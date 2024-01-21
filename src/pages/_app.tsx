import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { RecoilRoot } from "recoil";
import ValidatingComponent from "./ValidatingComponent";
import { Toaster } from "@/components/ui/toaster";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ValidatingComponent />
        <Navbar />
        <Toaster />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}
