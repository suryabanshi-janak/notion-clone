'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { SingleImageDropzone } from '@/components/single-image-dropzone';
import { useToast } from '@/components/ui/use-toast';

import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgestore';

interface UpdateData {
  documentId: string;
  coverImage: string;
}

export default function CoverImageModal() {
  const params = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isOpen, onClose, onOpen, url: coverImageUrl } = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = React.useState<File>();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const { mutate: onUpdate } = useMutation({
    mutationFn: async (data: UpdateData) => {
      return await axios.patch('/api/documents', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document'] });
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Image couldnot be uploaded',
        variant: 'destructive',
      });
    },
  });

  const resetState = () => {
    setIsSubmitting(false);
    setFile(undefined);
    onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImageUrl,
        },
      });

      if (params?.documentId && res?.url) {
        onUpdate({
          documentId: params.documentId as string,
          coverImage: res.url,
        });
      }

      resetState();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
        </DialogHeader>

        <SingleImageDropzone
          className='w-full outline-none'
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
}
