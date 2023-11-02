'use client';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Loader2, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function CreateNoteButton() {
  const { mutate: onCreate, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.post('/api/document', { title: 'Untitled' });
    },
    onError: () => {
      toast({
        title: 'Something went wrong!',
        description: 'There was an error creating the document.',
      });
    },
    onSuccess: () => {
      toast({
        title: 'New note created!',
        description: 'Successfully created a new note.',
      });
    },
  });

  return (
    <Button onClick={() => onCreate()} disabled={isPending}>
      {isPending ? (
        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
      ) : (
        <PlusCircle className='h-4 w-4 mr-2' />
      )}
      Create a note
    </Button>
  );
}
