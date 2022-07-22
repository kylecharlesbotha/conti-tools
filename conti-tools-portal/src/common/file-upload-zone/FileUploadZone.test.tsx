import { render } from '@testing-library/react';
import { FileUploadZone } from './FileUploadZone';

test('File upload zone should render correctly with no errors', () => {
  const { baseElement } = render(
    <FileUploadZone setUploadFile={jest.fn()} hasUploadError={false} />
  );

  expect(baseElement).toMatchSnapshot();
});
