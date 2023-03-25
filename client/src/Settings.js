import React from 'react';
import { Link } from 'react-router-dom';
import style from './Settings.module.css';

const Settings = ({ musicPlaying, toggleMusic }) => {
  const handleToggleMusic = () => {
    toggleMusic();
  };
  return (
    <div>
      <h1>Settings</h1>
      <label htmlFor='music-toggle'>Enable/Disable Music</label>
      <input
        type='checkbox'
        id='music-toggle'
        checked={musicPlaying}
        onChange={handleToggleMusic}
      />
      <Link to='/'>Back To Main Menu</Link>
    </div>
  );
};

export default Settings;
