'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <Image src="/Logo.svg" alt="Mentor Union Logo" width={120} height={33} />
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            <Link href="/institutions" className={styles.navLink}>
              For Institutions
            </Link>
            <Link href="/become-mentor" className={styles.navLink}>
              Become a Mentor
            </Link>
            <Link href="/login" className={`${styles.navLink} ${styles.button}`}>
              Login <Image src='/svgs/MU-Arrow-Main.svg' width={12} height={12} alt='Arrow Icon' className={styles.arrowIcon} />
            </Link>
          </nav>

          {/* Hamburger Menu - Mobile Only */}
          <button 
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
            <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <Link 
            href="/institutions" 
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            For Institutions
          </Link>
          <Link 
            href="/become-mentor" 
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Become a Mentor
          </Link>
          <Link 
            href="/login" 
            className={`${styles.mobileNavLink} ${styles.mobileNavLinkButton}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login <Image src='/svgs/MU-Arrow-Main.svg' width={12} height={12} alt='Arrow Icon' className={styles.arrowIcon} />
          </Link>
        </nav>
      </div>
    </>
  );
}