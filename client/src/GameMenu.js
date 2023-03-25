import React, { useEffect } from 'react';
import style from './GameMenu.module.css';
import { Link } from 'react-router-dom';

const GameMenu = ({ musicPlaying, toggleMusic }) => {
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
      <h1 className={style.game_menu_heading}>Welcome To QuizMi</h1>
      <button className={style.game_menu_button}>New Game</button>
      <Link to='/settings'>
        <button className={style.game_menu_button}>Settings</button>
      </Link>
    </div>
  );
};

export default GameMenu;
