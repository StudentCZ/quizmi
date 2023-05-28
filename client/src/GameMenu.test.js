/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  BrowserRouter as Router,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';
import GameMenu from './GameMenu';

test('renders GameMenu component QuizMi', () => {
  render(
    <MemoryRouter>
      <GameMenu />
    </MemoryRouter>
  );

  const headingElement = screen.getByText('QuizMi');
  expect(headingElement).toBeInTheDocument();
});

test('renders New Game Button', () => {
  render(
    <MemoryRouter>
      <GameMenu />
    </MemoryRouter>
  );

  const newGameButton = screen.getByText('New Game');
  expect(newGameButton).toBeInTheDocument();
});

test('renders Continue Button', () => {
  render(
    <MemoryRouter>
      <GameMenu />
    </MemoryRouter>
  );
  const continueButton = screen.getByText('Continue Game');

  expect(continueButton).toBeInTheDocument();

  const savedProgress = JSON.parse(localStorage.getItem('quiz-progress'));
  if (savedProgress) {
    expect(continueButton).not.toBeDisabled();
  } else {
    expect(continueButton).toBeDisabled();
  }
});

test('Navigate to correct route when clicking New Game button', () => {
  render(
    <MemoryRouter>
      <GameMenu />
    </MemoryRouter>
  );
  const newGameButton = screen.getByText('New Game');

  fireEvent.click(newGameButton);

  expect(window.location.pathname).toBe('/game/new');
});

test('Navigate to correct route when clicking Continue Game button', () => {
  const savedProgress = {
    quizId: '123',
  };

  localStorage.setItem('quiz-progress', JSON.stringify(savedProgress));

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<GameMenu />} />
        <Route
          path='/quizzes/:quizId/questions'
          element={<div data-testid='quiz-route' />}
        />
      </Routes>
    </MemoryRouter>
  );

  const continueButton = screen.getByText('Continue Game');
  fireEvent.click(continueButton);

  expect(screen.getByTestId('quiz-route')).toBeInTheDocument();
});

test('Navigate to correct route when clicking Settings button', () => {
  render(
    <MemoryRouter>
      <GameMenu />
    </MemoryRouter>
  );

  const settingsButton = screen.getByText('Settings');

  fireEvent.click(settingsButton);

  expect(window.location.pathname).toBe('/settings');
});

test('renders disabled Continue Button when there is no saved progress', () => {
  localStorage.setItem('quiz-progress', null);

  render(
    <MemoryRouter>
      <GameMenu />
    </MemoryRouter>
  );
  const continueButton = screen.getByText('Continue Game');

  expect(continueButton).toBeInTheDocument();
  expect(continueButton).toBeDisabled();
});

test('component updates based on localstorage changes', () => {
  const savedProgress = {
    quidId: '123',
  };

  localStorage.setItem('quiz-progress', JSON.stringify(savedProgress));

  render(
    <MemoryRouter>
      <GameMenu />
    </MemoryRouter>
  );

  const continueButton = screen.getByText('Continue Game');

  expect(continueButton).not.toBeDisabled();
});
