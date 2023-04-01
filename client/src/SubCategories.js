import React, { useState, useEffect } from 'react';
import { getSubCategories } from './api';
import { Link, useParams } from 'react-router-dom';
import style from './SubCategories.module.css';

const SubCategories = () => {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const subCategoriesData = await getSubCategories(categoryId);
      setSubCategories(subCategoriesData);
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className={style.sub_categories_menu}>
      <h1 className={style.sub_categories_heading}>Choose Sub-Category</h1>
      <ul className={style.sub_categories_unordered_list}>
        {subCategories.map((subCategory) => {
          return (
            <li
              className={style.sub_categories_list_item}
              key={subCategory.subcategories_id}
            >
              <Link>{subCategory.name}</Link>
            </li>
          );
        })}
      </ul>
      <Link to='/game/new'>Back</Link>
    </div>
  );
};

export default SubCategories;
