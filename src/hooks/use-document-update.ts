import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export interface UpdateData {
  documentId: string;
  content?: string;
  isPublished?: boolean;
}

export default function useDocumentUpdate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: onUpdate, isPending } = useMutation({
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
        description: 'Document couldnot be updated',
        variant: 'destructive',
      });
    },
  });

  return { onUpdate, isPending };
}
