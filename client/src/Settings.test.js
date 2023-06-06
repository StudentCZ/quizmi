import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import Settings from './Settings';

test('component is rendering correctly', () => {
  render(
    <Router>
      <Settings
        musicPlaying={false}
        toggleMusic={() => {}}
        setMusicVolume={() => {}}
        musicVolume={0.5}
        theme='orange'
        handleThemeChange={() => {}}
      />
    </Router>
  );

  expect(screen.getByText('Settings')).toBeInTheDocument();
  expect(screen.getByText('Select Theme')).toBeInTheDocument();
  expect(screen.getByText('Enable/Disable Music')).toBeInTheDocument();
  expect(screen.getByText('Music Volume')).toBeInTheDocument();
  expect(screen.getByText('Main Menu')).toBeInTheDocument();
});
