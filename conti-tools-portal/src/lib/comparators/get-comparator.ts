import { SortDirection } from '@mui/material';
import { ascendingComparator } from './ascending-comparator';
import { descendingComparator } from './descending-comparator';

export const getComparator = (direction: SortDirection, key: string) =>
  direction === 'asc' ? ascendingComparator(key) : descendingComparator(key);
