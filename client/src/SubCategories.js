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
      subCategories(subCategoriesData);
    };
    fetchData();
  }, [categoryId]);

  return <>Hello</>;
};

export default SubCategories;
