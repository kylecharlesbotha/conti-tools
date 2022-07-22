import { descendingComparator } from './descending-comparator';

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

  test('When called with the key "first", the result should be 1', () => {
    const result = descendingComparator('first')(firstObj, secondObj);
    expect(result).toEqual(1);
  });

  test('When called with the key "second", the result should be -1', () => {
    const result = descendingComparator('second')(firstObj, secondObj);
    expect(result).toEqual(-1);
  });

  test('When called with the key "count", the result should be 0', () => {
    const result = descendingComparator('count')(firstObj, secondObj);
    expect(result).toEqual(0);
  });
});
