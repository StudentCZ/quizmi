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
      <button
        className={`${style.answers_button} ${
          isSelected ? style.selected_answer : ''
        }`}
        onClick={handleClick}
      >
        {answerText}
      </button>
    </li>
  );
};

export default Answers;
