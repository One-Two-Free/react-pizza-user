import React, { useEffect, useState } from 'react';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности (DESC)', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? 'category=' + categoryId : '';
    const sortBy =
      '&sortBy=' +
      sortType.sortProperty.replace('-', '') +
      '&order=' +
      (sortType.sortProperty.includes('-') ? 'asc' : 'desc');
    fetch(`https://657c7834853beeefdb9981d8.mockapi.io/items?${category}${sortBy}`)
      .then((res) => res.json())
      .then((jsonData) => {
        setItems(jsonData);
        setIsLoading(false);
      });
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item, i) => (
              <PizzaBlock
                key={i}
                title={item.title}
                price={item.price}
                image={item.imageUrl}
                sizes={item.sizes}
                types={item.types}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
