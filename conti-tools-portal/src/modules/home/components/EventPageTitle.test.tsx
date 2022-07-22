import { render } from '@testing-library/react';
import { EventPageTitle } from './EventPageTitle';

test('Testing title rendering', () => {
  const { baseElement } = render(<EventPageTitle />);
  expect(baseElement).toMatchSnapshot();
});
