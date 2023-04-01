import React, { useState, useEffect } from 'react';
import { getQuizzes } from './api';
import { Link, useParams } from 'react-router-dom';
import style from './SelectQuiz.module.css';

const SelectQuiz = () => {
  const { categoryId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const quizzesData = await getQuizzes(categoryId);
      setQuizzes(quizzesData);
    };
    fetchData();
  }, [categoryId]);

  return (
    <div className={style.quiz_menu}>
      <h1 className={style.quiz_heading}>Choose Quiz</h1>
      <ul className={style.quiz_unordered_list}>
        {quizzes.map((quiz) => {
          return (
            <li className={style.quiz_list_item} key={quiz.quiz_id}>
              {quiz.title}
            </li>
          );
        })}
      </ul>
      <Link to='/game/new'>
        <button className={style.quiz_button}>Back</button>
      </Link>
    </div>
  );
};

export default SelectQuiz;
