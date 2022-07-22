import { HomeProvider } from './HomeContextProvider';
import { EventPageTitle } from './components/EventPageTitle';
import { usePageTitle } from 'src/common';
import { useEffect } from 'react';

export const Home = () => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => setPageTitle('Home'), [setPageTitle]);
  return (
    <HomeProvider>
      <EventPageTitle />
    </HomeProvider>
  );
};

export default Home;
