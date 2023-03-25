import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import music1 from './audio/Q1.mp3';
import music2 from './audio/Q2.mp3';
import music3 from './audio/Q3.mp3';
import GameMenu from './GameMenu';
import Settings from './Settings';
import NewGame from './NewGame';

function App() {
  const songs = useMemo(() => [music1, music2, music3], []);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [currentSong, setCurrentSong] = useState(
    songs[Math.floor(Math.random() * songs.length)]
  );

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

  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    audioElement.src = currentSong;
    audioElement.play();

    const playNextSong = () => {
      const randomSongIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomSongIndex]);
    };

    audioElement.addEventListener('ended', playNextSong);
    return () => audioElement.removeEventListener('ended', playNextSong);
  }, [currentSong, songs]);

  return (
    <div className='App'>
      <audio id='bg-music' loop autoPlay volume={musicVolume}>
        {musicPlaying && <source src={currentSong} type='audio/mp3' />}
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
