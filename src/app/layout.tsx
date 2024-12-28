import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='antialiased'>
      <head>
        <title>Color Palette Generator | ThyReality</title>
        <meta
          name='Color Palette Generator'
          content='Generate beautiful color palettes for your design system. Powered by ThyReality.'
        />
      </head>
      <body className={cn(inter.className, 'bg-gray-50 dark:bg-gray-900')}>
        {children}
        <Toaster
          position='bottom-right'
          toastOptions={{
            style: {
              background: 'rgb(99 102 241)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  );
}
