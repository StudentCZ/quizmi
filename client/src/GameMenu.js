import React, { useState, useEffect } from 'react';
import style from './GameMenu.module.css';
import { Link } from 'react-router-dom';

const GameMenu = ({ musicPlaying, toggleMusic }) => {
  const [hasSavedGame, setHasSavedGame] = useState(false);

  useEffect(() => {
    const savedGame = localStorage.getItem('quizGame');
    if (savedGame) {
      setHasSavedGame(true);
    }
  }, []);

  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    if (musicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [musicPlaying]);
  return (
    <div className={style.game_menu}>
      <h1 className={style.game_menu_heading}>QuizMi</h1>
      <Link to='/game/new'>
        <button className={style.game_menu_button}>New Game</button>
      </Link>
      <Link to='/playgame?continue=true'>
        <button
          className={
            hasSavedGame
              ? style.game_menu_button
              : style.game_menu_button_disabled
          }
          disabled={!hasSavedGame}
        >
          Continue Game
        </button>
      </Link>
      <Link to='/settings'>
        <button className={style.game_menu_button}>Settings</button>
      </Link>
    </div>
  );
};

export default GameMenu;
