import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameMenu from './GameMenu';

test('renders GameMenu component', () => {
  render(<GameMenu />);

  // eslint-disable-next-line no-restricted-globals
  const headingElement = screen.getByText('QuizMi');
  expect(headingElement).toBeInTheDocument();
});
