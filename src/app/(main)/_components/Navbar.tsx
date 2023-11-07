'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MenuIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import Title from './Title';

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export default function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams();

  const { data: document, isPending } = useQuery({
    queryFn: async () => {
      const res = await axios.get('/api/documents', {
        params: { documentId: params.documentId },
      });
      return res;
    },
    queryKey: ['document'],
    select: ({ data }) => data.document,
  });

  if (isPending) {
    return (
      <nav className='bg-background px-3 py-2 w-full flex items-center justify-between'>
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) return null;

  return (
    <nav className='bg-background px-3 py-2 w-full flex items-center gap-x-4'>
      {isCollapsed && (
        <MenuIcon
          role='button'
          onClick={onResetWidth}
          className='h-6 w-6 text-muted-foreground'
        />
      )}
      <div className='flex items-center justify-between w-full'>
        <Title initialData={document} />
      </div>
    </nav>
  );
}
