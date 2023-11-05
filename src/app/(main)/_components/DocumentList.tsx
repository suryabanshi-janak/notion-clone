'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { FileIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import NavItem from './NavItem';
import { Document } from '@prisma/client';
import { cn } from '@/lib/utils';

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Document[];
}

export default function DocumentList({
  parentDocumentId,
  level = 0,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { data: documents, isPending } = useQuery({
    queryFn: async () => {
      const res = await axios.get<{ documents: Document[] }>('/api/document', {
        params: parentDocumentId,
      });
      return res;
    },
    queryKey: ['documents'],
    select: ({ data }) => data?.documents,
  });

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (isPending) {
    return (
      <>
        <NavItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <NavItem.Skeleton level={level} />
            <NavItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {/* <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
      >
        No pages inside
      </p> */}
      {documents?.map((document) => (
        <div key={document.id}>
          <NavItem
            id={document.id}
            icon={FileIcon}
            label={document.title}
            onClick={() => onRedirect(document.id)}
            documentIcon={document.icon}
            active={params.documentId === document.id}
            level={level}
            onExpand={() => onExpand(document.id)}
            expanded={expanded[document.id]}
          />
          {expanded[document.id] && (
            <DocumentList parentDocumentId={document.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
