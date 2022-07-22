import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { forwardRef, ReactElement, useMemo } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';
import { usePageTitle } from '../page-title-context/PageTitleContextProvider';

interface NavigationLinkProps {
  icon?: ReactElement;
  to: string;
  primary: string;
}

export const NavigationLink = ({ icon, to, primary }: NavigationLinkProps) => {
  const { pageTitle } = usePageTitle();
  // This pattern is taken from the MUI docs
  // React's useMemo is necessary here to ensure the link component doesn't re-render unnecessarily
  const renderLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
        (itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
        )
      ),
    [to]
  );

  return (
    <ListItemButton component={renderLink} selected={primary === pageTitle}>
      {icon ? (
        <ListItemIcon sx={{ justifyContent: 'center', paddingRight: 2 }}>
          {icon}
        </ListItemIcon>
      ) : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};
