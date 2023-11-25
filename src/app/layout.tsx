import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jotion',
  description: 'The connected workspace where better, faster work happens.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: './logo.svg',
        href: './logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: './logo-dark.svg',
        href: './logo-dark.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <EdgeStoreProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <main className='h-full'>{children}</main>
              <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
