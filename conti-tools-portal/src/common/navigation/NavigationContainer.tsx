import { usePageTitle } from '..';
import { useLocalStorage } from '../use-local-storage/useLocalStorage';
import { NavigationBar } from './NavigationBar';
import { NavigationDrawer } from './NavigationDrawer';

interface NavigationContainerProps {
  drawerWidth?: number;
}

export const NavigationContainer = ({
  drawerWidth = 240
}: NavigationContainerProps) => {
  const [isOpen, setIsOpen] = useLocalStorage<boolean>('isOpen', true);
  const toggleIsOpen = () => setIsOpen(!isOpen);
  const { pageTitle } = usePageTitle();
  return (
    <>
      <NavigationBar
        isOpen={isOpen}
        drawerWidth={drawerWidth}
        toggleIsOpen={toggleIsOpen}
        pageTitle={pageTitle}
      />
      <NavigationDrawer drawerWidth={drawerWidth} isOpen={isOpen} />
    </>
  );
};
