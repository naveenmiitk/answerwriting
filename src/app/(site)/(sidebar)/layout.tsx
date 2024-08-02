import PublicLeftSidebar from "@/components/PublicLeftSidebar";
import PublicRightSidebar from "@/components/PublicRightSidebar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";

function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <NextAuthProvider>
        <TrpcProvider cookies={cookies().toString()}>
          <PublicLeftSidebar />
          <main className="flex-1 md:p-8 pt-2 p-4 lg:p-8 lg:max-w-5xl mx-auto">
            {children}
          </main>
          <PublicRightSidebar />
        </TrpcProvider>
      </NextAuthProvider>

      <Toaster richColors />
    </div>
  );
}

export default SideBarLayout;
