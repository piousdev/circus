'use client';
import { useUser } from "@clerk/nextjs";

export default function UserService() {
  const { isSignedIn, isLoaded, user } = useUser();

  console.log("User:", user);

  return { isSignedIn, isLoaded, user };
}