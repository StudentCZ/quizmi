import React, { useEffect, useState } from 'react';
import { getCategories } from './api';
import { Link } from 'react-router-dom';
import style from './NewGame.module.css';

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
    <div className={style.new_game_menu}>
      <h1 className={style.new_game_heading}>Choose Category</h1>
      <ul className={style.new_game_unordered_list}>
        {categories.map((category) => {
          return <li key={category.category_id}>{category.name}</li>;
        })}
      </ul>
      <Link to='/'>
        <button className={style.new_game_button}>Main Menu</button>
      </Link>
    </div>
  );
};

export default NewGame;
