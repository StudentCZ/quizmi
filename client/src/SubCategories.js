import React, { useState, useEffect } from 'react';
import { getSubCategories } from './api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import style from './SubCategories.module.css';

const SubCategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subCategoriesData = await getSubCategories(categoryId);
        setSubCategories(subCategoriesData);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Failed to load subcategories');
      }
    };
    fetchData();
  }, [categoryId]);

  const handleCategoryClick = async (categoryId, subcategoryId) => {
    navigate(`/category/${categoryId}/subcategories/${subcategoryId}/quizzes`);
  };

  return (
    <div className={style.sub_categories_menu}>
      {errorMessage && <p>{errorMessage}</p>}
      <h1 className={style.sub_categories_heading}>Choose Sub-Category</h1>
      <ul className={style.sub_categories_unordered_list}>
        {subCategories.map((subCategory) => {
          return (
            <li
              className={style.sub_categories_list_item}
              key={subCategory.subcategories_id}
              onClick={() => {
                handleCategoryClick(categoryId, subCategory.subcategories_id);
              }}
            >
              {subCategory.name}
            </li>
          );
        })}
      </ul>
      <Link to='/game/new'>
        <button className={style.sub_categories_button}>Back</button>
      </Link>
    </div>
  );
};

export default SubCategories;
