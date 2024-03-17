'use client';
import React, { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

type MenuItemType = "Home" | "About" | "Skills" | "Projects" | "More";

interface MenuItemProps {
  setActive: (item: MenuItemType | null) => void;
  active: MenuItemType | null;
  item: MenuItemType;
  href: string;
  className?: string; 
}

const MenuItem: React.FC<MenuItemProps> = ({ setActive, active, item, href,  className }) => {
  const menuItemClasses = cn("relative bg-black");

  return (
    <div onMouseEnter={() => setActive(item)} className={menuItemClasses}>
      <a href={href} className={cn("cursor-pointer")}>
        {item}
      </a>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className={cn("absolute top-full left-1/2 transform -translate-x-1/2")}>
              <motion.div
                transition={transition}
                layoutId="active"
                className={cn(
                  "bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black-20 dark:border-white-20 shadow-xl"
                )}
              >
                <motion.div layout className={cn("w-max h-full p-4")} />
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

interface HoveredLinkProps {
  children: ReactNode;
  href: string;
}

const HoveredLink: React.FC<HoveredLinkProps> = ({ children, href, ...rest }) => (
  <a
    href={href}
    {...rest}
    className={cn("text-xl uppercase font-bold dark:text-neutral-200 hover:text-blue-500 transition-colors")}
  >
    {children}
  </a>
);

interface MenuProps {
  setActive: (item: MenuItemType | null) => void;
  children: ReactNode;
}

const Menu: React.FC<MenuProps> = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative dark:bg-black flex  justify-end items-start space-x-4 py-6 "
    >
      {children}
    </nav>
  );
};

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [active, setActive] = useState<MenuItemType | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to track if it's a mobile view

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };
    const handleResize = () => {
      // Check if viewport width is less than a certain value to determine mobile view
      setIsMobile(window.innerWidth < 768); // Example: Assume mobile if viewport width is less than 768px
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize); // Listen for window resize events
    handleResize();

    return () => {
      // cleanup the event listener
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

    };
  }, [scrolled]);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
  };
  // Dynamically adjust menu item class based on mobile view
  const menuItemClasses = cn("relative bg-black", {
    "flex flex-col": isMobile, // If mobile view, show items in a column
    "space-x-4": !isMobile, // If not mobile view, show items inline
  });
  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 max-w-6xl mx-auto z-100 bg-black text-l uppercase text-white",
        { 'scrolled': scrolled },
        className
      )}
    >
      {/* Hamburger Icon */}
      <button
  className="block p-2 text-white" // Removed md:hidden class
  onClick={toggleMenu} // Toggle menu visibility
  >
{menuOpen ? (
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
      d="M6 18L18 6M6 6l12 12"
      />
  </svg>
  ) : (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
 
  </svg>
)} 
</button>


      {/* Menu */}
      <div className={cn("overflow-hidden", { "h-auto": menuOpen })}>
        <Menu setActive={(item: MenuItemType | null) => setActive(item)}>
          <MenuItem
          className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            setActive={setActive}
            active={active}
            item="Home"
            href="#hero"
          />
          <MenuItem
            className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            setActive={setActive}
            active={active}
            item="About"
            href="#about"
          />
          <MenuItem
          className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            setActive={setActive}
            active={active}
            item="Skills"
            href="#skills"
          />
          <MenuItem
          className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            setActive={setActive}
            active={active}
            item="Projects"
            href="#projects"
          />
          <MenuItem
          className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            setActive={setActive}
            active={active}
            item="More"
            href="#more"
          />
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;

