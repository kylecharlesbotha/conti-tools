import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavigationLink } from './NavigationLink';
import HomeIcon from '@mui/icons-material/Home';
import { PageTitleContextProvider } from '../page-title-context/PageTitleContextProvider';

describe('testing the navigation link', () => {
  test('should render correctly', () => {
    const { baseElement } = render(
      <PageTitleContextProvider>
        <MemoryRouter>
          <NavigationLink to="/" primary="Home" icon={<HomeIcon />} />
        </MemoryRouter>
      </PageTitleContextProvider>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
