'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

// Custom hook to detect when element is in view
function useInView(options: { threshold?: number; triggerOnce?: boolean } = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.triggerOnce) observer.disconnect();
        } else if (!options.triggerOnce) {
          setInView(false);
        }
      },
      { threshold: options.threshold ?? 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options.threshold, options.triggerOnce]);

  return [ref, inView] as const;
}

interface Stat {
  value: number | string;
  label: string;
  suffix: string;
  isRatio?: boolean;
  useComma?: boolean;
}

interface StatItemProps {
  stat: Stat;
  inView: boolean;
  index: number;
}

function StatItem({ stat, inView, index }: StatItemProps) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || stat.isRatio || !valueRef.current) return;

    const duration = 2800; // 2.8s for smooth luxurious feel
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic → starts fast, slows down beautifully at the end
      const eased = 1 - Math.pow(1 - progress, 3);

      const target = typeof stat.value === 'number' ? stat.value : 0;
      const current = Math.floor(eased * target);

      if (valueRef.current) {
        valueRef.current.textContent = stat.useComma ? current.toLocaleString() : current.toString();
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Final exact value
        if (valueRef.current) {
          valueRef.current.textContent = stat.useComma
            ? target.toLocaleString()
            : target.toString();
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [inView, stat.value, stat.isRatio, stat.useComma]);

  return (
    <div className={styles.statItem}>
      <h3 className={styles.statValue}>
        {stat.isRatio ? (
          stat.value
        ) : (
          <>
            <span ref={valueRef}>0</span>
            {stat.suffix}
          </>
        )}
      </h3>
      <p className={styles.statLabel}>{stat.label}</p>
      {index < stats.length - 1 && <div className={styles.divider} />}
    </div>
  );
}

const stats: Stat[] = [
  {
    value: '1:1 Access',
    label: 'no middle layers',
    suffix: ' Access',
    isRatio: true,
  },
  {
    value: 94,
    label: 'mentees found unmatched clarity',
    suffix: '%',
  },
  {
    value: 650,
    label: 'mentors, one platform',
    suffix: '+',
  },
  {
    value: 3,
    label: 'result in one breakthrough',
    suffix: ' Calls',
  },
  {
    value: 14000,
    label: 'completed calls',
    suffix: '+',
    useComma: true,
  },
];

export default function Stats() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} inView={inView} index={index} />
        ))}
      </div>
    </section>
  );
}