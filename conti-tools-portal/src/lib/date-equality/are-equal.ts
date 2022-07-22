import { getDate, getMonth, getYear } from 'date-fns';

export const areEqual = (firstDate: Date, secondDate: Date) => {
  return (
    getDate(firstDate) === getDate(secondDate) &&
    getMonth(firstDate) === getMonth(secondDate) &&
    getYear(firstDate) === getYear(secondDate)
  );
};
