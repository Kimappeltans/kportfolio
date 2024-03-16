'use client' ;
// Import React and other necessary dependencies
import React, { useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define props for Heading component
type HeadingProps = {
  size: string;
  className: string;
  children: React.ReactNode; // Add 'children' prop type
};

// Heading component
const Heading: React.FC<HeadingProps> = ({ size, className, children }) => {
  // You can now use 'size', 'className', and 'children' in your component
  return (
    <div className={className} style={{ fontSize: size }}>
      {children}
    </div>
  );
};

// Define props for Skills component
interface SkillsProps {
  heading: string;
  skills: string[];
}

const Skills = ({ heading, skills }: SkillsProps): JSX.Element => {
  const animateText = useCallback(() => {
    // Animation logic using GSAP
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
  }, [skills]); // Trigger useCallback whenever any of the skills change

  useEffect(() => {
    // Trigger GSAP animation after the component has been mounted and the content is loaded
    animateText();
  }, [animateText]); // Trigger useEffect whenever animateText changes

  return (
    <section>
      {/* Render heading */}
      <Heading className="3xl text-white" size={""}>
        {heading}
      </Heading>

      {/* Render each text row */}
      {skills.map((text, index) => (
        <div key={index} id={`marquee-text-${index}`} className="marquee-text">
          {text}
        </div>
      ))}
    </section>
  );
};

// Usage of Skills component
const App = () => {
  return (
    <Skills 
      heading="My Heading" 
      skills={[
        "React-NODE-JAVASCRIPT-PHP-HTML-CSS", // row 1
        "3D DESIGN-FIGMA-BLENDER-WIREFRAMING", // row 2
        "SEO-SEM-SOCIAL MEDIA MARKETING-AI APPLICATIONS-SALESFORCE"  // row 3
      ]}
    />
  );
};

export default App;