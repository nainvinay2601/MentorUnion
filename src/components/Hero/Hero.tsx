'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.fromTo(`.${styles.headline}`, 
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    gsap.fromTo(`.${styles.subtext}`, 
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6,
      }
    );

    gsap.fromTo(`.${styles.cta}`, 
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.9,
      }
    );

    gsap.fromTo(`.${styles.orbitRing}`, 
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 0.5,
      }
    );

  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background mentor image */}
      <div className={styles.bgWrapper}>
        <Image
          src="/heroSectionAssets/kunalHero.webp"
          alt="Mentor background"
          fill
          priority
          quality={95}
          className={styles.bgImage}
        />
      </div>

      {/* Orbit system - top left */}
      <div className={styles.orbitContainer}>
        {/* Inner orbit ring */}
        <div className={`${styles.orbitRing} ${styles.ring1}`}>
          <div className={styles.orbitPath}></div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar1}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/person1.jpg" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar2}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/person2.jpg" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
        </div>

        {/* Outer orbit ring */}
        <div className={`${styles.orbitRing} ${styles.ring2}`}>
          <div className={styles.orbitPath}></div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar3}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/person3.jpg" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar4}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/person4.jpg" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text content - middle left */}
      <div className={styles.content}>
        <h1 className={styles.headline}>
          Unlock Your Potential
          <br />
          with <span className={styles.accent}>1:1 Mentorship</span>
        </h1>

        <p className={styles.subtext}>
          Get <strong>real-world insights</strong> and career guidance from 650+ seasoned industry experts
        </p>

        <button className={styles.cta}>
          Browse Mentors
            <Image src="/svgs/MU-Arrow-Main.svg" alt="Arrow right" width={16} height={16} className={styles.ctaIcon} />
        </button>
      </div>
    </section>
  );
}