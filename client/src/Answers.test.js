import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Answers from './Answers';

test('component is rendering correctly', () => {
  render(
    <Answers
      answerId='1'
      answerText='9'
      isSelected={false}
      handleAnswerSelect={() => {}}
      disabled={false}
    />
  );

  expect(screen.getByText('9')).toBeInTheDocument();
});
