import Hero from './_components/Hero';
import Logo from './_components/Logo';
import { Button } from '@/components/ui/button';

export default function MarketingPage() {
  return (
    <div className='min-h-full flex flex-col'>
      <Hero />

      <footer className='z-50 flex items-center w-full py-4 px-6 bg-background'>
        <Logo />
        <div className='md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground'>
          <Button variant='link' size='sm'>
            Privacy Policy
          </Button>
          <Button variant='link' size='sm'>
            Terms & Conditions
          </Button>
        </div>
      </footer>
    </div>
  );
}
