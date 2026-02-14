'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './GoalsMentor.module.css';
import Image from 'next/image';

export default function GoalsMentor() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(err => console.log('Video play error:', err));
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress from when section enters until it leaves viewport
      const start = windowHeight;
      const end = -rect.height;
      const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.container} ref={sectionRef}>
      <div className={styles.content}>
        <h2 
          className={styles.title}
          style={{
            opacity: Math.min(scrollProgress * 2, 1),
            transform: `translateY(${Math.max(30 - scrollProgress * 30, 0)}px)`
          }}
        >
          Begin your Mentorship Journey in{' '}
          <span className={styles.titleItalic}>5 steps</span>
        </h2>

        <div 
          className={`${styles.laptopWrapper} ${isInView ? styles.fadeIn : ''}`}
          style={{
            transform: `scale(${0.85 + scrollProgress * 0.15}) translateY(${Math.max(50 - scrollProgress * 50, 0)}px)`,
            opacity: Math.min(scrollProgress * 1.5, 1)
          }}
        >
          <div className={styles.laptopContainer}>
            {/* Video */}
            <video
              ref={videoRef}
              className={styles.video}
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/GetPreped.mp4" type="video/mp4" />
            </video>
            
            {/* MacBook SVG overlay */}
            <Image
              src="/svgs/mac.svg"
              alt="MacBook"
              fill
              className={styles.mockup}
            />
          </div>
        </div>
      </div>
    </section>
  );
}