import React from 'react';
import { Link } from 'react-router-dom';
import style from './Settings.module.css';

const Settings = ({
  musicPlaying,
  toggleMusic,
  setMusicVolume,
  musicVolume,
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
      <h1>Settings</h1>
      <label htmlFor='music-toggle'>Enable/Disable Music</label>
      <input
        type='checkbox'
        id='music-toggle'
        checked={musicPlaying}
        onChange={handleToggleMusic}
      />
      <div>
        <label htmlFor='music-volume'>Music Volume</label>
        <input
          type='range'
          min={0}
          max={1}
          step={0.1}
          id='music-volume'
          value={musicVolume}
          onChange={handleVolumeChange}
        />
      </div>
      <Link to='/'>Back To Main Menu</Link>
    </div>
  );
};

export default Settings;
