"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if token is missing
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="container mt-5">
      <h1>Welcome to the Dashboard</h1>
      <p>This is a protected route.</p>
    </div>
  );
};

export default page;
