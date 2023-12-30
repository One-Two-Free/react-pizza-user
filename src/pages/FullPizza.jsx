import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FullPizza() {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get('https://657c7834853beeefdb9981d8.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('error during fetch pizza');
        navigate('/');
      }
    }
    fetchPizzas();
  }, []);

  if (!pizza) {
    return <div>идет загрузка</div>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} Р</h4>
    </div>
  );
}

export default FullPizza;
