import React, { useState, useEffect } from 'react';
import { getSubCategoryQuiz, getSubCategories } from './api';
import { Link, useParams, useNavigate } from 'react-router-dom';
import style from './SelectQuiz.module.css';

const SelectQuiz = () => {
  const { categoryId, subcategoryId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [SelectedQuiz, setSelectedQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const quizzesData = await getSubCategoryQuiz(categoryId, subcategoryId);
      setQuizzes(quizzesData);
    };
    fetchData();
  }, [categoryId, subcategoryId]);

  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const handleBackButtonClick = async () => {
    const subcategoriesData = await getSubCategories(categoryId);
    if (subcategoriesData.length === 0) {
      navigate('/game/new');
    } else {
      navigate(`/category/${categoryId}/subcategories`);
    }
  };

  return (
    <div className={style.quiz_menu}>
      <h1 className={style.quiz_heading}>Choose Quiz</h1>
      <ul className={style.quiz_unordered_list}>
        {quizzes.map((quiz) => {
          return (
            <li className={style.quiz_list_item} key={quiz.quiz_id}>
              {quiz.title}
            </li>
          );
        })}
      </ul>
      <button className={style.quiz_button} onClick={handleBackButtonClick}>
        Back
      </button>
    </div>
  );
};

export default SelectQuiz;
