import Image from 'next/image';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth-option';

async function DocumentPage() {
  const session = await getAuthSession();

  return (
    <div className='h-full flex items-center justify-center flex-col space-y-4'>
      <Image
        src='/empty.png'
        height='300'
        width='300'
        alt='Empty'
        className='dark:hidden'
      />
      <Image
        src='/empty-dark.png'
        height='300'
        width='300'
        alt='Empty'
        className='hidden dark:block'
      />
      <h2 className='text-xl font-medium'>
        Welcome to {session?.user.name}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  );
}

export default DocumentPage;
