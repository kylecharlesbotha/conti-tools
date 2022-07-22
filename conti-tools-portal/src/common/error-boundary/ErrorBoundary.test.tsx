import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const ThrowAnError: React.FunctionComponent<{ haveAnError?: boolean }> = ({
  children,
  haveAnError
}) => {
  if (haveAnError) {
    throw new Error("I'm a component in crisis! (A fake error)");
  }
  return <>{children}</>;
};
jest.mock('src/lib/get-config/get-config.ts');

it('renders the error boundary correctly when an error occurs', () => {
  const tree = render(
    <ErrorBoundary>
      <ThrowAnError haveAnError={true}>Test</ThrowAnError>
    </ErrorBoundary>
  ).baseElement;
  expect(tree).toMatchSnapshot();
});

it('renders the children correctly when no error occurs', () => {
  const tree = render(
    <ErrorBoundary>
      <ThrowAnError>Test</ThrowAnError>
    </ErrorBoundary>
  ).baseElement;
  expect(tree).toMatchSnapshot();
});
