import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getUserAuth } from '@/lib/auth/utils';
import LogoutButton from './LogoutButton';

const ProfileButton = async () => {
     const { session } = await getUserAuth();

     const user = session?.user;
     if (!user) return null;
  return (
    <div className='mx-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className='hover:cursor-pointer'>
          <div className="flex items-center justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback className="border-border border-2 text-muted-foreground text-sm">
                {user.name
                  ? user.name
                      ?.split(" ")
                      .map((word) => word[0].toUpperCase())
                      .join("")
                  : "~"}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-28 lg:w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
           <LogoutButton />
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ProfileButton
