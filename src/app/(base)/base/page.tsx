"use client";

import { Button } from "@/components/ui/button";
import { tagObject } from "@/lib/db/customscript/createBulkTags";
import { createBulkTags } from "@/lib/db/queries/query";
import React from "react";

const HomePageWithoutLogin = () => {

 

  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gray-50 text-gray-950">
        <div className="relative mb-32 h-screen w-screen">
          <video
            src="https://persistent.oaistatic.com/sonic/landing/bg_v2.mp4"
            autoPlay
            loop
            playsInline
            muted
            className="pointer-events-none absolute left-0 top-0 h-[calc(100vh+8rem)] w-full object-cover transition-opacity delay-1000 duration-1000"
          ></video>
        </div>
        <div className="absolute">
          <h1 className="text-3xl font-semibold">Answer Writing</h1>
         
        </div>
      </section>
    </main>
  );
};

export default HomePageWithoutLogin;
