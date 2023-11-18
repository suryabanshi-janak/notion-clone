'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function Banner({ documentId }: { documentId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: onRestore } = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/documents/restore', { documentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['document'] });
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Document couldnot be restored',
        variant: 'destructive',
      });
    },
  });

  const { mutate: onRemove } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/documents?documentId=${documentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });

      router.push('/documents');
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'Document could not be deleted',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className='w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center'>
      <p>This page is in the trash</p>
      <Button
        size='sm'
        onClick={() => onRestore()}
        variant='outline'
        className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size='sm'
          variant='outline'
          className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
}
