import Image from 'next/image';
import HeroButton from './HeroButton';

export default function Hero() {
  return (
    <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
      <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
          Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
          <span className='underline'>Jotion</span>
        </h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
          Jotion is the connected workspace where <br />
          better, faster work happens.
        </h3>

        <HeroButton />
      </div>

      <div className='flex items-center justify-center max-w-5xl flex-col'>
        <div className='flex items-center'>
          <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
            <Image
              src='/documents.png'
              fill
              className='object-contain'
              alt='documents'
            />
          </div>
          <div className='relative h-[400px] w-[400px] hidden md:block'>
            <Image
              src='/reading.png'
              fill
              className='object-contain'
              alt='documents'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
