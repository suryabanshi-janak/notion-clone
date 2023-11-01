import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name?: string | null): string {
  if (!name) return '';

  const words = name.split(' ');
  const initials = [];
  for (const word of words) {
    if (word.length > 0) {
      initials.push(word[0].toUpperCase());
    }
  }

  return initials.join('');
}
