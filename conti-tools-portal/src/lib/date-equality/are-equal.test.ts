import { areEqual } from './are-equal';

describe('Testing date equality helper', () => {
  test('Two equal dates should return true', () => {
    const date = new Date(2022, 1, 1);

    expect(areEqual(date, date)).toBeTruthy();
  });

  test('Two equal dates with different times should return true', () => {
    const dateOne = new Date(2022, 1, 1, 1, 1);
    const dateTwo = new Date(2022, 1, 1, 2, 2);

    expect(areEqual(dateOne, dateTwo)).toBeTruthy();
  });

  test('Two different dates should return false', () => {
    const dateOne = new Date(2022, 1, 1, 1, 1);
    const dateTwo = new Date(2022, 1, 2, 2, 2);

    expect(areEqual(dateOne, dateTwo)).toBeFalsy();
  });
});
