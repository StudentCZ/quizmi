import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizQuestions, getQuestionAnswers } from './api';
import style from './PlayGame.module.css';

const PlayGame = () => {
  const [questions, setQuestions] = useState([]);
  const { quizId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const questionsData = await getQuizQuestions(quizId);
      setQuestions(questionsData);
    };
    fetchData();
  }, [quizId]);

  return <div>Hello</div>;
};

export default PlayGame;
