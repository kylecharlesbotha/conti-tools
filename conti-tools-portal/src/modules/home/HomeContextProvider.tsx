import { SxProps, Theme } from '@mui/material';
import { createContext, FC, useContext, useState } from 'react';
import { styles } from './home.styles';

interface HomeContextInterface {
  hours: number;
  setHours: (newHours: number) => void;
  styles: Record<string, SxProps<Theme>>;
}

const HomeContext = createContext<HomeContextInterface | undefined>(undefined);

export const HomeProvider: FC = ({ children }) => {
  const [hours, setHours] = useState(0);

  const startingValue = {
    hours,
    setHours,
    styles
  };

  return (
    <HomeContext.Provider value={startingValue}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const homeContext = useContext(HomeContext);

  if (!homeContext) {
    throw new Error(
      'Home Context cannot be used outside of Home Context Provider'
    );
  }

  return homeContext;
};
