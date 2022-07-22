import { render } from '@testing-library/react';
import { LoadingIndicator } from './LoadingIndicator';

describe('Testing loading indicator', () => {
  test('no parameters should use defaults', () => {
    const { baseElement } = render(<LoadingIndicator />);
    expect(baseElement).toMatchSnapshot();
  });

  test('With parameters disclosed should render correctly', () => {
    const { baseElement } = render(
      <LoadingIndicator size={20} dense text="Smaller Loading Indicator" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
