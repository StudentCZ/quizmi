import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
