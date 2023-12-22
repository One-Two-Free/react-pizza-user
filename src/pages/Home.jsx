import React, { useContext, useEffect, useState } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({ name: 'популярности (DESC)', sortProperty: 'rating' });
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? '&category=' + categoryId : '';
    const sortBy = '&sortBy=' + sortType.sortProperty.replace('-', '');
    const order = '&order=' + (sortType.sortProperty.includes('-') ? 'asc' : 'desc');
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://657c7834853beeefdb9981d8.mockapi.io/items?page=${currentPage}&limit=4${category}${sortBy}${order}${search}`,
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setItems(jsonData);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  console.log('Home');

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
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
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
