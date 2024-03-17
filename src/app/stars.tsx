'use client';
import './global.css'; // Import CSS file for styles

import React, { useEffect } from 'react';

const StarryBackground = () => {
  useEffect(() => {
    const stars = document.getElementById('stars');

    if (stars !== null) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`; // Adjusted to use vh units
        star.style.left = `${Math.random() * 100}vw`; // Adjusted to use vw units
        stars.appendChild(star);
      }
    }
  }, []);

  return <div id="stars" />;
};

export default StarryBackground;
