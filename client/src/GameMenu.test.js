/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
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

test('Navigate to correct route when clicking Continue Game button', () => {
  const savedProgress = {
    quizId: '123',
  };

  localStorage.setItem('quiz-progress', JSON.stringify(savedProgress));

  const history = createMemoryHistory();

  const navigate = jest.fn((path) => history.push(path));
  jest
    .spyOn(require('react-router-dom'), 'useNavigate')
    .mockImplementation(() => navigate);

  render(
    <Router history={history}>
      <GameMenu />
    </Router>
  );

  const continueButton = screen.getByText('Continue Game');
  fireEvent.click(continueButton);

  expect(history.location.pathname).toBe(
    `/quizzes/${savedProgress.quizId}/questions?continue=true`
  );

  jest.clearAllMocks();
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

test('renders disabled Continue Button when there is no saved progress', () => {
  localStorage.setItem('quiz-progress', null);

  render(
    <Router>
      <GameMenu />
    </Router>
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
    <Router>
      <GameMenu />
    </Router>
  );

  const continueButton = screen.getByText('Continue Game');

  expect(continueButton).not.toBeDisabled();
});

test(`hasSavedGame and saveQuizId update correctly on mount based of localstorage`, () => {
  const savedProgress = {
    quizId: '123',
  };

  localStorage.setItem('quiz-progress', JSON.stringify(savedProgress));

  render(
    <Router>
      <GameMenu />
    </Router>
  );

  const continueButton = screen.getByText('Continue Game');

  expect(GameMenu.hasSavedGame).toBe(true);
  expect(GameMenu.savedQuizId).toBe(savedProgress.quizId);

  expect(continueButton).not.toBeDisabled();
});
