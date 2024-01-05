import { Routes, Route } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
  console.log('app.js---------------------------');

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
