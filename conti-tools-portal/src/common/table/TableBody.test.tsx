import { render } from '@testing-library/react';
import { TableBody } from '.';
// import { Product } from 'src/types';
import { Table } from '@mui/material';

describe('Table Body tests', () => {
  const rows = [
    {
      id: '1',
      lotId: '#1',
      productName: 'First Product'
    }
  ];
  test('should render the table body correctly with sensible parameters', () => {
    const { baseElement } = render(
      <Table>
        <TableBody rows={rows} headers={[]} />
      </Table>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
