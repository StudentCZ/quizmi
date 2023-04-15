import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizQuestions } from './api';
import style from './PlayGame.module.css';

const PlayGame = () => {
  const [questions, setQuestions] = useState([]);
  const { questionId } = useParams();
  return <div>Hello</div>;
};

export default PlayGame;
