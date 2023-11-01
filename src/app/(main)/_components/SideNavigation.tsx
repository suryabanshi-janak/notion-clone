'use client';

import * as React from 'react';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import UserItem from './UserItem';
import { SessionUser } from '@/types/auth';

export default function SideNavigation({ user }: { user: SessionUser }) {
  const pathname = usePathname();

  const isMobile = useMediaQuery('(max-width: 768px)');

  const isResizingRef = React.useRef(false);
  const sidebarRef = React.useRef<React.ElementRef<'aside'>>(null);
  const navbarRef = React.useRef<React.ElementRef<'div'>>(null);

  const [isResetting, setIsResetting] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(isMobile);

  React.useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  React.useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)'
      );
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  };
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full flex flex-col bg-secondary overflow-y-auto relative z-[99999] w-60',
          isResetting && 'transition-all ease-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div
          onClick={collapse}
          role='button'
          className={cn(
            'h-6 w-6 text-muted-foreground absolute top-3 right-3 transition opacity-0 group-hover/sidebar:opacity-100 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronsLeft className='h-6 w-6' />
        </div>
        <div>
          <UserItem user={user} />
        </div>
        <div className='mt-4'>
          <p>Documents</p>
        </div>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='opacity-0 group-hover/sidebar:opacity-100 h-full absolute w-1 transition cursor-ew-resize bg-primary/10 top-0 right-0'
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && (
            <MenuIcon
              role='button'
              onClick={resetWidth}
              className='w-6 h-6 text-muted-foreground'
            />
          )}
        </nav>
      </div>
    </>
  );
}
