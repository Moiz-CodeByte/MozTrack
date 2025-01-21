"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importing from next/navigation for client-side routing
import Link from "next/link";

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
    <html lang="en">
      <body>
        <h2 className="text-center text-bg-primary m-2 p-2">
          Bootstrap 5 with Next.js
        </h2>
      </body>
    </html>
  );
}