import axios from 'axios';
import { ConfigKeys } from 'src/enums/ConfigKeys.enum';
import { getConfig } from '..';

export const createAuctionsApi = () => {
  const apiUrl = getConfig<string>(ConfigKeys.API_URL);
  return axios.create({
    baseURL: apiUrl
  });
};

export const createBookingsApi = () => {
  const bookingsApiUrl = getConfig<string>(ConfigKeys.BOOKINGS_API_URL);
  return axios.create({
    baseURL: bookingsApiUrl
  });
};
