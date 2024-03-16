'use client'
import React, { useEffect, useRef } from "react";
import Bounded from "@/components/ui/Bounded";
import gsap from "gsap";
import Image from "next/image";

interface AvatarProps {
  className?: string;
  src: string;
  alt: string;
}

const Avatar = ({ className, src, alt }: AvatarProps) => {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentComponent = component.current;

    gsap.fromTo(
      currentComponent,
      {
        opacity: 0,
        scale: 1.4,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.3,
        ease: "power3.inOut",
      },
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (!currentComponent) return; // no component, no animation!
      const componentRect = currentComponent.getBoundingClientRect();
      const componentCenterX = componentRect.left + componentRect.width / 2;

      let componentPercent = {
        x: (e.clientX - componentCenterX) / componentRect.width / 2,
      };

      let distFromCenterX = 1 - Math.abs(componentPercent.x);

      gsap
        .timeline({
          defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
        })
        .to(
          currentComponent,
          {
            rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
            duration: 0.5,
          },
          0,
        )
        .to(
          ".highlight",
          {
            opacity: distFromCenterX - 0.7,
            x: -10 + 20 * componentPercent.x,
            duration: 0.5,
          },
          0,
        );
    };

    currentComponent?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentComponent?.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section id="about" className="about my-20">
      <div ref={component} className={`relative h-full w-full ${className}`}>
        <div
          className="about avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0"
          style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
        >
          <Image
            src={src}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className="avatar-image"
          />
          <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
        </div>
      </div>
    </section>
  );
};

interface BiographyProps {
  title: string;
  text: string;
  src: string;
  alt:string;
}

const Biography = ({ title, text, src, alt }: BiographyProps): JSX.Element => {
  return (
    <Bounded>
      <div className="h-32"></div>
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <div className="col-start-1">
          <h1 className=" text-white mb-8 text-[clamp(0.5rem,10vmin,7rem)] font-extrabold">{title}</h1>
          <p className="prose prose-xl prose-slate prose-invert text-white">{text}</p>
        </div>
        <div className="row-start-1 max-w-sm md:col-start-2 md:row-end-3">
          <Avatar className="avatar" src={src} alt={alt} />
        </div>
      </div>
      <div className="h-32"></div>
    </Bounded>
  );
};

export default Biography;