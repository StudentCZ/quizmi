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
    <div className={style.quiz_menu}>
      <h1 className={style.quiz_heading}>Choose Quiz</h1>
      {quizzes.length > 0 ? (
        <ul className={style.quiz_unordered_list}>
          {quizzes.map((quiz) => {
            return (
              <li className={style.quiz_list_item} key={quiz.quiz_id}>
                {quiz.title}
              </li>
            );
          })}
        </ul>
      ) : (
        <h1>Currently in progress, please check back later</h1>
      )}
      <Link to='/game/new'>
        <button className={style.quiz_button}>Back</button>
      </Link>
    </div>
  );
};

export default NoSubCategories;
