import { useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useServiceProvider } from 'src/common/service-context-provider/ServiceContextProvider';
import { FileUploadResponse, PaginatedResponse, Request } from 'src/types';

export const useFileUploadService = () => {
  const { contiApi } = useServiceProvider();
  const uploadReport = useCallback(
    async (
      file: string | ArrayBuffer | null | undefined,
      fileName: string,
      commentIdentifier: string
    ) => {
      try {
        return await contiApi.post('/BackorderReports', {
          fileName,
          commentIdentifier,
          file
        });
      } catch (error) {
        const { response } = error as AxiosError;
        return response;
      }
    },
    [contiApi]
  );
  const getFileUploadsList = useCallback(
    async (
      queryParams: Request
    ): Promise<PaginatedResponse<FileUploadResponse>> => {
      const response: AxiosResponse<PaginatedResponse<FileUploadResponse>> =
        await contiApi.get('/FileUploads', {
          params: queryParams
        });
      return response.data;
    },
    [contiApi]
  );

  const getBackorderCombinedReport = useCallback(async () => {
    const response: AxiosResponse<Blob> = await contiApi.get(
      '/BackorderReports',

      {
        responseType: 'blob'
      }
    );

    return response.data;
  }, [contiApi]);
  return { uploadReport, getFileUploadsList, getBackorderCombinedReport };
};
