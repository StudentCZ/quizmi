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
    <li key={answerId} className={style.answers_list_item}>
      <button>{answerText}</button>
    </li>
  );
};

export default Answers;
