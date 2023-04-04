import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import music1 from './audio/Q1.mp3';
import music2 from './audio/Q2.mp3';
import music3 from './audio/Q3.mp3';
import music4 from './audio/Q4.mp3';
import music5 from './audio/Q5.mp3';
import GameMenu from './GameMenu';
import Settings from './Settings';
import NewGame from './NewGame';
import SubCategories from './SubCategories';
import SelectQuiz from './SelectQuiz';

function App() {
  const songs = useMemo(() => [music1, music2, music3, music4, music5], []);
  const [theme, setTheme] = useState('orange');
  const [musicPlaying, setMusicPlaying] = useState(
    localStorage.getItem('musicPlaying') === 'true'
  );
  const [musicVolume, setMusicVolume] = useState(
    parseFloat(localStorage.getItem('musicVolume')) || 0.5
  );
  const [currentSong, setCurrentSong] = useState(
    songs[Math.floor(Math.random() * songs.length)]
  );

  const toggleMusic = () => {
    setMusicPlaying((prevPlaying) => !prevPlaying);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('class', storedTheme);
    }
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    document.documentElement.setAttribute('class', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'default') {
      localStorage.removeItem('theme');
    }
  };

  useEffect(() => {
    const localMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    setMusicPlaying(localMusicPlaying);
  }, []);

  useEffect(() => {
    const audioElement = document.getElementById('bg-music');
    audioElement.volume = musicVolume;
    audioElement.src = currentSong;
    audioElement.load();

    const playNextSong = () => {
      const randomSongIndex = Math.floor(Math.random() * songs.length);
      setCurrentSong(songs[randomSongIndex]);
    };

    audioElement.addEventListener('ended', playNextSong);

    if (musicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    localStorage.setItem('musicVolume', musicVolume.toString());
    localStorage.setItem('musicPlaying', musicPlaying.toString());

    return () => audioElement.removeEventListener('ended', playNextSong);
  }, [musicPlaying, musicVolume, currentSong, songs]);

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
                theme={theme}
                handleThemeChange={handleThemeChange}
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
                theme={theme}
                handleThemeChange={handleThemeChange}
              />
            }
          />
          <Route path='/game/new' element={<NewGame />} />
          <Route
            path='/category/:categoryId/subcategories'
            element={<SubCategories />}
          />
          <Route
            path='/category/:categoryId/quizzes'
            element={<NoSubCategories />}
          />
          <Route
            path='/category/:categoryId/subcategories/:subcategoryId/quizzes'
            element={<SelectQuiz />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
