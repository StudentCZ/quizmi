/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import GameMenu from './GameMenu';

test('renders GameMenu component QuizMi', () => {
  render(
    <Router>
      <GameMenu />
    </Router>
  );

  const headingElement = screen.getByText('QuizMi');
  expect(headingElement).toBeInTheDocument();
});

test('renders New Game Button', () => {
  render(
    <Router>
      <GameMenu />
    </Router>
  );

  const newGameButton = screen.getByText('New Game');
  expect(newGameButton).toBeInTheDocument();
});

test('renders Continue Button', () => {
  render(
    <Router>
      <GameMenu />
    </Router>
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
    <Router>
      <GameMenu />
    </Router>
  );
  const newGameButton = screen.getByText('New Game');

  fireEvent.click(newGameButton);

  expect(window.location.pathname).toBe('/game/new');
});

test('Navigate to correct route when clicking Continue button', () => {
  const mockNavigate = jest.fn();

  jest
    .spyOn(localStorage, 'getItem')
    .mockReturnValue(JSON.stringify({ quizId: '123' }));

  render(
    <Router>
      <GameMenu navigate={mockNavigate} />
    </Router>
  );

  const continueButton = screen.getByText('Continue Game');

  fireEvent.click(continueButton);

  expect(mockNavigate).toHaveBeenCalledWith(
    '/quizzes/123/questions?continue=true'
  );
});

test('Navigate to correct route when clicking Settings button', () => {
  render(
    <Router>
      <GameMenu />
    </Router>
  );

  const settingsButton = screen.getByText('Settings');

  fireEvent.click(settingsButton);

  expect(window.location.pathname).toBe('/settings');
});
