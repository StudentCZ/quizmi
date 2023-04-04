import React, { useEffect, useState } from 'react';
import { getCategories, getQuizzes, getSubCategories } from './api';
import { Link, useNavigate } from 'react-router-dom';
import style from './NewGame.module.css';

const NewGame = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId, subcategoryId) => {
    const subCategories = await getSubCategories(categoryId);
    if (subCategories.length > 0) {
      navigate(`/category/${categoryId}/subcategories`);
    } else {
      navigate(`/category/${categoryId}/quizzes`);
    }
  };

  return (
    <div className={style.new_game_menu}>
      <h1 className={style.new_game_heading}>Choose Category</h1>
      <ul className={style.new_game_unordered_list}>
        {categories.map((category) => {
          return (
            <li
              className={style.new_game_list_item}
              key={category.category_id}
              onClick={() => {
                handleCategoryClick(category.category_id);
              }}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
      <Link to='/'>
        <button className={style.new_game_button}>Main Menu</button>
      </Link>
    </div>
  );
};

export default NewGame;
