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
      const questionAnswers = await Promise.all(
        questionsData.map(async (question) => {
          const answers = await getQuestionAnswers(question.id);
          return {
            ...question,
            answers,
          };
        })
      );
      setQuestions(questionsData);
    };
    fetchData();
  }, [quizId]);

  return <div>Hello</div>;
};

export default PlayGame;
