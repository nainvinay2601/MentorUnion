'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './FAQ.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface FAQItem {
  question: string;
  answer: string;
}

interface CategoryData {
  title: string;
  faqs: FAQItem[];
}

const faqData: Record<string, CategoryData> = {
  bookings: {
    title: 'Bookings & Rescheduling',
    faqs: [
      {
        question: 'How do I book a mentorship call?',
        answer: 'You can book a mentorship call by logging into mentorunion.org, selecting your preferred mentor using filters like domain, and confirming an available slot. Booking is instant, designed to make real guidance just a few clicks away.'
      },
      {
        question: 'Can I book more than one call at a time?',
        answer: 'Yes, you can book multiple calls with different mentors or schedule recurring sessions with the same mentor based on availability.'
      },
      {
        question: 'I can\'t find a mentor in my domain. What should I do?',
        answer: 'Try broadening your search filters or reach out to our support team who can help match you with a suitable mentor in your field.'
      },
      {
        question: 'I have credits, but can\'t book a session. Why?',
        answer: 'This could be due to mentor availability or technical issues. Please check your account status or contact support for assistance.'
      },
      {
        question: 'Can I reschedule a session?',
        answer: 'Yes, you can reschedule sessions up to 24 hours before the scheduled time through your dashboard.'
      },
      {
        question: 'What\'s the cancellation policy?',
        answer: 'Sessions can be cancelled up to 24 hours in advance for a full credit refund. Cancellations within 24 hours may result in credit forfeiture.'
      },
      {
        question: 'What happens if I miss a session without prior intimation?',
        answer: 'Missed sessions without prior notice will result in loss of credits and may affect your ability to book future sessions.'
      }
    ]
  },
  techSupport: {
    title: 'Tech Support & Navigation',
    faqs: [
      {
        question: 'What browsers are supported?',
        answer: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of Chrome.'
      },
      {
        question: 'How do I join a video call?',
        answer: 'You\'ll receive a meeting link via email 15 minutes before your session. Simply click the link to join directly from your browser - no downloads required.'
      },
      {
        question: 'I\'m having audio/video issues during the call. What should I do?',
        answer: 'Check your device permissions, ensure your browser has access to camera and microphone, and try refreshing the page. If issues persist, contact our technical support.'
      },
      {
        question: 'Can I access the platform on mobile?',
        answer: 'Yes, our platform is fully responsive and works on all mobile devices through your mobile browser.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Navigate to Settings > Profile from your dashboard to update your personal information, preferences, and goals.'
      },
      {
        question: 'Where can I find my session history?',
        answer: 'Your complete session history is available in the Dashboard under "Past Sessions" with recordings and notes from each call.'
      }
    ]
  },
  mentorFeedback: {
    title: 'Mentor, Feedback & Policies',
    faqs: [
      {
        question: 'How are mentors vetted?',
        answer: 'All mentors go through a rigorous screening process including experience verification, background checks, and mock sessions to ensure quality guidance.'
      },
      {
        question: 'Can I request a specific mentor for future sessions?',
        answer: 'Yes, you can favorite mentors and request them directly for future bookings. You\'ll receive notifications when they have available slots.'
      },
      {
        question: 'How do I provide feedback about my session?',
        answer: 'After each session, you\'ll receive a feedback form via email. You can also submit feedback anytime through your session history.'
      },
      {
        question: 'What if I\'m not satisfied with a mentorship session?',
        answer: 'We take satisfaction seriously. Contact our support team within 48 hours of the session, and we\'ll work to resolve your concerns, which may include credit refunds.'
      },
      {
        question: 'Are session recordings available?',
        answer: 'Yes, all sessions are recorded (with consent) and available in your dashboard within 24 hours for future reference.'
      },
      {
        question: 'What\'s your privacy policy regarding session content?',
        answer: 'All session content is confidential and encrypted. We never share your personal information or session details with third parties without explicit consent.'
      },
      {
        question: 'How do I report inappropriate behavior?',
        answer: 'Use the "Report Issue" button in your session details or contact support immediately. We have zero tolerance for inappropriate conduct.'
      }
    ]
  }
};

const categories = [
  { key: 'bookings', label: 'Bookings & Rescheduling' },
  { key: 'techSupport', label: 'Tech Support & Navigation' },
  { key: 'mentorFeedback', label: 'Mentor, Feedback & Policies' }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('bookings');
  const [openIndex, setOpenIndex] = useState<number>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const accordionsRef = useRef<HTMLDivElement>(null);
  const tabSliderRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => {
    const wasOpen = openIndex === index;
    const targetIndex = wasOpen ? -1 : index;

    // Close current
    if (openIndex !== -1 && contentRefs.current[openIndex]) {
      gsap.to(contentRefs.current[openIndex], {
        height: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });

      if (iconRefs.current[openIndex]) {
        gsap.to(iconRefs.current[openIndex], {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }

    // Open new
    if (!wasOpen && contentRefs.current[index]) {
      const content = contentRefs.current[index];
      gsap.set(content, { height: 'auto' });
      const height = content.offsetHeight;
      gsap.fromTo(
        content,
        { height: 0 },
        {
          height: height,
          duration: 0.4,
          ease: 'power2.inOut'
        }
      );

      if (iconRefs.current[index]) {
        gsap.to(iconRefs.current[index], {
          rotation: 180,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    }

    setOpenIndex(targetIndex);
  };

  const handleCategoryChange = (categoryKey: string) => {
    setActiveCategory(categoryKey);
    setOpenIndex(0);

    // Scroll active tab into view on mobile
    requestAnimationFrame(() => {
      if (tabSliderRef.current) {
        const activeTab = tabSliderRef.current.querySelector(`[data-category="${categoryKey}"]`);
        if (activeTab) {
          activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });
  };

  useEffect(() => {
    // Animate first accordion on mount
    if (contentRefs.current[0]) {
      const content = contentRefs.current[0];
      gsap.set(content, { height: 'auto' });
      const height = content.offsetHeight;
      gsap.fromTo(
        content,
        { height: 0 },
        {
          height: height,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.2
        }
      );
    }
  }, [activeCategory]);

  // Scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title SplitText animation
      if (titleRef.current) {
        const titleSplit = new SplitText(titleRef.current, { 
          type: 'words,chars',
          wordsClass: 'word',
          charsClass: 'char'
        });

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
      }

      // Sidebar tabs animation
      gsap.fromTo(
        `.${styles.tab}`,
        {
          x: -60,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: 'top 75%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Accordions animation
      gsap.fromTo(
        `.${styles.accordion}`,
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordionsRef.current,
            start: 'top 75%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, [activeCategory]);

  const currentData = faqData[activeCategory];

  return (
    <section ref={containerRef} className={styles.container}>
      <div className={styles.meshBackground}>
        <Image
          src="/BG.png"
          alt=""
          fill
          className={styles.meshImage}
        />
      </div>

      <div className={styles.content}>
        <div ref={headerRef} className={styles.header}>
          <h2 ref={titleRef} className={styles.title}>
            Frequently Asked <br/><span className={styles.titleItalic}>Questions</span>
          </h2>
        </div>

        <div className={styles.faqWrapper}>
          {/* Desktop Sidebar */}
          <div ref={sidebarRef} className={styles.sidebar}>
            <div
              className={`${styles.tab} ${activeCategory === 'bookings' ? styles.tabActive : ''}`}
              onClick={() => handleCategoryChange('bookings')}
            >
              Bookings &<br />Rescheduling
            </div>
            <div
              className={`${styles.tab} ${activeCategory === 'techSupport' ? styles.tabActive : ''}`}
              onClick={() => handleCategoryChange('techSupport')}
            >
              Tech Support<br />& Navigation
            </div>
            <div
              className={`${styles.tab} ${activeCategory === 'mentorFeedback' ? styles.tabActive : ''}`}
              onClick={() => handleCategoryChange('mentorFeedback')}
            >
              Mentor,<br />Feedback &<br />Policies
            </div>
          </div>

          {/* Mobile Tab Slider */}
          <div ref={tabSliderRef} className={styles.tabSlider}>
            {categories.map((category) => (
              <button
                key={category.key}
                data-category={category.key}
                className={`${styles.tabSliderItem} ${activeCategory === category.key ? styles.tabSliderItemActive : ''}`}
                onClick={() => handleCategoryChange(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Right Content - Accordions */}
          <div ref={accordionsRef} className={styles.accordionsWrapper}>
            {currentData.faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.accordion} ${openIndex === index ? styles.accordionOpen : ''}`}
              >
                <button
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={styles.accordionQuestion}>{faq.question}</span>
                  <span 
                    className={styles.accordionIcon}
                    ref={(el) => { iconRefs.current[index] = el; }}
                  >
                    <Image
                      src={openIndex === index ? '/svgs/close.svg' : '/svgs/open.svg'}
                      alt="Toggle"
                      width={42}
                      height={42}
                    />
                  </span>
                </button>
                <div 
                  className={styles.accordionContent}
                  ref={(el) => { contentRefs.current[index] = el; }}
                  style={{ height: 0, overflow: 'hidden' }}
                >
                  <div className={styles.accordionAnswer}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}