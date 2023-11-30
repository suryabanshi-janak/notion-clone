'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Cover } from '@/components/cover';
import Toolbar from '@/components/toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import useDocumentUpdate from '@/hooks/use-document-update';

interface DocumentIdPageProps {
  params: { documentId: string };
  editable?: boolean;
}

export default function DocumentIdPage({
  params,
  editable,
}: DocumentIdPageProps) {
  const Editor = useMemo(
    () => dynamic(() => import('@/components/editor'), { ssr: false }),
    []
  );

  const { onUpdate } = useDocumentUpdate();

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

  const onChange = (content: string) => {
    onUpdate({ documentId: params.documentId, content });
  };

  if (isPending) {
    return (
      <div>
        <Cover.Skeleton />
        <div className='md:max-w-3xl lg:max-w-4xl mx-auto mt-10'>
          <div className='space-y-4 pl-8 pt-4'>
            <Skeleton className='h-14 w-[50%]' />
            <Skeleton className='h-4 w-[80%]' />
            <Skeleton className='h-4 w-[40%]' />
            <Skeleton className='h-4 w-[60%]' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='pb-40'>
      <Cover preview url={document?.coverImage} />
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
}
