import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import music1 from './audio/Q1.mp3';
import GameMenu from './GameMenu';
import Settings from './Settings';

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    if (musicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }, [musicPlaying]);

  return (
    <div className='App'>
      <audio id='bg-music' loop controls={false} autoPlay>
        {musicPlaying && <source src={music1} type='audio/mp3' />}
      </audio>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <GameMenu musicPlaying={musicPlaying} toggleMusic={toggleMusic} />
            }
          />
          <Route
            path='/settings'
            element={
              <Settings musicPlaying={musicPlaying} toggleMusic={toggleMusic} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
