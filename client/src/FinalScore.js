import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './FinalScore.module.css';

const FinalScore = () => {
  const location = useLocation();
  const score = location.state?.score ?? 0;
  console.log(score);
  return <div className={style.score_menu}>Your score is: {score}</div>;
};

export default FinalScore;
