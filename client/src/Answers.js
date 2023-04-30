import React from 'react';
import style from './Answers.module.css';

const Answers = ({
  answerId,
  answerText,
  isSelected,
  handleAnswerSelect,
  disabled,
}) => {
  const handleClick = () => {
    handleAnswerSelect(answerId);
  };

  return (
    <li>
      <button>{answerText}</button>
    </li>
  );
};

export default Answers;
