import React, { useState, useEffect } from 'react';
import { getSubCategories } from './api';
import { Link, useParams } from 'react-router-dom';
import style from './SubCategories.module.css';

const SubCategories = () => {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);

  console.log(subCategories);

  useEffect(() => {
    const fetchData = async () => {
      const subCategoriesData = await getSubCategories(categoryId);
      setSubCategories(subCategoriesData);
    };
    fetchData();
  }, [categoryId]);

  return (
    <div>
      <h1>Choose Sub-Category</h1>
      <ul>
        {subCategories.map((subCategory) => {
          return (
            <li>
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
