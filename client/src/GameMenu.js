import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './GameMenu.module.css';
import { Link } from 'react-router-dom';

const GameMenu = ({ musicPlaying, toggleMusic }) => {
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [savedQuizId, setSavedQuizId] = useState(null);
  const savedProgress = JSON.parse(localStorage.getItem(`quiz-progress`));
  const navigate = useNavigate();

  useEffect(() => {
    if (savedProgress) {
      setHasSavedGame(true);
      setSavedQuizId(savedProgress.quizId);
    }
  }, [savedProgress]);

  const handleContinueGame = () => {
    navigate(`/quizzes/${savedQuizId}/questions?continue=true`);
  };

  const continueButton = hasSavedGame ? (
    <button className={style.game_menu_button} onClick={handleContinueGame}>
      Continue Game
    </button>
  ) : (
    <button className={style.game_menu_button_disabled} disabled>
      Continue Game
    </button>
  );

  return (
    <div className={style.game_menu}>
      <h1 className={style.game_menu_heading}>QuizMi</h1>
      <Link to='/game/new'>
        <button className={style.game_menu_button}>New Game</button>
      </Link>
      {continueButton}
      <Link to='/settings'>
        <button className={style.game_menu_button}>Settings</button>
      </Link>
    </div>
  );
};

export default GameMenu;
