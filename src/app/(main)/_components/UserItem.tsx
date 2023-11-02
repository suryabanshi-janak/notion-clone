'use client';

import { ChevronsLeftRight } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/utils';
import { SessionUser } from '@/types/auth';

export default function UserItem({ user }: { user: SessionUser }) {
  const onLogout = () => signOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role='button'
          className='flex items-center text-sm w-full bg-primary/5 p-3'
        >
          <div className='gap-x-2 flex items-center max-w-[70%]'>
            <Avatar className='w-6 h-6'>
              <AvatarImage src={user?.image ?? ''} />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <span className='text-start font-medium line-clamp-1'>
              {user?.name}&apos;s Jotion
            </span>
          </div>
          <ChevronsLeftRight className='h-4 w-4 ml-2 text-muted-foreground rotate-90' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-80'
        align='start'
        alignOffset={11}
        forceMount
      >
        <div className='flex flex-col space-y-4 p-2'>
          <p className='text-xs font-medium leading-none text-muted-foreground'>
            {user?.email}
          </p>
          <div className='flex items-center gap-x-2'>
            <div className='rounded-md bg-secondary p-1'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user?.image ?? ''} />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className='space-y-1'>
              <p className='text-sm line-clamp-1'>{user?.name}&apos;s Jotion</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          className='w-full cursor-pointer text-muted-foreground'
        >
          <Button
            variant='ghost'
            className='focus-visible:ring-0 focus-visible:ring-offset-0'
            onClick={onLogout}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
