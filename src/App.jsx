import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Home from './modules/Home';
import Auth from './modules/Auth';
import NotFound from './NotFound';

const App = () => {
  return (
    <div>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/auth' element={<Auth />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
