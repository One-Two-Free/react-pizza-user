import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './scss/app.scss';
import FullPizza from './pages/FullPizza';

function App() {
  console.log('app.js---------------------------');

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/pizza/:id" element={<FullPizza />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
