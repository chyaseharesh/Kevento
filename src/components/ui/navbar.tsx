/* eslint-disable @next/next/no-img-element */
'use client';
import Image from "next/image";
import { useState } from "react";
import logo from '../../app/images/KhatraEvents_Logo.svg'; // Adjust the path based on your project structure

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SessionDropdown } from "../common/SessionCheck";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const session = useSession();

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <>
      {
        !isAdminPage &&
        <header className="bg-purple-800 shadow-lg py-4 sticky top-0 z-50">
          <div className="container mx-auto h-16 flex items-center justify-between p-5 pt-8">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center align-middle backdrop-blur-0 bg-transparent bg-opacity-50">
              <Image src={logo} alt="Khatra Event Logo" width={100} height={50} className="mr-2" />
            </Link>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                className="hamburger text-white hover:text-primary focus:outline-none transition-colors duration-300"
              >
                <input type="checkbox" checked={isMobileMenuOpen} readOnly />
                <svg viewBox="0 0 32 32">
                  <path
                    className="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  />
                  <path className="line" d="M7 16 27 16" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8 text-center">
                <li><a href="/index" className="text-base font-semibold text-white hover:text-secondary-hover transition-colors duration-300">HOME</a></li>
                <li><a href="/about" className="text-base font-semibold text-white hover:text-secondary-hover transition-colors duration-300">ABOUT</a></li>
                <li><a href="/blog" className="text-base font-semibold text-white hover:text-secondary-hover transition-colors duration-300">BLOG</a></li>
                <li><Link href="/events" className="text-base font-semibold text-white hover:text-secondary-hover transition-colors duration-300">EVENT</Link></li>
                {/* <li><a href="/voting" className="text-base font-semibold text-white hover:text-secondary-hover transition-colors duration-300">VOTING</a></li> */}
                <li><a href="/contact" className="text-base font-semibold text-white hover:text-secondary-hover transition-colors duration-300">CONTACT</a></li>
                <li><SessionDropdown /></li>

              </ul>
            </nav>
          </div>

          {/* Mobile Menu */}
          <nav
            className={`md:hidden bg-purple-800 border-t border-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-screen" : "max-h-0"}`}
          >
            <ul className="px-4 py-2">
              <li><Link href="/" className="block py-2 text-white hover:text-blue-400 font-extrabold">HOME</Link></li>
              <li><a href="/about" className="block py-2 text-white hover:text-primary font-extrabold">ABOUT</a></li>
              <li><a href="/blog" className="block py-2 text-white hover:text-primary font-extrabold">BLOG</a></li>
              <li><Link href="/events" className="block py-2 text-white hover:text-primary font-extrabold">EVENT</Link></li>
              <li><a href="/voting" className="block py-2 text-white hover:text-primary font-extrabold">VOTING</a></li>
              <li><a href="/contact" className="block py-2 text-white hover:text-primary font-extrabold">CONTACT</a></li>
              <li>
                {session.status === 'authenticated' ? (
                  <Button onClick={() => signOut({ callbackUrl: '/' })} className="block py-2 bg-primary/90 hover:bg-primary-hover text-white rounded-md text-center transition-colors duration-300 font-extrabold">
                    Logout
                  </Button>
                ) : (
                  <a href="/login" className="block py-2 bg-primary/90 hover:bg-primary-hover text-white rounded-md text-center transition-colors duration-300 font-extrabold">
                    Login
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </header>
      }
    </>
  );
}
