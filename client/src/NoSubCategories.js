import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNoSubCategoryQuiz } from './api';
import style from './NoSubCategories.module.css';

const NoSubCategories = () => {
  const { categoryId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const quizData = await getNoSubCategoryQuiz(categoryId);
      setQuizzes(quizData);
    };
    fetchData();
  }, [categoryId]);

  return (
    <div>
      <h1>Choose Quiz</h1>
      <ul></ul>
      <Link to='/game/new'>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default NoSubCategories;
