"use client";

import { signIn } from "next-auth/react";
import aw from "../../../../public/aw1.png"
import Image from "next/image";
import SignInForum from "@/components/auth/SignInForum";

const Page = () => {
  return (
    <main className="bg-popover max-w-lg mx-auto my-4 rounded-lg p-10">
      <div className="flex flex-col items-center jusfitify-center space-y-2 w-full">
        <Image src={aw} alt="logo" width={50} height={50} />
        <h1 className="text-2xl font-semibold">Answer Writing</h1>
      </div>
      <h1 className="text-2xl font-bold text-center text-slate-900">
        Sign in to your account
      </h1>
      <SignInForum />
      <div className="mt-4">
        {/* <button
          onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
          className="w-full bg-primary text-primary-foreground text-center hover:opacity-90 font-medium px-4 py-2 rounded-lg block"
        >
          Sign In
        </button> */}
        <div className="flex flex-col items-center jusfitify-center space-y-2 w-full">
          <h1>Or Sign In With</h1>
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full text-primary-foreground text-center hover:opacity-90 font-medium p-2 flex space-x-4 max-w-fit rounded-full"
            >
              <Image
                src="/icons/google.svg"
                alt="google"
                width={32}
                height={32}
              />
            </button>
            <button
              onClick={() => signIn("facebook")}
              className="w-full text-primary-foreground text-center hover:opacity-90 font-medium p-2 flex space-x-4 max-w-fit rounded-full"
            >
              <Image
                src="/icons/facebook.svg"
                alt="facebook"
                width={32}
                height={32}
              />
              ;
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center jusfitify-center space-y-2 w-full">
        <h1>Don&apos;t have an account?
          <span className="text-primary font-semibold cursor-pointer">{" "}Sign Up</span>
        </h1>
      </div>



    </main>
  );
};

export default Page;

