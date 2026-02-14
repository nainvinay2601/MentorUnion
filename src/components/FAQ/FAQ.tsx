'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './FAQ.module.css';
import { gsap } from 'gsap';

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

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('bookings');
  const [openIndex, setOpenIndex] = useState<number>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

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

  const currentData = faqData[activeCategory];

  return (
    <section className={styles.container}>
      <div className={styles.meshBackground}>
        <Image
          src="/BG.png"
          alt=""
          fill
          className={styles.meshImage}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Frequently Asked <br/><span className={styles.titleItalic}>Questions</span>
          </h2>
        </div>

        <div className={styles.faqWrapper}>
          {/* Left Sidebar - Category Tabs */}
          <div className={styles.sidebar}>
            <div
              className={`${styles.tab} ${activeCategory === 'bookings' ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveCategory('bookings');
                setOpenIndex(0);
              }}
            >
              Bookings &<br />Rescheduling
            </div>

            <div
              className={`${styles.tab} ${activeCategory === 'techSupport' ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveCategory('techSupport');
                setOpenIndex(0);
              }}
            >
              Tech Support<br />& Navigation
            </div>

            <div
              className={`${styles.tab} ${activeCategory === 'mentorFeedback' ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveCategory('mentorFeedback');
                setOpenIndex(0);
              }}
            >
              Mentor,<br />Feedback &<br />Policies
            </div>
          </div>

          {/* Right Content - Accordions */}
          <div className={styles.accordionsWrapper}>
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