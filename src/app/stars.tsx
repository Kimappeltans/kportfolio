'use client';

import React, { useEffect } from 'react';

const StarryBackground = () => {
useEffect(() => {
    const stars = document.getElementById('stars');

    if (stars !== null) {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            stars.appendChild(star);
        }
    }
}, []);

return <div id="stars" style={{ position: 'absolute', zIndex: -1, width: '100%', height: '100%' }} />
};

export default StarryBackground;