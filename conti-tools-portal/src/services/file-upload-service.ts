import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { useServiceProvider } from 'src/common/service-context-provider/ServiceContextProvider';

export const useFileUploadService = () => {
  const { contiApi } = useServiceProvider();
  const uploadReport = useCallback(
    async (file: string | ArrayBuffer | null | undefined) => {
      try {
        return await contiApi.post('/BackorderReports', {
          file
        });
      } catch (error) {
        const { response } = error as AxiosError;
        return response;
      }
    },
    [contiApi]
  );
  return { uploadReport };
};
