import { Box } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingIndicator } from '..';
import { QueryParamProvider } from 'use-query-params';
import { RouteAdaptor } from './RouteAdaptor';

const Home = lazy(() => import('src/modules/home'));
const FileUploads = lazy(() => import('src/modules/file-uploads'));
const Data = lazy(() => import('src/modules/data'));

export const RoutesContainer = () => {
  return (
    <Box>
      <Suspense fallback={<LoadingIndicator text="Loading Page..." />}>
        <QueryParamProvider ReactRouterRoute={RouteAdaptor}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/file-uploads" element={<FileUploads />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </QueryParamProvider>
      </Suspense>
    </Box>
  );
};
