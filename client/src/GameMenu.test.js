import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GameMenu from './GameMenu';

test('renders GameMenu component', () => {
  render(
    <Router>
      <GameMenu />
    </Router>
  );

  const headingElement = screen.getByText('QuizMi');
  expect(headingElement).toBeInTheDocument();
});
