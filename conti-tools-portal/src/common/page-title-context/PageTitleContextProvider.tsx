import { createContext, FC, useContext, useState } from 'react';

type PageTitleContextType = {
  pageTitle: string;
  setPageTitle: (newTitle: string) => void;
};

const PageTitleContext = createContext<PageTitleContextType | undefined>(
  undefined
);

export const PageTitleContextProvider: FC = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');

  return (
    <PageTitleContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => {
  const pageTitleContext = useContext(PageTitleContext);

  if (!pageTitleContext) {
    throw new Error(
      'Page Title Context cannot be used outside of Page Title Context Provider'
    );
  }

  return pageTitleContext;
};
