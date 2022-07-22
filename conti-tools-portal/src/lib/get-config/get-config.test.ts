import { ConfigKeys } from 'src/enums';
import { getConfig } from '..';

describe('Testing create api utility function', () => {
  window.adminConfig = {
    [ConfigKeys.HOST]: 'localhost'
  };

  describe('Getting a config entry with a key that exists', () => {
    test('should return the expected value', () => {
      expect(getConfig<string>(ConfigKeys.HOST)).toEqual('localhost');
    });
  });

  describe('Getting a config entry that does not have a value', () => {
    test('should throw an error', () => {
      expect(() => getConfig<string>(ConfigKeys.API_URL)).toThrowError(
        `Key: ${ConfigKeys.API_URL} not in config`
      );
    });
  });
});
