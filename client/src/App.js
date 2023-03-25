import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import GameMenu from './GameMenu';
import Settings from './Settings';

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className='App'>
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
