'use client';

import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Document } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface TitleProps {
  initialData: Document;
}

export default function Title({ initialData }: TitleProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const [title, setTitle] = React.useState(initialData?.title || 'Untitled');
  const [isEditing, setIsEditing] = React.useState(false);

  const { mutate: onUpdate } = useMutation({
    mutationFn: async (payload: { title: string; documentId: string }) => {
      return await axios.patch(`/api/documents`, payload);
    },
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document'] });
    },
  });

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    onUpdate({
      documentId: initialData.id,
      title: event.target.value,
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput();
    }
  };

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData?.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          value={title}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className='h-7 px-2 focus-visible:ring-transparent'
        />
      ) : (
        <Button
          onClick={enableInput}
          variant='ghost'
          size='sm'
          className='font-normal h-auto p-1'
        >
          <span className='truncate'>{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
}

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className='h-5 w-20 rounded-md' />;
};
