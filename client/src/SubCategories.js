import React, { useState, useEffect } from 'react';
import { getSubCategories } from './api';
import { Link, useParams } from 'react-router-dom';
import style from './SubCategories.module.css';

const SubCategories = () => {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  return <>Hello</>;
};

export default SubCategories;
