"use client";

import Navbar from "@/app/components/index";
import Footer from "@/app/components/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}