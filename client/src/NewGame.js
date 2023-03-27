import React, { useEffect, useState } from 'react';
import { getCategories } from './api';
import { Link } from 'react-router-dom';

const NewGame = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  console.log(categories);

  return (
    <div>
      <Link to='/'>Back To Main Menu</Link>
    </div>
  );
};

export default NewGame;
