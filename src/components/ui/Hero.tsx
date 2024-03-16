"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Bounded from "./Bounded";

const Hero = (): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.timeline()
        .fromTo(
          ".name-animation",
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            ease: "elastic.out(1,0.3)",
            duration: 1,
            transformOrigin: "left top",
            stagger: { each: 0.1, from: "random" },
          },
        )
        .fromTo(
          ".job-title",
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          },
        );
    }, component);

    return () => ctx.revert(); // cleanup!
  }, []); // Empty dependency array ensures it runs only once after initial render

  return (
    <Bounded className="relative z-10" ref={component}>
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2 relative z-10">
        <canvas id="canvas3d" className="col-start-1 md:row-start-1" data-speed=".2"></canvas>
        <div className="col-start-1 md:row-start-1 " data-speed=".2">
          <h1
            className="mb-8 text-[clamp(1rem,15vmin,9rem)] font-extrabold leading-none tracking-tighter uppercase"
            aria-label="Kim Appeltans"
          >
            <span className="block  text-white name-animation">
              Kim
            </span>
            <span className="-mt-[.2em] block text-white name-animation">
              Appeltans
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-blue-800 via-blue-00 to-purple-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            Marketeer, Designer, Professor
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
