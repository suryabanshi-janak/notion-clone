'use client';

import useScrollTop from '@/hooks/use-scroll-top';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import { AuthDialog } from '@/components/auth/auth-dialog';
import { AUTH_TYPE } from '@/types/auth';

export default function Navbar() {
  const scrolled = useScrollTop();

  return (
    <nav
      className={cn(
        'z-50 fixed top-0 flex items-center w-full px-6 py-4 bg-background',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        <AuthDialog />
        <AuthDialog type={AUTH_TYPE.SIGNUP} />
        <ModeToggle />
      </div>
    </nav>
  );
}
