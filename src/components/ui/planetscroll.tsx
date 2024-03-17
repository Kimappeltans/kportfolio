'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, useHelper } from '@react-three/drei';
import { TextureLoader, DirectionalLight, PointLightHelper } from 'three';
import { ShaderMaterial, UniformsUtils } from 'three';
import gsap from 'gsap';
import * as THREE from 'three';


const name = (type: string) => {
  switch (type) {
    case "Color":
      return 'plutomap4k.jpeg';
    case "Bump":
     return 'plutobump2.jpg';
    case "Normal":
      return 'pluto5.webp';
    default:
      return 'plutocolor.jpg';
  }
};

const Planet = ({ scrollPosition }: { scrollPosition: number }) => {
  const planetRef = useRef<THREE.Mesh>(null!);
  const [
    colorMap,
    displacementMap,
    normalMap,
    roughnessMap,
  ] = useLoader(TextureLoader, [
    name("Color"),
    name("Displacement"),
    name("Normal"),
    name("Roughness"),
  ]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    planetRef.current.rotation.y = elapsedTime / 10 ;
    planetRef.current.position.x = 100; 
    // Move planet to the right
    planetRef.current.position.y = scrollPosition * 0.1+100; // Adjust based on scroll
  });

  return (
    <mesh ref={planetRef} position={[100, 0, 0]}>
      <sphereGeometry args={[60, 32, 32]} />
      <meshStandardMaterial
        displacementScale={0.2}
        map={colorMap}
        displacementMap={displacementMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        roughness={1}
      />
    </mesh>
  );
};


const Scene = ({ scrollPosition }: { scrollPosition: number }) => {
  const { camera, size } = useThree();
  const lightRef = useRef<DirectionalLight> (null);

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 65;
      camera.aspect = size.width / size.height; // Set the aspect ratio
      camera.updateProjectionMatrix();
    }
    gsap.to(camera.position, { z:410, duration: 2 });
  }, [camera, size]); // Add size to the dependency array

  // Optional: Use a helper to visualize the light's position and effect
  // useHelper(lightRef, PointLightHelper, 1, 'hotpink');

  return (
    <>
      <OrbitControls enableZoom={false} /> {/* Disable zooming */}
      <ambientLight intensity={0.5} />
      <directionalLight ref={lightRef} position={[0, 10, 5]} intensity={1} color={0xffffff}/>
      {/* Add another light source to illuminate the dark side of the planet */}
      <directionalLight position={[-1, -10, -5]} intensity={1} />
      <directionalLight position={[0, 0, 0]} intensity={1} />
     
      <Stars />
      <Planet scrollPosition={scrollPosition} />
    </>
  );
};

const PlanetScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ height: '220vh' }}>
      <Canvas>
        <Scene scrollPosition={scrollPosition} />
      </Canvas>
    </div>
  );
};

export default PlanetScroll;