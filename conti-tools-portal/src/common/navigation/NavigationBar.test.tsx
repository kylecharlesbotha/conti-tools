import { fireEvent, render, screen } from '@testing-library/react';
import { NavigationBar } from './NavigationBar';

describe('Testing navigation bar', () => {
  test('should render correctly', () => {
    const { baseElement } = render(
      <NavigationBar
        isOpen={true}
        drawerWidth={240}
        toggleIsOpen={jest.fn}
        pageTitle={'Home'}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });
  test('should call the toggle function when the button is clicked', () => {
    const mockToggle = jest.fn();
    render(
      <NavigationBar
        isOpen={true}
        drawerWidth={240}
        toggleIsOpen={mockToggle}
        pageTitle={'Home'}
      />
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalled();
  });
});
