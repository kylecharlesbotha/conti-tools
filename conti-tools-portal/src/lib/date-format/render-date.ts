import { formatISO } from 'date-fns';

export const renderDate = (value: Date) => {
  return formatISO(value, { representation: 'date' });
};
