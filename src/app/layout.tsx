
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from 'next/dynamic';
import "./globals.css";
import { GlobeDemo } from '../components/ui/globemap';
import React from "react";
import Hero from "@/components/ui/Hero";
import Header from "@/components/ui/header";
import Biography from "@/components/ui/biography";

import StarryBackground from "./stars";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/beams";
import Image from "next/image";
import Projects from "@/components/ui/projects";
import Skills from "@/components/ui/skills";

// Dynamically import the GlobeDemo component with SSR turned off
// At the top of your file, after other imports

const PlanetScroll = dynamic(() => import('../components/ui/planetscroll'), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <BackgroundBeams />
        <div style={{ zIndex: 2 }}>
          {children}
          <Header />
          <Hero />
          <div style={{ zIndex: 0, position: 'fixed', top: '0', left: '0', height: '100%', width: '100%' }}>
            <PlanetScroll />
          </div>
          <Biography
            title="About me"
            text="I'm a marketeer, designer and professor..."
            src="/mecopy.png"
            alt="Kim's avatar"
          />
           <Skills />
          <Projects />
         
        </div>
      </body>
    </html>
  );
}