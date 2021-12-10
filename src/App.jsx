import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './Header';

const Home = lazy(() => import('./modules/Home'));
const Auth = lazy(() => import('./modules/Auth'));
const NotFound = lazy(() => import('./modules/NotFound'));

const App = () => {
  return (
    <div>
      <Header />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/auth' element={<Auth />} />

          <Route exact path='/' element={<Home />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
