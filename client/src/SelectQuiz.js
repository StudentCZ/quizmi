import React, { useState, useEffect } from 'react';
import { getSubCategoryQuiz, getSubCategories } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import progress from './images/Progress.png';
import style from './SelectQuiz.module.css';

const SelectQuiz = () => {
  const { categoryId, subcategoryId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [SelectedQuiz, setSelectedQuiz] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [startGameClicked, setStartGameClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const quizzesData = await getSubCategoryQuiz(categoryId, subcategoryId);
      setQuizzes(quizzesData);
    };
    fetchData();
  }, [categoryId, subcategoryId]);

  const handleQuizSelect = (quiz) => {
    if (SelectedQuiz && SelectedQuiz.quiz_id === quiz.quiz_id) {
      setSelectedQuiz(null);
    } else {
      setSelectedQuiz(quiz);
    }
  };

  const handleStartGameClick = (quizId) => {
    setStartGameClicked(true);
  };

  const handleBackButtonClick = async () => {
    const subcategoriesData = await getSubCategories(categoryId);
    if (subcategoriesData.length === 0) {
      navigate('/game/new');
    } else {
      navigate(`/category/${categoryId}/subcategories`);
    }
  };

  useEffect(() => {
    let countdownInterval;
    if (startGameClicked) {
      countdownInterval = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }
    if (countdown === 0) {
      clearInterval(countdownInterval);
      localStorage.removeItem(`quiz-progress`);
      navigate(`/quizzes/${SelectedQuiz.quiz_id}/questions`);
    }
    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, navigate, SelectedQuiz, startGameClicked]);

  return (
    <div className={style.quiz_menu}>
      {countdown > 0 && startGameClicked ? (
        <h1>{countdown}</h1>
      ) : quizzes.length > 0 ? (
        <>
          <h1 className={style.quiz_heading}>Choose Quiz</h1>
          <ul className={style.quiz_unordered_list}>
            {quizzes.map((quiz) => {
              const isSelected =
                SelectedQuiz && SelectedQuiz.quiz_id === quiz.quiz_id;
              return (
                <li
                  className={`${style.quiz_list_item} ${
                    isSelected ? style.selected : ''
                  }`}
                  key={quiz.quiz_id}
                  onClick={() => handleQuizSelect(quiz)}
                >
                  {quiz.title}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <h1>Currently in progress, please check back later.</h1>
          <img src={progress} alt='Progress' className={style.progress_image} />
        </>
      )}
      {SelectedQuiz &&
        !startGameClicked && ( // Render button only when startGameClicked is false
          <button
            className={style.quiz_button}
            onClick={() => handleStartGameClick(SelectedQuiz.quiz_id)}
          >
            Start Game
          </button>
        )}
      <button className={style.quiz_button} onClick={handleBackButtonClick}>
        Back
      </button>
    </div>
  );
};

export default SelectQuiz;
