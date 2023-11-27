'use client';

import { Cover } from '@/components/cover';
import Toolbar from '@/components/toolbar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface DocumentIdPageProps {
  params: { documentId: string };
}
export default function DocumentIdPage({ params }: DocumentIdPageProps) {
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

  return (
    <div className='pb-40'>
      <Cover url={document?.coverImage} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document} />
      </div>
    </div>
  );
}
