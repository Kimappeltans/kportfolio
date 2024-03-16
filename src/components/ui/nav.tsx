'use client';
import React, { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
}

const MenuItem: React.FC<MenuItemProps> = ({ setActive, active, item, href }) => {
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
      className="relative  dark:bg-black flex  justify-end items-start space-x-4 py-6 "
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

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(!scrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      // cleanup the event listener
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 max-w-2xl mx-auto z-50 bg-black text-l uppercase text-white",
        { 'scrolled': scrolled },
        className
      )}
    >
      <Menu setActive={(item: MenuItemType | null) => setActive(item)}>
        <MenuItem
          setActive={setActive}
          active={active}
          item="Home"
          href="#hero"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="About"
          href="#about"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="Skills"
          href="#skills"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="Projects"
          href="#projects"
        />
        <MenuItem
          setActive={setActive}
          active={active}
          item="More"
          href="#more"
        />
      </Menu>
    </div>
  );
};

export default Navbar;