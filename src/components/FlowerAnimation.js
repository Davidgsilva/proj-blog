'use client';

import { useEffect } from 'react';

export default function FlowerAnimation() {
  useEffect(() => {
    // Create flowers randomly on the page
    const createFlowers = () => {
      const flowerContainer = document.getElementById('flower-container');
      if (!flowerContainer) return;
      
      // Clear existing flowers
      flowerContainer.innerHTML = '';
      
      // Create new flowers
      const numberOfFlowers = 15;
      for (let i = 0; i < numberOfFlowers; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Random position
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        flower.style.left = `${randomX}px`;
        flower.style.top = `${randomY}px`;
        
        // Random animation duration
        const duration = 5 + Math.random() * 10;
        flower.style.animationDuration = `${duration}s`;
        
        // Random movement direction
        const randomXDirection = Math.random() > 0.5 ? 1 : -1;
        const randomYDirection = Math.random() > 0.5 ? 1 : -1;
        const randomX2 = Math.floor(Math.random() * 200) * randomXDirection;
        const randomY2 = Math.floor(Math.random() * 200) * randomYDirection;
        const randomRotate = Math.floor(Math.random() * 360);
        
        flower.style.setProperty('--random-x', `${randomX2}px`);
        flower.style.setProperty('--random-y', `${randomY2}px`);
        flower.style.setProperty('--random-rotate', `${randomRotate}deg`);
        
        // Add flower center
        const flowerCenter = document.createElement('div');
        flowerCenter.className = 'flower-center';
        flower.appendChild(flowerCenter);
        
        flowerContainer.appendChild(flower);
      }
    };
    
    // Create flowers initially and on resize
    createFlowers();
    window.addEventListener('resize', createFlowers);
    
    // Recreate flowers every 15 seconds
    const interval = setInterval(createFlowers, 15000);
    
    return () => {
      window.removeEventListener('resize', createFlowers);
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="flower-container" className="fixed inset-0 pointer-events-none z-0" aria-hidden="true"></div>
  );
}
