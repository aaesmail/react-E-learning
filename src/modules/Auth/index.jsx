import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from '../../Core/Loading';

const Login = lazy(() => import('./Login'));
const Signup = lazy(() => import('./Signup'));

const Auth = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="signup" element={<Signup />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Suspense>
  );
};

export default Auth;
