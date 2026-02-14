'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import styles from './JourneySlider.module.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Card {
  id: number;
  image: string;
}

const cards: Card[] = [
  { id: 1, image: '/sliderImage/left.png' },
  { id: 2, image: '/sliderImage/primaryLeft.png' },
  { id: 3, image: '/sliderImage/primary.png' },
  { id: 4, image: '/sliderImage/primaryRight.png' },
  { id: 5, image: '/sliderImage/right.png' },
  { id: 6, image: '/sliderImage/left.png' },
  { id: 7, image: '/sliderImage/primaryLeft.png' },
  { id: 8, image: '/sliderImage/primary.png' },
  { id: 9, image: '/sliderImage/primaryRight.png' },
  { id: 10, image: '/sliderImage/right.png' },
];

export default function JourneySlider() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const calculateVisibleCards = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      if (width >= 1600) {
        setVisibleCount(7);
      } else if (width >= 1200) {
        setVisibleCount(5);
      } else if (width >= 768) {
        setVisibleCount(5);
      } else if (width >= 480) {
        setVisibleCount(3);
      } else {
        setVisibleCount(3);
      }
    };

    calculateVisibleCards();
    window.addEventListener('resize', calculateVisibleCards);
    return () => window.removeEventListener('resize', calculateVisibleCards);
  }, []);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Split text animation for title
      const titleSplit = new SplitText(titleRef.current, { 
        type: 'words,chars',
        wordsClass: 'word',
        charsClass: 'char'
      });

      // Animate title characters
      gsap.from(titleSplit.chars, {
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

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });

      // Animate cards wrapper
      gsap.from(wrapperRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getVisibleCards = () => {
    const visible = [];
    const halfVisible = Math.floor(visibleCount / 2);
    for (let i = -halfVisible; i <= halfVisible; i++) {
      const index = (activeIndex + i + cards.length) % cards.length;
      visible.push({ card: cards[index], position: i });
    }
    return visible;
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 80;
    const velocity = currentX - startX;

    if (Math.abs(velocity) > threshold) {
      if (velocity < 0) {
        // Swiped left - go to next card
        setActiveIndex((prev) => (prev + 1) % cards.length);
      } else {
        // Swiped right - go to previous card
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      }
    }

    setDragOffset(0);
  };

  const getCardTransform = (position: number) => {
    if (!isDragging) return 0;
    // Smooth drag factor - less movement for cards further from center
    const dragFactor = 1 - Math.abs(position) * 0.15;
    return dragOffset * dragFactor;
  };

  const getCardScale = (position: number) => {
    if (!isDragging) return 1;
    const absPosition = Math.abs(position);
    const dragProgress = Math.abs(dragOffset) / 200; // Normalize drag distance

    // Scale up adjacent cards as we drag towards them
    if (dragOffset < 0 && position === 1) {
      return 1 + dragProgress * 0.1;
    } else if (dragOffset > 0 && position === -1) {
      return 1 + dragProgress * 0.1;
    } else if (position === 0) {
      return 1 - dragProgress * 0.05;
    }
    return 1;
  };

  return (
    <div className={styles.container}>
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.header}>
          <h2 ref={titleRef} className={styles.title}>Your Goals, Our Mentors</h2>
          <p ref={subtitleRef} className={styles.subtitle}>Lets Make it Happen</p>
        </div>

        <div
          className={styles.cardsWrapper}
          ref={wrapperRef}
          onMouseDown={(e) => {
            e.preventDefault();
            handleDragStart(e.clientX);
          }}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {getVisibleCards().map(({ card, position }) => {
            const absPosition = Math.abs(position);
            const cardTransform = getCardTransform(position);
            const cardScale = getCardScale(position);

            return (
              <div
                key={`${card.id}-${position}`}
                className={`${styles.card} ${
                  position === 0 ? styles.cardActive :
                  absPosition === 1 ? styles.cardAdjacent :
                  absPosition === 2 ? styles.cardFar :
                  styles.cardFarther
                }`}
                style={{
                  transform: `translateX(${cardTransform}px) scale(${cardScale})`,
                  transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className={styles.cardImageWrapper}>
                  <Image 
                    src={card.image} 
                    alt={`Slide ${card.id}`}
                    fill
                    className={styles.cardImage}
                    draggable={false}
                  />
                  {position !== 0 && <div className={styles.cardOverlay} />}
                </div>
                {position === 0 && <div className={styles.activeHighlight} />}
              </div>
            );
          })}
        </div>
      </section>
      <div className={styles.backgroundSection} />
    </div>
  );
}