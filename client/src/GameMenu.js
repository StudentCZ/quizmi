import React from 'react';
import style from './GameMenu.module.css';

const GameMenu = () => {
  return (
    <div className={style.game_menu}>
      <h1>Welcome To QuizMi</h1>
      <button>New Game</button>
      <button>Settings</button>
    </div>
  );
};

export default GameMenu;
