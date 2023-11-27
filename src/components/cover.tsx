'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ImageIcon, X } from 'lucide-react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useCoverImage } from '@/hooks/use-cover-image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEdgeStore } from '@/lib/edgestore';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { onReplace } = useCoverImage();

  const { mutate: removeCoverImage } = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/documents', {
        documentId: params.documentId,
        coverImage: null,
      });
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

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url,
      });
    }

    removeCoverImage();
  };

  return (
    <div
      className={cn(
        'w-full h-[35vh] relative group',
        !url && 'h-[12vh]',
        url && 'bg-muted'
      )}
    >
      {!!url && (
        <Image src={url} fill alt='cover-image' className='object-cover' />
      )}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2'>
          <Button
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
            onClick={() => onReplace(url)}
          >
            <ImageIcon className='h-4 w-4 mr-2' />
            Change cover
          </Button>
          <Button
            className='text-muted-foreground text-xs'
            variant='outline'
            size='sm'
            onClick={() => onRemove()}
          >
            <X className='h-4 w-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
