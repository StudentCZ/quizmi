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

test('applies selected answer class when isSelected is true', () => {
  render(
    <Answers
      answerId='1'
      answerText='9'
      isSelected={true}
      handleAnswerSelect={() => {}}
      disabled={false}
    />
  );

  expect(screen.getByText('9')).toHaveClass(
    'answers_button',
    'selected_answer'
  );
});

test('calls handleAnswerSelect with answerId when clicked', () => {
  const mockHandleAnswerSelect = jest.fn();

  render(
    <Answers
      answerId='1'
      answerText='9'
      isSelected={false}
      handleAnswerSelect={mockHandleAnswerSelect}
      disabled={false}
    />
  );

  fireEvent.click(screen.getByText('9'));
  expect(mockHandleAnswerSelect).toHaveBeenCalledWith('1');
});
