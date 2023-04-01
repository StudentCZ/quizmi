import React, { useState, useEffect } from 'react';
import { getQuizzes } from './api';
import { Link, useParams } from 'react-router-dom';
import style from './SelectQuiz.module.css';

const SelectQuiz = () => {
  const { categoryId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  return <div>Hello</div>;
};

export default SelectQuiz;
