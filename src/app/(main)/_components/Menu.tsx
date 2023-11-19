'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { MoreHorizontal, Trash } from 'lucide-react';

export default function Menu({ documentId }: { documentId: string }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: onArchive } = useMutation({
    mutationFn: async () => {
      await axios.patch('/api/documents', { documentId, isArchived: true });
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-60'
        align='end'
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={() => onArchive()}>
          <Trash className='h-4 w-4 mr-2' />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
