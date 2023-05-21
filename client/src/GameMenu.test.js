import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GameMenu from './GameMenu';

test('renders GameMenu component', () => {
  render(
    <Router>
      <GameMenu />
    </Router>
  );

  // eslint-disable-next-line no-restricted-globals
  const headingElement = screen.getByText('QuizMi');
  expect(headingElement).toBeInTheDocument();
});
