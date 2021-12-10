import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route path="signup" element={<Signup />} />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default Auth;
