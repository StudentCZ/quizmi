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
    <div>
      <h1>Choose Quiz</h1>
      <ul>
        {quizzes.map((quiz) => {
          return <li>{quiz.title}</li>;
        })}
      </ul>
      <Link to='/game/new'>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default SelectQuiz;
