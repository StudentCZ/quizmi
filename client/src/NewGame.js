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

  return (
    <div>
      <h1>Choose Category</h1>
      <Link to='/'>Back To Main Menu</Link>
    </div>
  );
};

export default NewGame;
