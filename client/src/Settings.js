import React from 'react';
import { Link } from 'react-router-dom';
import style from './Settings.module.css';
import './global.css';

const Settings = ({
  musicPlaying,
  toggleMusic,
  setMusicVolume,
  musicVolume,
  theme,
  handleThemeChange,
}) => {
  const handleToggleMusic = () => {
    toggleMusic();
  };

  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    setMusicVolume(volume);
  };

  return (
    <div className={style.settings_menu}>
      <h1 className={style.settings_heading}>Settings</h1>
      <label htmlFor='theme-select' className={style.settings_label}>
        Select Theme
      </label>
      <select
        className={style.settings_select}
        id='theme-select'
        onChange={handleThemeChange}
        value={theme}
      >
        <option value='orange'>Orange</option>
        <option value='green'>Green</option>
        <option value='dark'>Dark</option>
        <option value='blue'>Blue</option>
        <option value='purple'>Purple</option>
        <option value='red'>Red</option>
      </select>
      <label htmlFor='music-toggle' className={style.settings_label}>
        Enable/Disable Music
      </label>
      <input
        className={style.settings_input_checkbox}
        type='checkbox'
        id='music-toggle'
        checked={musicPlaying}
        onChange={handleToggleMusic}
      />

      <label htmlFor='music-volume' className={style.settings_label}>
        Music Volume
      </label>
      <input
        className={style.settings_input_range}
        type='range'
        min={0}
        max={1}
        step={0.1}
        id='music-volume'
        value={musicVolume}
        onChange={handleVolumeChange}
      />

      <Link to='/'>
        <button className={style.settings_button}>Main Menu</button>
      </Link>
    </div>
  );
};

export default Settings;
