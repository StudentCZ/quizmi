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

test('calls handleThemeChange when theme is selected', () => {
  const mockHandleThemeChange = jest.fn();

  render(
    <Router>
      <Settings
        musicPlaying={false}
        toggleMusic={() => {}}
        setMusicVolume={() => {}}
        musicVolume={0.5}
        theme='orange'
        handleThemeChange={mockHandleThemeChange}
      />
    </Router>
  );

  fireEvent.change(screen.getByLabelText('Select Theme'), {
    target: { value: 'green' },
  });

  expect(mockHandleThemeChange).toHaveBeenCalled();
});

test('calls toggleMusic when music toggle is clicked', () => {
  const mockToggleMusic = jest.fn();

  render(
    <Router>
      <Settings
        musicPlaying={false}
        toggleMusic={mockToggleMusic}
        setMusicVolume={() => {}}
        musicVolume={0.5}
        theme='orange'
        handleThemeChange={() => {}}
      />
    </Router>
  );

  fireEvent.click(screen.getByLabelText('Enable/Disable Music'));

  expect(mockToggleMusic).toHaveBeenCalled();
});
