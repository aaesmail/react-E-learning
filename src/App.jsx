import { useEffect, lazy, Suspense, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { initAuth } from './store/actions/auth';

import Header from './Core/Header';
import Loading from './Core/Loading';

const Home = lazy(() => import('./modules/Home'));
const Auth = lazy(() => import('./modules/Auth'));
const NotFound = lazy(() => import('./modules/NotFound'));

const App = () => {
  const dispatch = useDispatch();
  const { authenticated, admin, instructor, learner } = useSelector(
    (state) => state.auth,
  );

  const navigate = useNavigate();
  useEffect(() => dispatch(initAuth(dispatch, navigate)), [dispatch, navigate]);

  const routes = [
    <Route key="/" exact path="/" element={<Home />} />,
    <Route key="/404" exact path="/404" element={<NotFound />} />,
    <Route key="*" path="*" element={<Navigate to="/404" />} />,
  ];

  const authRoutes = [

  ];

  const guestRoutes = [
    <Route key="/auth/*" path="/auth/*" element={<Auth />} />,
  ];

  const adminRoutes = [

  ];

  const instructorRoutes = [

  ];

  const learnerRoutes = [
    
  ];

  if (authenticated) {
    routes.push(...authRoutes);
  } else {
    routes.push(...guestRoutes);
  }

  if (admin) {
    routes.push(...adminRoutes);
  } else if (instructor) {
    routes.push(...instructorRoutes);
  } else if (learner) {
    routes.push(...learnerRoutes);
  }

  return (
    <Fragment>
      <Header />

      <main>
        <Suspense fallback={<Loading />}>
          <Routes>{routes}</Routes>
        </Suspense>
      </main>
    </Fragment>
  );
};

export default App;
