import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizQuestions } from './api';
import style from './PlayGame.module.css';

const PlayGame = () => {
  const [questions, setQuestions] = useState([]);
  const { questionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const questionsData = await getQuizQuestions(questionId);
      setQuestions(questionsData);
    };
    fetchData();
  }, [questionId]);
  return <div>Hello</div>;
};

export default PlayGame;
