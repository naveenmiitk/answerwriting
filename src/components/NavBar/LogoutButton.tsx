"use client";
import React from 'react'
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </button>
    </div>
  );
}

export default LogoutButton
