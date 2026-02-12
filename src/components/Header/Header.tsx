
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Mentor Union Logo" width={120} height={33} />
        </Link>

        {/* Nav */}
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
      </div>
    </header>
  );
}