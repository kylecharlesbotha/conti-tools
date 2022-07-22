import { render } from '@testing-library/react';
import { TableFooter } from '.';
import { useTableQueryParams } from './hooks';
import { QueryParamProvider } from 'use-query-params';
import { RouteAdaptor } from 'src/common/routes/RouteAdaptor';
import { MemoryRouter } from 'react-router-dom';

describe('Table Footer tests', () => {
  test('should render the table footer correctly with sensible parameters', () => {
    const Footer = () => {
      const { page, handlePageChange, pageSize, handlePageSizeChange } =
        useTableQueryParams({ defaultPageSize: 10 });
      return (
        <TableFooter
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          page={page}
          pageSize={pageSize}
          rowCount={50}
        />
      );
    };

    const { baseElement } = render(
      <MemoryRouter>
        <QueryParamProvider ReactRouterRoute={RouteAdaptor}>
          <Footer />
        </QueryParamProvider>
      </MemoryRouter>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
