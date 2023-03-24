import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import style from './Settings.module.css';

const Settings = () => {
  const { musicPlaying, setMusicPlaying } = useContext(AppContext);

  return (
    <div>
      <h1>Settings</h1>
      <label>
        <input
          type='checkbox'
          checked={musicPlaying}
          onChange={(e) => setMusicPlaying(e.target.checked)}
        />
        Music On/Off
      </label>
      <Link to='/'>Back To Menu</Link>
    </div>
  );
};

export default Settings;
