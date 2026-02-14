'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './MentorGrid.module.css';

export default function MentorGrid() {
  const sectionRef = useRef(null);

  // All 24 unique logos
  const allLogos = [
    '/mentorLogos/meta.svg',
    '/mentorLogos/microsoft.svg',
    '/mentorLogos/apple.svg',
    '/mentorLogos/google.svg',
    '/mentorLogos/mck.svg',
    '/mentorLogos/amazon.svg',
    '/mentorLogos/blackrock.svg',
    '/mentorLogos/citi.svg',
    '/mentorLogos/g1.svg',
    '/mentorLogos/goldSachs.svg',
    '/mentorLogos/jpmor.svg',
    '/mentorLogos/kpmg.svg',
    '/mentorLogos/amex.svg',
    '/mentorLogos/cred.svg',
    '/mentorLogos/acn.svg',
    '/mentorLogos/bcg.svg',
    '/mentorLogos/blinkit.svg',
    '/mentorLogos/ey.svg',
    '/mentorLogos/deloitte.svg',
    '/mentorLogos/slash.svg',
    '/mentorLogos/mckinsey.svg',
    '/mentorLogos/linkedin.svg',
    '/mentorLogos/pwc.svg',
    '/mentorLogos/adaniGroups.svg',
  ];

  // 24 cubes (4 rows × 6 cols) - Each cube has 4 faces
  const cubes = [
    // ROW 1
    [allLogos[0], allLogos[6], allLogos[12], allLogos[18]],
    [allLogos[1], allLogos[7], allLogos[13], allLogos[19]],
    [allLogos[2], allLogos[8], allLogos[14], allLogos[20]],
    [allLogos[3], allLogos[9], allLogos[15], allLogos[21]],
    [allLogos[4], allLogos[10], allLogos[16], allLogos[22]],
    [allLogos[5], allLogos[11], allLogos[17], allLogos[23]],
    // ROW 2
    [allLogos[6], allLogos[12], allLogos[18], allLogos[0]],
    [allLogos[7], allLogos[13], allLogos[19], allLogos[1]],
    [allLogos[8], allLogos[14], allLogos[20], allLogos[2]],
    [allLogos[9], allLogos[15], allLogos[21], allLogos[3]],
    [allLogos[10], allLogos[16], allLogos[22], allLogos[4]],
    [allLogos[11], allLogos[17], allLogos[23], allLogos[5]],
    // ROW 3
    [allLogos[12], allLogos[18], allLogos[0], allLogos[6]],
    [allLogos[13], allLogos[19], allLogos[1], allLogos[7]],
    [allLogos[14], allLogos[20], allLogos[2], allLogos[8]],
    [allLogos[15], allLogos[21], allLogos[3], allLogos[9]],
    [allLogos[16], allLogos[22], allLogos[4], allLogos[10]],
    [allLogos[17], allLogos[23], allLogos[5], allLogos[11]],
    // ROW 4
    [allLogos[18], allLogos[0], allLogos[6], allLogos[12]],
    [allLogos[19], allLogos[1], allLogos[7], allLogos[13]],
    [allLogos[20], allLogos[2], allLogos[8], allLogos[14]],
    [allLogos[21], allLogos[3], allLogos[9], allLogos[15]],
    [allLogos[22], allLogos[4], allLogos[10], allLogos[16]],
    [allLogos[23], allLogos[5], allLogos[11], allLogos[17]],
  ];

  useEffect(() => {
    const cubeElements = document.querySelectorAll(`.${styles.cubeInner}`);

    // Rotate all cubes automatically every 1 second (90 degrees each time)
    const interval = setInterval(() => {
      cubeElements.forEach((cube) => {
        const currentRotation = parseInt(cube.dataset.rotation || '0');
        const newRotation = currentRotation + 90;
        
        gsap.to(cube, {
          rotateY: newRotation,
          duration: 0.6,
          // ease: 'power2.inOut',
        });
        
        cube.dataset.rotation = newRotation.toString();
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Gain Access to Mentors from
            <br />
            <span className={styles.titleItalic}>Global Brands</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {cubes.map((logos, index) => (
            <div 
              key={index} 
              className={`${styles.cell} ${(index + 1) % 6 === 0 ? styles.lastInRow : ''}`}
            >
              <div className={styles.cubeWrapper}>
                <div className={styles.cubeInner} data-rotation="0">
                  <div className={`${styles.cubeFace} ${styles.front}`}>
                    <Image 
                      src={logos[0]} 
                      alt="Company logo" 
                      width={80}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={`${styles.cubeFace} ${styles.right}`}>
                    <Image 
                      src={logos[1]} 
                      alt="Company logo" 
                      width={80}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={`${styles.cubeFace} ${styles.back}`}>
                    <Image 
                      src={logos[2]} 
                      alt="Company logo" 
                      width={80}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={`${styles.cubeFace} ${styles.left}`}>
                    <Image 
                      src={logos[3]} 
                      alt="Company logo" 
                      width={80}
                      height={40}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}