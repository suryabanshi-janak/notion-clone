'use client';

import * as React from 'react';
import { Check, Copy, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useDocumentUpdate from '@/hooks/use-document-update';
import { useOrigin } from '@/hooks/use-origin';
import { Document } from '@prisma/client';

export default function Publish({ initialData }: { initialData: Document }) {
  const origin = useOrigin();
  const { onUpdate, isPending } = useDocumentUpdate();

  const [copied, setCopied] = React.useState<boolean>(false);

  const url = `${origin}/preview/${initialData.id}`;

  const onPublish = () => {
    onUpdate({ documentId: initialData.id, isPublished: true });
  };

  const onUnpublish = () => {
    onUpdate({ documentId: initialData.id, isPublished: false });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='ghost'>
          Publish
          {initialData.isPublished && (
            <Globe className='text-sky-500 w-4 h-4 ml-2' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-72' align='end' alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
              <Globe className='text-sky-500 animate-pulse w-4 h-4' />
              <p className='text-xs font-medium text-sky-500'>
                This note is live on web.
              </p>
            </div>
            <div className='flex items-center'>
              <input
                className='flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate'
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className='h-8 rounded-l-none'
              >
                {copied ? (
                  <Check className='h-4 w-4' />
                ) : (
                  <Copy className='h-4 w-4' />
                )}
              </Button>
            </div>
            <Button
              size='sm'
              className='w-full text-xs'
              disabled={isPending}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Globe className='w-8 h-8 mb-2 text-muted-foreground' />
            <p className='text-sm font-medium mb-2'>Publish this note</p>
            <span className='text-xs text-muted-foreground mb-4'>
              Share your work with others.
            </span>
            <Button
              onClick={onPublish}
              className='text-xs w-full'
              disabled={isPending}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
