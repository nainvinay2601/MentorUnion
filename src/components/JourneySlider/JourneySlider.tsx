'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './JourneySlider.module.css';

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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getVisibleCards = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + cards.length) % cards.length;
      visible.push({ card: cards[index], position: i });
    }
    return visible;
  };

  useEffect(() => {
    // Auto-advance every 3 seconds
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Clear auto-advance on manual interaction
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % cards.length);
      }

      // Restart auto-advance after 5 seconds of inactivity
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % cards.length);
        }, 3000);
      }, 5000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCardClick = (position: number) => {
    if (position !== 0) {
      // Clear auto-advance on manual interaction
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setActiveIndex((activeIndex + position + cards.length) % cards.length);

      // Restart auto-advance after 5 seconds
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % cards.length);
        }, 3000);
      }, 5000);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Goals, Our Mentors</h2>
          <p className={styles.subtitle}>Lets Make it Happen</p>
        </div>

        <div className={styles.cardsWrapper}>
          {getVisibleCards().map(({ card, position }) => (
            <div
              key={`${card.id}-${position}`}
              className={`${styles.card} ${
                position === 0 ? styles.cardActive :
                position === -1 || position === 1 ? styles.cardAdjacent :
                styles.cardFar
              }`}
              onClick={() => handleCardClick(position)}
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
          ))}
        </div>
      </section>
      
      <div className={styles.backgroundSection} />
    </div>
  );
}