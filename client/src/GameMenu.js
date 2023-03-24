import React, { useEffect } from 'react';
import Settings from './Settings';
import style from './GameMenu.module.css';
import music1 from './audio/Q1.mp3';

const GameMenu = () => {
  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    document.addEventListener('click', () => {
      audioElement.play();
    });
  }, []);
  return (
    <div className={style.game_menu}>
      <h1 className={style.game_menu_heading}>Welcome To QuizMi</h1>
      <button className={style.game_menu_button}>New Game</button>
      <button
        className={style.game_menu_button}
        onClick={() => {
          <Settings />;
        }}
      >
        Settings
      </button>
      <audio id='bg-music' loop controls={false} autoPlay>
        <source src={music1} type='audio/mp3' />
      </audio>
    </div>
  );
};

export default GameMenu;
