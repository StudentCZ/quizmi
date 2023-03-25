import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import music1 from './audio/Q1.mp3';
import GameMenu from './GameMenu';
import Settings from './Settings';
import NewGame from './NewGame';

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    audioElement.volume = musicVolume;
    if (musicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [musicPlaying, musicVolume]);

  return (
    <div className='App'>
      <audio id='bg-music' loop autoPlay volume={musicVolume}>
        {musicPlaying && <source src={music1} type='audio/mp3' />}
      </audio>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <GameMenu
                musicPlaying={musicPlaying}
                toggleMusic={toggleMusic}
                musicVolume={musicVolume}
                setMusicVolume={setMusicVolume}
              />
            }
          />
          <Route
            path='/settings'
            element={
              <Settings
                musicPlaying={musicPlaying}
                toggleMusic={toggleMusic}
                setMusicVolume={setMusicVolume}
                musicVolume={musicVolume}
              />
            }
          />
          <Route path='/newgame' element={<NewGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
