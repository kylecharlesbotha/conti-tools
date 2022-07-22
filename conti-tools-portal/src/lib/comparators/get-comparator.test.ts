import { getComparator } from './get-comparator';

describe('Testing ascending comparator', () => {
  const firstObj = {
    count: 1,
    first: 'A',
    second: 'D'
  };
  const secondObj = {
    count: 1,
    first: 'C',
    second: 'B'
  };

  test('When called with the key "first" and a SortDirection of "asc", the result of the comparator should be -1', () => {
    const result = getComparator('asc', 'first')(firstObj, secondObj);
    expect(result).toEqual(-1);
  });

  test('When called with the key "first" and a SortDirection of "desc", the result should be 1', () => {
    const result = getComparator('desc', 'first')(firstObj, secondObj);
    expect(result).toEqual(1);
  });

  test('When called with the key "count" and a SortDirection of "asc", the result of the comparator should be 0', () => {
    const result = getComparator('asc', 'count')(firstObj, secondObj);
    expect(result).toEqual(0);
  });

  test('When called with the key "count" and a SortDirection of "desc", the result should be 0', () => {
    const result = getComparator('desc', 'count')(firstObj, secondObj);
    expect(result).toEqual(0);
  });
});
