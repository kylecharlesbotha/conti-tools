import axios, { AxiosInstance } from 'axios';
import { createContext, FC, useContext, useMemo } from 'react';
import { ConfigKeys } from 'src/enums/ConfigKeys.enum';
import { getConfig } from 'src/lib';
type ServiceProviderType = {
  contiApi: AxiosInstance;
};

const ServiceProviderContext = createContext<ServiceProviderType | undefined>(
  undefined
);

export const ServiceProvider: FC = ({ children }) => {
  const apiUrl = getConfig<string>(ConfigKeys.API_URL);

  const contiApi = useMemo(() => {
    const auctionsInstance = axios.create({
      baseURL: apiUrl
    });

    return auctionsInstance;
  }, [apiUrl]);

  return (
    <ServiceProviderContext.Provider value={{ contiApi }}>
      {children}
    </ServiceProviderContext.Provider>
  );
};

export const useServiceProvider = () => {
  const context = useContext(ServiceProviderContext);

  if (!context) {
    throw new Error(
      'Service Provider Context cannot be used outside of Service Provider Context Provider'
    );
  }

  return context;
};
