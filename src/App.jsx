import { useEffect, lazy, Suspense, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { initAuth } from './store/actions/auth';

import Header from './Core/Header';
import Loading from './Core/Loading';

const Home = lazy(() => import('./modules/Home'));
const Auth = lazy(() => import('./modules/Auth'));
const Courses = lazy(() => import('./modules/Courses'));
const Admin = lazy(() => import('./modules/Admin'));
const Me = lazy(() => import('./modules/Me'));
const Create = lazy(() => import('./modules/Create'));
const NotFound = lazy(() => import('./modules/NotFound'));

const App = () => {
  const dispatch = useDispatch();
  const { authenticated, admin, instructor, init } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => dispatch(initAuth()), [dispatch]);

  const routes = [
    <Route key="/" exact path="/" element={<Home />} />,
    <Route key="/404" exact path="/404" element={<NotFound />} />,
  ];

  const authRoutes = [
    <Route key="/courses/*" path="/courses/*" element={<Courses />} />,
    <Route key="/me" path="/me" element={<Me />} />,
  ];

  const guestRoutes = [
    <Route key="/auth/*" path="/auth/*" element={<Auth />} />,
  ];

  const adminRoutes = [
    <Route key="/admin" path="/admin" element={<Admin />} />,
  ];

  const instructorAndAdminRoutes = [
    <Route key="/create" path="/create" element={<Create />} />,
  ];

  if (authenticated) {
    routes.push(...authRoutes);
  } else {
    routes.push(...guestRoutes);
  }

  if (admin) {
    routes.push(...adminRoutes);
  }
  if (instructor || admin) {
    routes.push(...instructorAndAdminRoutes);
  }

  if (init) {
    routes.push(<Route key="*" path="*" element={<Loading />} />);
  } else {
    routes.push(<Route key="*" path="*" element={<Navigate to="/404" />} />);
  }

  return (
    <Fragment>
      <Header />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <main>
        <Suspense fallback={<Loading />}>
          <Routes>{routes}</Routes>
        </Suspense>
      </main>
    </Fragment>
  );
};

export default App;
