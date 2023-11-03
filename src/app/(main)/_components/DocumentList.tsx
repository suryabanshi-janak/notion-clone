'use client';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Document } from '@prisma/client';
import NavItem from './NavItem';
import { FileIcon } from 'lucide-react';

export default function DocumentList() {
  const { data: documents } = useQuery({
    queryFn: async () => {
      const res = await axios.get<{ documents: Document[] }>('/api/document');
      return res;
    },
    queryKey: ['documents'],
    select: ({ data }) => data?.documents,
  });

  return (
    <div>
      {documents?.map((document) => (
        <div key={document.id}>
          <NavItem icon={FileIcon} label={document.title} onClick={() => {}} />
        </div>
      ))}
    </div>
  );
}
