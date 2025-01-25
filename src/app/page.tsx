"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importing from next/navigation for client-side routing
import Link from "next/link";
import Home from "@/components/Home";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Redirect to /dashboard if token is present
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <Home/>
       
      
  );
}