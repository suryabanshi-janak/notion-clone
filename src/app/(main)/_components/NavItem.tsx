import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronDown, ChevronRight, LucideIcon, Plus } from 'lucide-react';

interface NavItemProps {
  id?: string;
  documentIcon?: string | null;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export default function NavItem({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: NavItemProps) {
  const { toast } = useToast();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const { mutate: create, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.post('/api/document', {
        title: 'Untitled',
        parentDocument: id,
      });
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
      onExpand?.();
    },
  });

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    create();
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      role='button'
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary'
      )}
    >
      {!!id && (
        <div
          role='button'
          className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'
          onClick={handleExpand}
        >
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentIcon ? (
        <div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
      ) : (
        <Icon className='h-[18px] w-[18px] mr-2 text-muted-foreground shrink-0' />
      )}
      <span className='truncate'>{label}</span>
      {isSearch && (
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div
          role='button'
          onClick={onCreate}
          className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
        >
          <Plus className='h-4 w-4 text-muted-foreground' />
        </div>
      )}
    </div>
  );
}

NavItem.Skeleton = function NavItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : '12px',
      }}
      className='flex gap-x-2 py-[3px]'
    >
      <Skeleton className='h-4 w-4' />
      <Skeleton className='h-4 w-[30%]' />
    </div>
  );
};
