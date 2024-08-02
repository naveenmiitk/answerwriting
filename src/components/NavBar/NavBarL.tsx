import React from "react";
import aw from "../../../public/aw1.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/ThemeToggle";
import Link from "next/link";
import { getUserAuth } from "@/lib/auth/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileButton from "./ProfileButton";

const NavBarL = async () => {
  const {session}  = await getUserAuth();

  const user = session?.user;

  return (
    <div className="flex items-center justify-between p-[0.6rem] border-b-[1px] border-neutral-100 dark:border-neutral-800 max-w-[1400px] mx-auto py-2">
      <div className="flex items-center ">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={aw}
            alt="logo"
            width={50}
            height={50}
            className="dark:bg-white"
          />
          <h1 className="text-lg font-semibold">Answer Writing</h1>
        </Link>
        <div className="ml-[3rem] hidden lg:flex space-x-[1rem] text-sm">
          <Link
            href="/explore"
            className="hover:font-semibold hover:duration-200"
          >
            Explore
          </Link>
          <Link
            href="/question"
            className="hover:font-semibold hover:duration-200"
          >
            Questions
          </Link>
          <Link href="/tags" className="hover:font-semibold hover:duration-200">
            Tags
          </Link>
        </div>
      </div>

      <div className="flex space-x-[1rem]">
        <ModeToggle />
        {!user ? (
          <div>
            <Button variant={"secondary"} asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">Sign Up</Link>
            </Button>
          </div>
        ) : (
          // <div className="flex items-center justify-center">
          //   <Avatar className="h-8 w-8">
          //     <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
          //     <AvatarFallback className="border-border border-2 text-muted-foreground">
          //       {user.name
          //         ? user.name
          //             ?.split(" ")
          //             .map((word) => word[0].toUpperCase())
          //             .join("")
          //         : "~"}
          //     </AvatarFallback>
          //   </Avatar>
          // </div>
          <ProfileButton/>
        )}
      </div>
    </div>
  );
};

export default NavBarL;
