import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import Layout from './layout';
import Home from './pages/home';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Layout />} path="/graduation-project-frontend/">
        <Route element={<Home />} index />
      </Route>

      <Route element={<div>Not Found</div>} path="*" />
    </>,
  ),
);
