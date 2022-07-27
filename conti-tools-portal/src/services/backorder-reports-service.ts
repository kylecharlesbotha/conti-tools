import { useCallback } from 'react';
import { AxiosResponse } from 'axios';
import { useServiceProvider } from 'src/common/service-context-provider/ServiceContextProvider';
import { PaginatedResponse, ReportRecordResponse, Request } from 'src/types';
import { get } from 'lodash';
import { ReportRecord } from 'src/types/models/ReportRecord.type';

export const useBackorderReportsdService = () => {
  const { contiApi } = useServiceProvider();

  const getBackorderReportsList = useCallback(
    async (
      queryParams: Request
    ): Promise<PaginatedResponse<ReportRecordResponse>> => {
      const response: AxiosResponse<PaginatedResponse<ReportRecordResponse>> =
        await contiApi.get('/BackorderReports/paginated', {
          params: {
            page: queryParams.page,
            pageSize: queryParams.pageSize,
            search: queryParams.search,
            salesDocSearch: get(queryParams.filters, 'salesDocSearch', ''),
            poNumberSearch: get(queryParams.filters, 'poNumberSearch', ''),
            materialDescriptionSearch: get(
              queryParams.filters,
              'materialDescriptionSearch',
              ''
            ),
            commentIdentifierSearch: get(
              queryParams.filters,
              'commentIdentifierSearch',
              ''
            )
          }
        });
      return response.data;
    },
    [contiApi]
  );

  const updateReportRecord = useCallback(
    async (reportRecord: ReportRecord): Promise<number> => {
      const response: AxiosResponse<number> = await contiApi.put(
        '/BackorderReports',
        { ...reportRecord },
        {
          headers: {
            accept: 'text/plain',
            contentType: 'application/json'
          }
        }
      );
      return response.data;
    },
    [contiApi]
  );

  return { getBackorderReportsList, updateReportRecord };
};
