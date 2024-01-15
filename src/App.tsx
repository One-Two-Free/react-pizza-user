import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Home from "./pages/Home";
import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

const Cart = lazy(() => import(/*webpackChunkName: "Cart"*/ "./pages/Cart"));
const FullPizza = lazy(
  () => import(/*webpackChunkName: "FullPizza"*/ "./pages/FullPizza"),
);
const NotFound = lazy(
  () => import(/*webpackChunkName: "NotFound"*/ "./pages/NotFound"),
);

function App() {
  console.log("app.js---------------------------");

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>идет загрузка</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>идет загрузка</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>идет загрузка</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
