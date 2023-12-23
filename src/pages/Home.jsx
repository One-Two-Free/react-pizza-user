import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? '&category=' + categoryId : '';
    const sortBy = '&sortBy=' + sort.sortProperty.replace('-', '');
    const order = '&order=' + (sort.sortProperty.includes('-') ? 'asc' : 'desc');
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://657c7834853beeefdb9981d8.mockapi.io/items?page=${currentPage}&limit=4${category}${sortBy}${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map((item, i) => (
    <PizzaBlock
      key={item.id}
      title={item.title}
      price={item.price}
      image={item.imageUrl}
      sizes={item.sizes}
      types={item.types}
    />
  ));

  if (isLoading) {
    console.log('Skeleton');
  } else console.log('pizzas');

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
