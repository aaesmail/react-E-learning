import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './Core/Header';
import Loading from './Core/Loading';

const Home = lazy(() => import('./modules/Home'));
const Auth = lazy(() => import('./modules/Auth'));
const NotFound = lazy(() => import('./modules/NotFound'));

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />

            <Route exact path="/" element={<Home />} />

            <Route exact path="/404" element={<NotFound />} />

            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
