import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
            <Route exact path="/" element={<Home />} />

            <Route path="/auth/*" element={<Auth />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
