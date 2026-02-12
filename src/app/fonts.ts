// src/app/fonts.ts
import localFont from 'next/font/local';

export const galanoGrotesque = localFont({
  src: [
    {
      path: '../../public/fonts/GalanoGrotesque-Light-webfont.woff2',  // ← go up two levels
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GalanoGrotesque-Medium-webfont.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GalanoGrotesque-Bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-galano',
  display: 'swap',
});