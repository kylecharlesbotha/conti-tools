/* eslint-disable no-console */
import React, { ErrorInfo } from 'react';

//This particular component is intentionally left as a class-based component due to restrictions in React 16
export class ErrorBoundary extends React.Component<
  Record<string, unknown>,
  { hasError: boolean }
> {
  constructor(props: Readonly<Record<string, unknown>>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.warn('Error was not reported to central logging, please implement');
    console.debug(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
