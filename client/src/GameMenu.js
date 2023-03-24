import React from 'react';
import style from './GameMenu.module.css';

const GameMenu = () => {
  return (
    <div className={style.game_menu}>
      <h1 className={style.game_menu_heading}>Welcome To QuizMi</h1>
      <button className={style.game_menu_button}>New Game</button>
      <button className={style.game_menu_button}>Settings</button>
    </div>
  );
};

export default GameMenu;
