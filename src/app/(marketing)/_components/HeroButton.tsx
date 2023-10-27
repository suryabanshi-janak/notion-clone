'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroButton() {
  return (
    <>
      <Button>
        Get Jotion free
        <ArrowRight className='w-4 h-4 ml-2' />
      </Button>
    </>
  );
}
