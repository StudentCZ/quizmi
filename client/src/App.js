import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameMenu from './GameMenu';
import Settings from './Settings';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<GameMenu />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
