import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import style from './FinalScore.module.css';

const FinalScore = () => {
  const location = useLocation();
  const score = location.state?.score ?? 0;

  return (
    <div className={style.score_menu}>
      <h1>Your score is: {score}</h1>
      <Link to='/'>
        <button>Main Menu</button>
      </Link>
    </div>
  );
};

export default FinalScore;
