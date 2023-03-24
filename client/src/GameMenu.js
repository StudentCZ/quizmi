import React, { useEffect, useContext } from 'react';
import style from './GameMenu.module.css';
import music1 from './audio/Q1.mp3';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';

const GameMenu = () => {
  const { musicPlaying, setMusicPlaying } = useContext(AppContext);
  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    document.addEventListener('click', () => {
      setMusicPlaying(true);
      if (audioElement) {
        audioElement.play();
      }
    });
  }, [setMusicPlaying]);
  return (
    <div className={style.game_menu}>
      <h1 className={style.game_menu_heading}>Welcome To QuizMi</h1>
      <button className={style.game_menu_button}>New Game</button>
      <Link to='/settings'>
        <button className={style.game_menu_button}>Settings</button>
      </Link>
      {musicPlaying && (
        <audio id='bg-music' loop controls={false} autoPlay>
          <source src={music1} type='audio/mp3' />
        </audio>
      )}
    </div>
  );
};

export default GameMenu;
