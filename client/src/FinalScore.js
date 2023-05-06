import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import style from './FinalScore.module.css';

const FinalScore = () => {
  const location = useLocation();
  const score = location.state?.score ?? 0;
  const length = location.state?.length ?? 0;

  return (
    <div className={style.score_menu}>
      <h1>{`Your Score is ${score}/${length}`}</h1>
      <Link to='/'>
        <button className={style.button}>Main Menu</button>
      </Link>
    </div>
  );
};

export default FinalScore;
