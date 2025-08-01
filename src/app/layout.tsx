import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css";
import BootstrapClient from '@/components/BootstrapClient.js';
import Header from "../components/Header";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moz Track",
  description: "Project Management System",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <AuthProvider >
      
        
        <div className="d-flex flex-column min-vh-100">
        <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
      
      </AuthProvider>
      </body>
      <BootstrapClient />
    </html>
   
  );
}
