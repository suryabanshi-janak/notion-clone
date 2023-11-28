'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Error() {
  return (
    <div className='h-full flex items-center justify-center flex-col space-y-4'>
      <Image
        height={300}
        width={300}
        alt='Error'
        src='/error.png'
        className='dark:hidden'
      />
      <Image
        height={300}
        width={300}
        alt='Error'
        src='/error-dark.png'
        className='hidden dark:block'
      />
      <h2 className='text-xl font-medium'>Something went wrong</h2>
      <Button asChild>
        <Link href='/documents'>Go back</Link>
      </Button>
    </div>
  );
}
