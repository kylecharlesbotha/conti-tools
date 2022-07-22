import { renderDate } from './render-date';

describe('Testing ISO formatting of a date object', () => {
  test('Should format correctly', () => {
    const date = new Date(2022, 0, 1);
    const utils = renderDate(date);
    expect(utils).toEqual('2022-01-01');
  });
});
