'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './JourneySlider.module.css';

interface Card {
  id: number;
  image: string;
}

const cards: Card[] = [
  { id: 1, image: '/sliderImage/primary.svg' },
  { id: 2, image: '/sliderImage/primaryLeft.svg' },
  { id: 3, image: '/sliderImage/primaryRight.svg' },
  { id: 4, image: '/sliderImage/left.svg' },
  { id: 5, image: '/sliderImage/right.svg' },
];

export default function JourneySlider() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const getVisibleCards = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + cards.length) % cards.length;
      visible.push({ card: cards[index], position: i });
    }
    return visible;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setCurrentTranslate(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (currentTranslate > threshold) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
    } else if (currentTranslate < -threshold) {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }

    setCurrentTranslate(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % cards.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Goals, Our Mentors</h2>
        <p className={styles.subtitle}>Lets Make it Happen</p>
      </div>

      <div
        className={styles.cardsWrapper}
        ref={wrapperRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        style={{
          transform: isDragging ? `translateX(${currentTranslate}px)` : 'translateX(0)',
          transition: isDragging ? 'none' : 'transform 0.5s ease',
        }}
      >
        {getVisibleCards().map(({ card, position }) => (
          <div
            key={`${card.id}-${position}`}
            className={`${styles.card} ${
              position === 0 ? styles.cardActive :
              position === -1 || position === 1 ? styles.cardAdjacent :
              styles.cardFar
            }`}
            onClick={() => {
              if (position !== 0) {
                setActiveIndex((activeIndex + position + cards.length) % cards.length);
              }
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
        ))}
      </div>
    </section>
  );
}