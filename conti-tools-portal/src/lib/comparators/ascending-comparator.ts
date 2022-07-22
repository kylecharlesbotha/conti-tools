import { get } from 'lodash';

export const ascendingComparator =
  (key: string) =>
  (
    first: Record<string, string | number>,
    second: Record<string, string | number>
  ): number => {
    if (get(first, key) < get(second, key)) {
      return -1;
    }

    if (get(first, key) > get(second, key)) {
      return 1;
    }

    return 0;
  };
