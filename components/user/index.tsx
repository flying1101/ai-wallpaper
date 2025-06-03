"use client";

import * as React from "react";
// import { SignOutButton } from "@clerk/nextjs";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton
} from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

export default function ({ user }: Props) {
  const router = useRouter();

  return (
    <div className="flex justify-end items-center p-4 gap-4 h-16">
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </div>
  );
}
