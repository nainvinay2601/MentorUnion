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

      <div className={styles.orbitContainer}>
        {/* Inner ring - 6 avatars at 0°, 60°, 120°, 180°, 240°, 300° */}
        <div className={`${styles.orbitRing} ${styles.ring1}`}>
          <div className={styles.orbitPath}></div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar1}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar2}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar2.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar3}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar3.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar4}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar4.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar5}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar5.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar6}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar6.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
        </div>

        {/* Outer ring - 6 avatars at 30°, 90°, 150°, 210°, 270°, 330° */}
        <div className={`${styles.orbitRing} ${styles.ring2}`}>
          <div className={styles.orbitPath}></div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar7}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar7.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
          
          <div className={`${styles.avatarHolder} ${styles.avatar8}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar8.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar9}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar9.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar10}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar10.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar11}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar11.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>

          <div className={`${styles.avatarHolder} ${styles.avatar12}`}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarBg}>
                <Image src="/avatars/avatar12.webp" width={70} height={70} alt="" className={styles.avatarImg} />
              </div>
            </div>
          </div>
        </div>
      </div>

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