'use client' ;
import React, { useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type HeadingProps = {
  size: string;
  className: string;
  children: React.ReactNode;
};

const Heading: React.FC<HeadingProps> = ({ size, className, children }) => {
  return (
    <div className={className} style={{ fontSize: size }}>
      {children}
    </div>
  );
};

interface SkillsProps {
  heading: string;
  skills: string[];
  className: string; // Add this line

}


const Skills: React.FC<SkillsProps> = ({ heading, skills, className }) => {
  const animateText = useCallback(() => {
    skills.forEach((_, index) => {
      const marqueeText = document.getElementById(`marquee-text-${index}`);
      if (marqueeText) {
        const w = marqueeText;
        const [x, xEnd] = ["0%", (w.scrollWidth - w.offsetWidth) * -0.5];

        gsap.fromTo(w, { x }, {
          x: xEnd,
          scrollTrigger: {
            trigger: w,
            scrub: 0.5
          }
        });
      }
    });
  }, [skills]);

  useEffect(() => {
    animateText();
  }, [animateText]);

  return (
    <section>
      <h1 className={className}>
        {heading}
      </h1>
      {skills.map((text, index) => (
        <motion.div
          key={index}
          id={`marquee-text-${index}`}
          className="marquee-text"
          whileHover={{ color: '#8939FF' }}
        >
          {text}
        </motion.div>
      ))}
    </section>
  );
};

const App = () => {
  return (
    <div>
      <Skills
        heading="Skills"
        className="text-white mb-8 text-[clamp(0.5rem,10vmin,7rem)] font-extrabold"
        skills={[
          "React - NODE - JAVASCRIPT - PHP - HTML - CSS",
          "3D DESIGN - FIGMA - BLENDER - WIREFRAMING",
          "SEO - SEM - SOCIAL MEDIA MARKETING - AI APPLICATIONS"
        ]}
      />
    </div>
  );
};

export default App;
