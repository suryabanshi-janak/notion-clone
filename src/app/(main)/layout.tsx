import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth-option';
import SideNavigation from './_components/SideNavigation';

export default async function layout({ children }: React.PropsWithChildren) {
  const session = await getAuthSession();

  if (!session?.user) return redirect('/');

  return (
    <div className='h-full flex dark:bg-[#1F1F1F]'>
      <SideNavigation />
      <main className='flex-1 h-full overflow-y-auto'>{children}</main>
    </div>
  );
}
