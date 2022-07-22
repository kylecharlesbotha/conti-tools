import { Table } from '@mui/material';
import { render } from '@testing-library/react';
import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { TableContextProvider, TableHeader } from '.';

describe('Testing Table Header component rendering', () => {
  test('Should render Table Header correctly with sensible inputs', () => {
    const headers = [
      {
        id: 'id',
        label: 'ID'
      },
      {
        id: 'lot',
        label: 'Lot'
      },
      {
        id: 'name',
        label: 'Product Name'
      }
    ];
    const header = (
      <QueryParamProvider>
        <TableContextProvider>
          <Table>
            <TableHeader
              headers={headers}
              handleSort={jest.fn()}
              order="asc"
              orderBy="id"
            />
          </Table>
        </TableContextProvider>
      </QueryParamProvider>
    );

    const { baseElement } = render(header);
    expect(baseElement).toMatchSnapshot();
  });
});
