import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

import Header from './components/Header';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Cart from './pages/Cart';
import './scss/app.scss';
import { useSelector } from 'react-redux';

export const SearchContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');
  const filter = useSelector((state) => state.filter.value);
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
