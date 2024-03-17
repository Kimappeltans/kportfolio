'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuCustomAnimation from "./nav";

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call handleResize initially to set the initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        {!isMobile && (
  <div className="fixed top-0 right-0 mt-6 mr-8">
    <button
      className="block p-2 text-white"
      onClick={() => setIsNavOpen(!isNavOpen)} // Toggle menu visibility
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
          d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
        />
      </svg>
    </button>
  </div>
)}


        {/* Full Menu */}
{isMobile && (
  <div className="container mx-auto mb-8 px-8 text-white" >
    <MenuCustomAnimation />
  </div>
)}

{!isMobile && (
  <div className={`px-8 py-6 text-white ${isNavOpen ? 'px-8' : 'px-0 hidden'}`} style={{ padding: '0 90px 0 0' }}>

    <MenuCustomAnimation />
  </div>
)}

      </div>
    </header>
  );
};

export default Header;
