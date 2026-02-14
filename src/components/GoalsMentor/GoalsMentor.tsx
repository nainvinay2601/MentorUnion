'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import styles from './GoalsMentor.module.css';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function GoalsMentor() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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
    if (!titleRef.current || !laptopRef.current) return;

    const ctx = gsap.context(() => {
      // Split text animation
      const split = new SplitText(titleRef.current, { 
        type: 'words,chars',
        wordsClass: 'word',
        charsClass: 'char'
      });

      // Title animation - stagger chars
      gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        rotationX: -90,
        transformOrigin: '0% 50% -50',
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      });

      // Laptop + Video animation together (no separate video animation)
      gsap.from(laptopRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: laptopRef.current,
          start: 'top 85%',
          end: 'top 40%',
          toggleActions: 'play none none none'
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.container} ref={sectionRef}>
      <div className={styles.content}>
        <h2 ref={titleRef} className={styles.title}>
          Begin your Mentorship <br/> Journey in{' '}
          <span className={styles.titleItalic}>5 steps</span>
        </h2>

        <div className={styles.laptopWrapper} ref={laptopRef}>
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