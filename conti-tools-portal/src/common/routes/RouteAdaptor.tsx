import { FC, useMemo } from 'react';
import { Location, useLocation, useNavigate } from 'react-router-dom';

export const RouteAdaptor: FC = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace: (location: Location) =>
        navigate(location, { replace: true, state: location.state }),
      push: (location: Location) =>
        navigate(location, { replace: false, state: location.state })
    }),
    [navigate]
  );

  // https://github.com/pbeshai/use-query-params/issues/196
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return children({ history: adaptedHistory, location });
};
