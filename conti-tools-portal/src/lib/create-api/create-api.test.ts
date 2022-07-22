import { ConfigKeys } from 'src/enums';
import { createAuctionsApi } from './create-api';

describe('Testing create api utility function', () => {
  window.adminConfig = {
    [ConfigKeys.API_URL]: 'localhost'
  };

  describe('Calling create api method', () => {
    test('should return an instance of axios', () => {
      const api = createAuctionsApi();
      expect(api).toBeTruthy();
    });
  });
});
