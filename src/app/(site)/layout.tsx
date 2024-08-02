import Footer from "@/components/Footer/Footer";
import NavBarL from "@/components/NavBar/NavBarL";
import NavBarSite from "@/components/NavBarSite";
import { Toaster } from "@/components/ui/sonner";
import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cookies } from "next/headers";
import React from "react";

function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1400px] mx-auto">
      <NextAuthProvider>
        <TrpcProvider cookies={cookies().toString()}>
          {/* <NavBarSite/> */}
          <NavBarL />
          <div className="min-h-[90vh]">{children}</div>

          <Footer />
        </TrpcProvider>
      </NextAuthProvider>

      <Toaster richColors />
    </div>
  );
}

export default SiteLayout;
