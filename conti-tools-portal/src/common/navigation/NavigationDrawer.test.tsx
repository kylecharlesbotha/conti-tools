import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PageTitleContextProvider } from '../page-title-context/PageTitleContextProvider';
import { NavigationDrawer } from './NavigationDrawer';

describe('testing navigation drawer', () => {
  test('should render correctly when open with default width', () => {
    const { baseElement } = render(
      <PageTitleContextProvider>
        <MemoryRouter>
          <NavigationDrawer drawerWidth={240} isOpen={true} />
        </MemoryRouter>
      </PageTitleContextProvider>
    );

    expect(baseElement).toMatchSnapshot();
  });
  test('should render correctly when open with 300 width', () => {
    const { baseElement } = render(
      <PageTitleContextProvider>
        <MemoryRouter>
          <NavigationDrawer drawerWidth={300} isOpen={true} />
        </MemoryRouter>
      </PageTitleContextProvider>
    );

    expect(baseElement).toMatchSnapshot();
  });
  test('should render correctly when closed with default width', () => {
    const { baseElement } = render(
      <PageTitleContextProvider>
        <MemoryRouter>
          <NavigationDrawer drawerWidth={240} isOpen={false} />
        </MemoryRouter>
      </PageTitleContextProvider>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
