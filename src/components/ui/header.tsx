'use client';
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./nav";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<header className="sticky top-0 bg-black shadow z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo (Left) */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logokim.png"
            alt="Logo"
            width={80} // Increase logo size
            height={80}
            className="mr-2"
          />
        </Link>

        {/* Hamburger Menu Button (Right) */}
        <button
          className="block p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle menu visibility
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Full Menu */}
        <div className={`absolute top-0 right-0 bg-black uppercase text-white z-40 py-6 ${menuOpen ? 'px-4' : 'px-0 hidden'}`}>
          <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;

