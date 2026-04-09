"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/SelectAccount")
  ) {
    return null;
  }

  return (
    <footer className="bg-black text-white w-full mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">

      
        <div className="mb-10">
          <Image
            src="/AgroW.svg"
            alt="AgroRed"
            width={150}
            height={60}
          />
        </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Why AgroRed?</Link></li>
              <li><Link href="#">Purpose</Link></li>
              <li><Link href="#">About AgroRed</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#">Returns</Link></li>
              <li><Link href="#">Deliveries</Link></li>
              <li><Link href="#">Quality</Link></li>
              <li><Link href="#">Order status</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#">How to buy</Link></li>
              <li><Link href="#">Contact us</Link></li>
              <li><Link href="#">About us</Link></li>
              <li><Link href="#">FAQs</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 my-6" />


        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex space-x-6 text-xl">
            <FaInstagram className="hover:scale-110 transition cursor-pointer" />
            <FaFacebook className="hover:scale-110 transition cursor-pointer" />
            <FaLinkedin className="hover:scale-110 transition cursor-pointer" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <FiGlobe />
              <span>Global</span>
            </div>
            <div className="flex items-center gap-2">
              <MdLocationOn />
              <span>El Salvador</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}