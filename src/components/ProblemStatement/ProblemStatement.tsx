'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import styles from './ProblemStatement.module.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ProblemStatement() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const textBeforeRef = useRef(null);
  const textAfterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Split text into words and chars
      const splitBefore = new SplitText(textBeforeRef.current, { 
        type: 'words,chars',
        wordsClass: 'word',
        charsClass: 'char'
      });
      
      const splitAfter = new SplitText(textAfterRef.current, { 
        type: 'words,chars',
        wordsClass: 'word',
        charsClass: 'char'
      });

      // SET INITIAL VISIBILITY FOR LEFT SVG
      gsap.set(`.${styles.topLeftVector}`, { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // LEFT SVG - STARTS IMMEDIATELY AND VISIBLE
      const leftPath = document.querySelector(`.${styles.topLeftVector} .problem-path`) as SVGPathElement;
      if (leftPath) {
        const length = leftPath.getTotalLength();
        gsap.set(leftPath, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(leftPath, {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 2.5,
        }, 0);
      }

      // ANIMATE TEXT BEFORE with 3D rotation effect
      gsap.set(splitBefore.chars, { 
        opacity: 0, 
        y: 20,
        rotationX: -90,
        transformOrigin: '0% 50% -50'
      });
      
      tl.to(splitBefore.chars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.02,
        ease: 'back.out(1.7)',
        duration: 0.8,
      }, 0);

      // Fade out left SVG
      tl.to(`.${styles.topLeftVector}`, {
        opacity: 0,
        duration: 0.3
      }, 2.5);

      // RIGHT SVG - DRAWS UNTIL THE END
      const rightPaths = document.querySelectorAll(`.${styles.topRightVector} .problem-path`) as NodeListOf<SVGPathElement>;
      rightPaths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tl.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 4.5,
        }, 0.5);
      });

      // BACKGROUND turns BLACK
      tl.to(bgRef.current, {
        backgroundColor: '#000000',
        ease: 'none',
        duration: 1.0,
      }, 2.8);
      
      tl.to([textBeforeRef.current, textAfterRef.current], {
        color: '#ffffff',
        ease: 'none',
        duration: 1.0,
      }, 2.8);

      // SMOOTH TRANSITION - scale and blur out first text
      tl.to(splitBefore.chars, {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(10px)',
        rotationX: 90,
        stagger: 0.015,
        ease: 'power2.inOut',
        duration: 0.4,
      }, 3.0);

      // Set text after container to visible
      tl.set(textAfterRef.current, { opacity: 1 }, 3.2);

      // SMOOTH TRANSITION - scale and unblur second text with 3D rotation
      gsap.set(splitAfter.chars, { 
        opacity: 0, 
        scale: 1.2, 
        filter: 'blur(10px)',
        rotationX: -90,
        transformOrigin: '0% 50% -50'
      });
      
      tl.to(splitAfter.chars, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        rotationX: 0,
        stagger: 0.02,
        ease: 'back.out(1.7)',
        duration: 0.8,
      }, 3.4);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={bgRef} className={styles.background} />
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <h2 ref={textBeforeRef} className={styles.textBefore}>
            Still Guessing Your Way Through Career Choices, Alone?
          </h2>
          <h2 ref={textAfterRef} className={styles.textAfter}>
            Now you don&apos;t have to!
          </h2>
        </div>

        {/* Top-left SVG */}
        <svg className={styles.topLeftVector} viewBox="0 0 1313 715" fill="none">
          <path
            className="problem-path"
            opacity="0.92"
            d="M1310.84 103.374C1250.88 87.7624 554.79 -117.798 645.795 103.326C667.262 155.489 723.095 226.34 713.961 286.861C705.963 339.862 642.859 333.322 612.2 333.862C511.834 335.633 405.998 320.261 310.285 347.282C249.123 364.548 252.178 409.059 293.931 481.529C335.049 552.894 390.649 612.584 426.381 689.218C450.539 741.03 388.022 693.434 380.678 688.732C252.406 606.613 126.818 510.196 1.50009 415.378"
            stroke="url(#gradient1)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient1" x1="-187.959" y1="425.645" x2="1042.21" y2="84.302" gradientUnits="userSpaceOnUse">
              <stop stopColor="#39B6D8" />
              <stop offset="0.5" stopColor="#F7D344" />
              <stop offset="1" stopColor="#E38330" />
            </linearGradient>
          </defs>
        </svg>

        {/* Top-right SVG */}
        <svg className={styles.topRightVector} viewBox="0 0 2133 1464" fill="none">
          <path
            className="problem-path"
            opacity="0.92"
            d="M2099.14 207.339C2039.77 207.76 1344.46 190.133 1483.54 372.241C1516.35 415.2 1578.25 453.282 1592.16 525.219C1625.76 699.068 1145.5 553.239 1093 694.239"
            stroke="url(#gradient2)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            className="problem-path"
            opacity="0.92"
            d="M33.1153 1256.15C92.4857 1255.73 787.792 1273.36 648.712 1091.25C615.904 1048.29 554 1010.21 540.094 938.271C506.49 764.422 855.116 981.12 987.254 863.254C1043.41 813.164 1060.5 776.974 1092 695.974"
            stroke="url(#gradient3)"
            strokeWidth="4"
            strokeLinecap="square"
            fill="none"
          />
          <defs>
            <linearGradient id="gradient2" x1="1107.52" y1="769.26" x2="1841.57" y2="241.999" gradientUnits="userSpaceOnUse">
              <stop stopColor="#39B6D8" />
              <stop offset="0.5" stopColor="#F7D344" />
              <stop offset="1" stopColor="#E38330" />
            </linearGradient>
            <linearGradient id="gradient3" x1="1024.75" y1="694.255" x2="290.706" y2="1221.52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#39B6D8" />
              <stop offset="0.5" stopColor="#F7D344" />
              <stop offset="1" stopColor="#E38330" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}