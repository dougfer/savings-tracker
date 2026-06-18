import { format } from 'date-fns';

export function formatDisplayDate(isoString: string): string {
  return format(new Date(isoString), 'MMM d, yyyy');
}
