import { PropsWithChildren } from 'react';
import Navbar from './_components/Navbar';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div className='h-full'>
      <Navbar />
      <main className='h-full pt-40'>{children}</main>
    </div>
  );
}
