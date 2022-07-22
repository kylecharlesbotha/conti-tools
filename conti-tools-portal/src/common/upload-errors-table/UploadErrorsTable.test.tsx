import { render } from '@testing-library/react';
import { UploadErrorsTable } from './UploadErrorsTable';

describe('Testing rendering of the UploadErrorsTable component', () => {
  test('Without an errors param supplied it should render null', () => {
    const { baseElement } = render(<UploadErrorsTable />);
    expect(baseElement).toMatchSnapshot();
  });

  test('Without an empty errors array supplied it should render null', () => {
    const { baseElement } = render(<UploadErrorsTable errors={{}} />);
    expect(baseElement).toMatchSnapshot();
  });

  test('With some errors provided it should render the errors', () => {
    const errors = {
      input1: ['First Error', 'Second Error'],
      input2: ['First Error', 'Third Error']
    };

    const { baseElement } = render(<UploadErrorsTable errors={errors} />);
    expect(baseElement).toMatchSnapshot();
  });
});
