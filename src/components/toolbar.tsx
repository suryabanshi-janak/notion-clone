'use client';

import * as React from 'react';
import TextareaAutoSize from 'react-textarea-autosize';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { useToast } from '@/components/ui/use-toast';
import IconPicker from '@/components/icon-picker';
import { Button } from '@/components/ui/button';
import { Document } from '@prisma/client';
import { ImageIcon, Smile, X } from 'lucide-react';
import { useCoverImage } from '@/hooks/use-cover-image';

interface UpdateData {
  documentId: string;
  title?: string;
  icon?: string;
}

export default function Toolbar({
  initialData,
  preview,
}: {
  initialData: Document;
  preview?: boolean;
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { onOpen: onImageUpload } = useCoverImage();

  const inputRef = React.useRef<React.ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(initialData?.title);

  const { mutate: onUpdate } = useMutation({
    mutationFn: async (data: UpdateData) => {
      await axios.patch('/api/documents', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document'] });
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Document could not be updated',
        variant: 'destructive',
      });
    },
  });

  const { mutate: removeIcon } = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/documents/remove-icon', {
        documentId: initialData.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document'] });
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Icon could not be added',
        variant: 'destructive',
      });
    },
  });

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    onUpdate({ documentId: initialData.id, title: value || 'Untitled' });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) =>
    onUpdate({ documentId: initialData.id, icon });

  const onRemoveIcon = () => removeIcon();

  return (
    <div className='pl-[54px] group relative'>
      {!!initialData?.icon && !preview && (
        <div className='flex items-center gap-x-2 group/icon pt-6'>
          <IconPicker onChange={onIconSelect}>
            <p className='text-6xl hover:opacity-75 transition'>
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className='rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs'
            variant='outline'
            size='icon'
          >
            <X className='w-4 h-4' />
          </Button>
        </div>
      )}
      {!!initialData?.icon && preview && (
        <p className='text-6xl pt-6'>{initialData.icon}</p>
      )}
      <div className='opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4'>
        {!initialData?.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className='text-muted-foreground text-xs'
              variant='outline'
              size='sm'
            >
              <Smile className='h-4 w-4 mr-2' />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData?.coverImage && !preview && (
          <Button
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
            onClick={onImageUpload}
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutoSize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className='text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none'
        />
      ) : (
        <div
          onClick={enableInput}
          className='pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]'
        >
          {initialData?.title}
        </div>
      )}
    </div>
  );
}
