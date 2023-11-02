import Image from 'next/image';

import { getAuthSession } from '@/lib/auth-option';
import CreateNoteButton from '../../_components/CreateNoteButton';

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
      <CreateNoteButton />
    </div>
  );
}

export default DocumentPage;
