import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchPizzaParams, fetchPizzas } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

let rendered = 0;

const Home: React.FC = () => {
  console.log('home.js rendered = ', ++rendered, ' -----------------');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? '&category=' + categoryId : '';
    const sortBy = '&sortBy=' + sort.sortProperty.replace('-', '');
    const order = '&order=' + (sort.sortProperty.includes('-') ? 'asc' : 'desc');
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(fetchPizzas({ category, sortBy, order, search, currentPage: String(currentPage) }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => params.sortBy === obj.sortProperty);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'error' ? (
          <div>
            <h2>произошла ошибка</h2>
            <p>что то пошло не так</p>
          </div>
        ) : (
          ''
        )}
        {status === 'loading' ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
