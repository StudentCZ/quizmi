import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './GameMenu.module.css';
import { Link } from 'react-router-dom';

const GameMenu = ({ musicPlaying, toggleMusic }) => {
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [savedQuizId, setSavedQuizId] = useState(null);
  const savedProgress = JSON.parse(localStorage.getItem(`quiz-progress`));
  const quizId = savedProgress.quizId;
  const navigate = useNavigate();

  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    if (musicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
    if (savedProgress) {
      setHasSavedGame(true);
    }
  }, [musicPlaying]);

  const handleContinueGame = () => {
    navigate(`/quizzes/${quizId}/questions?continue=true`);
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
