"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (user?.publicMetadata?.role) {
      setRole(user.publicMetadata.role as string);
    } else {
      const storedRole = localStorage.getItem("userRole");
      setRole(storedRole);
    }
  }, [user]);


  if (
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/SelectAccount")
  ) {
    return null;
  }

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/Products" },
    { name: "Reviews", href: "/review" },
    { name: "About Us", href: "/Aboutus" },
    { name: "Contact Us", href: "/Contactus" },
  ];

  const buyerLinks = [
    { name: "Home", href: "/" },
    { name: "Agreements", href: "/AgreementsBuyer" },
    { name: "Products", href: "/Products" },
    { name: "My Orders", href: "/Myproducts" },
    { name: "About Us", href: "/Aboutus" },
  ];

  const sellerLinks = [
    { name: "Home", href: "/" },
    { name: "Agreements", href: "/AgreementsSeller" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/ordermanagment" },
    { name: "Upload", href: "/Upload_products" },
  ];

  let navLinks = publicLinks;
  if (isSignedIn && role === "buyer") navLinks = buyerLinks;
  if (isSignedIn && role === "seller") navLinks = sellerLinks;

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm h-16 relative z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">

        <Link href="/">
          <Image
            src="/AgroC.svg"
            alt="AgroRed"
            width={150}
            height={60}
            priority
          />
        </Link>

        <nav className="hidden lg:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition ${
                pathname === link.href
                  ? "text-[#FF6E08] font-bold"
                  : "text-gray-700 hover:text-[#FF6E08]"
              }`}
            >
              {link.name}
              <span
                className={`absolute left-0 -bottom-1 w-full h-0.5 bg-[#FF6E08] transition-transform duration-300 ${
                  pathname === link.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">

          {!isSignedIn ? (
            <Link href="/login">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#55A605] text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition">
                <FaUser size={14} />
                Sign in
              </button>
            </Link>
          ) : (
            <>
              <Link href="/cart">
                <button className="p-2 bg-[#55A605] rounded-full hover:bg-[#4E9505]">
                  <Image
                    src="/shopping-cart.svg"
                    alt="cart"
                    width={20}
                    height={20}
                  />
                </button>
              </Link>

              <UserButton afterSignOutUrl="/" />
            </>
          )}

          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t shadow-md">
          <nav className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`${
                  pathname === link.href
                    ? "text-[#FF6E08] font-bold"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}