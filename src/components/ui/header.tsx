import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./nav";


const Header: React.FC = () => {
  return (
    // Position header at the top with sticky positioning
    <header className="sticky top-0 bg-black shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logokim.png"
            alt="Logo"
            width={80} // Increase logo size
            height={80}
            className="mr-2"
          />
        
        </Link>

        {/* Navbar with black background and adjusted z-index */}
        <Navbar className="z-40 mr-10 mt-2" /> {/* Ensure Navbar appears above header shadow */}
      </div>
    </header>
  );
};

export default Header;