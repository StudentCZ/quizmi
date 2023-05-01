import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './GameMenu.module.css';
import { Link } from 'react-router-dom';

const GameMenu = ({ musicPlaying, toggleMusic }) => {
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    if (musicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [musicPlaying]);

  const handleContinueGame = () => {
    const savedProgress = JSON.parse(
      localStorage.getItem(`quiz-${quizId}-progress`)
    );
    if (savedProgress) {
      navigate(`/quizzes/${quizId}/questions`);
    }
  };

  return (
    <div className={style.game_menu}>
      <h1 className={style.game_menu_heading}>QuizMi</h1>
      <Link to='/game/new'>
        <button className={style.game_menu_button}>New Game</button>
      </Link>
      <button className={style.game_menu_button}>Continue Game</button>
      <Link to='/settings'>
        <button className={style.game_menu_button}>Settings</button>
      </Link>
    </div>
  );
};

export default GameMenu;
