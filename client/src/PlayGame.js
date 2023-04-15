import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
          const answers = await getQuestionAnswers(question.question_id);
          return {
            ...question,
            answers,
          };
        })
      );
      setQuestions(questionAnswers);
    };
    fetchData();
  }, [quizId]);

  return (
    <div>
      Hello
      <Link to='/game/new'>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default PlayGame;
